import React, { useEffect } from 'react'
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'
import {
  useAccount,
  useDisconnect,
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import { useBalance } from "wagmi";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";
import {dimeAbi} from "../dimeAbi"

import { useState } from "react";
import { request } from "http";

const dapp = () => {
    const { isConnected, isConnecting, address } = useAccount();
    const Balance = useBalance({
      address: address,
    });
   
    const [formData, setFormData] = useState({
        address:'',
        value:0
    })

    console.log (formData)
    

    const {data:deployedContract, error} = useReadContract({
        abi: dimeAbi,
        address: '0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38',
        functionName: 'owner',
        args: [],
    })

    const {data:lockCount} = useReadContract({
        abi: dimeAbi,
        address: '0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38',
        functionName: 'getLockCountdown',
        args: [],
    })

    const [contractBalance, setContractBalance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: getContractBalance } = await useReadContract({
                    abi: dimeAbi,
                    address: '0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38',
                    functionName: 'getBalance',
                    args: [],
                });
                setContractBalance(getContractBalance);
            } catch (error) {
                console.error('Error fetching contract balance:', error);
            }
        };

        fetchData();
    }, []);

    console.log(contractBalance);


    

    return (
        <div>
            <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                <button type="button" className="text-lg text-gray-900 font-semibold sidebar-toggle">
                    DIME
                </button>
                <ul className="ml-auto flex items-center text-black">
                    
<ConnectButton/>           
   </ul>
            </div>
            <p>Contract address: {deployedContract as string}</p>
            <div>
            {contractBalance !== null ? (
                <p>Contract Balance: {formatEther(contractBalance)}</p>
            ) : (
                <p>Loading contract balance...</p>
            )}
        </div>
<p>lockCountDown: {lockCount} </p>

            {/* <div>
            <input type="text" placeholder='enter' onChange={ (event) => {setFormData((prev) => ({...prev, address: event.target.value}))} }/>
            </div>
            <div>
            <input type="text" placeholder='enter'/>
            </div> */}
        </div>

       
    )
}

export default dapp
