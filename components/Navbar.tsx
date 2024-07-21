import Link from "next/link";
import React from "react";
import { CartMenu } from "./CartMenu";

export default function Navbar() {
  return (
    <div className="py-3 px-8 max-w-5xl mx-auto flex items-center  justify-between">
      <Link href={"/"}> <strong className="text-xl underline" >StripeStore</strong> </Link>
      <strong>This site was created as a learning project to demonstrate Stripe integration.</strong>
      <CartMenu />
    </div>
  );
}
