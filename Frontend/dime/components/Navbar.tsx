import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'
import LoginButton from "./LoginButton";
import SingupButton from "./SingupButton";
import {
  useAccount,
  useDisconnect,
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import { useBalance } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";

import { useState } from "react";
import { request } from "http";
import ThemeSwitcher from "./ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  const { isConnected, isConnecting, address } = useAccount();

  const Balance = useBalance({
    address: address,
  });

  const { disconnect } = useDisconnect();

  return (
    <main
      className={`flex    justify-between p-10 ${inter.className}`}
    >

      <div>DIME</div>

      <div className="flex items-center gap-2">
      <Link href="/login"> <LoginButton/></Link>
      <Link href="/Signup"> <SingupButton/></Link>
       
       
        <ThemeSwitcher />
      </div>
     

    
    </main>
  );
};

export default Navbar;
