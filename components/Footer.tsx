import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaSearch } from 'react-icons/fa';

export default function Footer() {

  return (
        <footer className="bg-gray-800 text-gray-300 py-4 flex flex-col justify-center items-center gap-2 ">
            <div className="flex justify-center space-x-4">
            <Link href="https://github.com/DhyanRaiBM" >
                <FaGithub className="text-white text-2xl" />
            </Link>
            <Link href="https://www.instagram.com/_dhyan_rai?igsh=MWloNXM2YXV6ZDZrag==" >
                <FaInstagram className="text-white text-2xl" />
            </Link>
            <Link href="https://www.linkedin.com/in/dhyan-rai-bm/">
                <FaLinkedin className="text-white text-2xl" />
            </Link>
            </div>
            <p>&copy; 2024 Dhyan Rai. All rights reserved.</p>
        </footer>
  );
}