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
import ProductList from "../components/ProductList";

import ThemeSwitcher from  "../components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  

  return (
    <main
     
    >
      <Navbar />
      <Hero/>
      <ProductList/>
      <Team/>
      <Footer/>
      
      
      


     
    </main>
  );
}