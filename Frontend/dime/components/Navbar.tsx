"use client"
  import Image from 'next/image';
import { Inter } from "next/font/google";
import Link from 'next/link';
import LoginButton from "./LoginButton";
import SingupButton from "./SingupButton";
import ThemeSwitcher from "./ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <main className={`flex justify-between p-10 ${inter.className}`}>
      <div>
        <Link href={'/'}>
        <Image
            src="/Dime.png"
            width={100}
            height={100}
            alt="DIME"
          />
        </Link>
          
        
      </div>
      <div className="flex items-center gap-2">
        <Link href="/login">
          <LoginButton />
        </Link>
        <Link href="/Signup">
          <SingupButton />
        </Link>
        <ThemeSwitcher />
      </div>
    </main>
  );
};

export default Navbar;
