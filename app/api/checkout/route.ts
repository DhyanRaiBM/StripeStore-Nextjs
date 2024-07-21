import { CartItem } from "@/store/slices/cartSlice";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe=new Stripe(<string>process.env.STRIPE_SECRET_KEY);

async function getActiveStripeProducts(){
    const products=await stripe.products.list();
    return products.data.filter((item)=> item.active!==false);
}

export async function POST(request:NextRequest) {
    try {
        const activeStripeProducts = await getActiveStripeProducts();

        const { products }=await request.json();
        const checkoutProducts:CartItem[] = products;

        //-If the product doesnt exist , create it.
        for(let item of checkoutProducts){
            const product = activeStripeProducts.find((activeItem)=>activeItem.name.toLowerCase()===item.name.toLowerCase());

            if(!product){
                const newStripeProduct = await stripe.products.create({
                    name:item.name,
                    default_price_data:{
                        unit_amount:Math.round(item.price * 83.60)*100,
                        currency:"INR",
                    },
                    images:[item.image]
                })
            }
        }

        //-Create stripe products from the checkout products:
        let stripeCheckoutProducts:any[] = [];

        for(let item of checkoutProducts){
            const product = activeStripeProducts.find((activeItem)=>activeItem.name.toLowerCase()===item.name.toLowerCase());

            if(product){
                stripeCheckoutProducts.push({
                    price:product.default_price,
                    quantity:item.qty
                })
            }
        }

        //-Create stripe checkout session:
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
            line_items:stripeCheckoutProducts,
            mode: 'payment',
        });

        console.log(session)

        return NextResponse.json({url:session.url});
        
    } catch (error) {
        console.log(error)
    }
}

//-Test Card : 4000 0035 6000 0008