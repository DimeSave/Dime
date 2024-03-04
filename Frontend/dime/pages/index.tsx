import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useDisconnect,
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import { useBalance } from "wagmi";


import { useState } from "react";
import { request } from "http";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Team from "../components/Team";
import Hero from "../components/Hero";
const inter = Inter({ subsets: ["latin"] });

const ERC_20_TOKEN_ADDRESS = "0x49F807b115af3C2B80267c1EFFE131C4Df971Fd5";

export default function Home() {
  const { isConnected, isConnecting, address } = useAccount();

  const Balance = useBalance({
    address: address,
  });

  const { disconnect } = useDisconnect();

  return (
    <main
      className={` ${inter.className}`}
    >
      <Navbar />
      <Hero/>
      <Team/>
      <Footer/>

     
    </main>
  );
}