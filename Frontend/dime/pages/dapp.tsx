
"use client";
import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { ConnectButton, getDefaultConfig } from "@rainbow-me/rainbowkit";
import Link from 'next/link';
import {
  useAccount,
  useDisconnect,
  useSimulateContract,
  useWriteContract,
  useBalance,

  
  useReadContract,
} from "wagmi";
import {writeContract} from '@wagmi/core'
import { formatEther, parseEther } from "viem";
import { dimeAbi } from "../dimeAbi";
import { request } from "http";
import { arbitrumSepolia } from 'viem/chains';
import { config  } from "../components/AppConfig"



const Dapp = () => {
//   const { isConnected, isConnecting, address } = useAccount();

//   const Balance = useBalance({
//     address: address,
//   });

//   const { data: deployedContract, error: contractError } = useReadContract({
//     abi: dimeAbi,
//     address: '0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38',
//     functionName: 'owner',
//     args: [],
//   });

//   const { data: datagetLockCountdown, isLoading: loadinggetLockCountdown, isError: isErrorgetLockCountdown } = useReadContract({
//     abi: dimeAbi,
//     address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
//     functionName: "getLockCountdown",
//     args: [1], // replace with the billId you want to use
//   });

//   const { data, isLoading, isError } = useReadContract({
//     abi: dimeAbi,
//     address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
//     functionName: "getBalance",
//     args: [],
//   });

//   const { data: datagetLockDetails, isLoading: isLoadinggetLockDetails, isError: isErrorgetLockDetails } = useReadContract({
//     abi: dimeAbi,
//     address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
//     functionName: "getLockDetails",
//     args: [0], // replace with the billId you want to use
//   });

//   const { data: databills, isLoading: isLoadingbills, isError: isErrorbills } = useReadContract({
//     abi: dimeAbi,
//     address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
//     functionName: "bills",
//     args: [123], // replace with the index of the bill you want to retrieve
//   });

//   console.log(databills)

//   const { data: databillCount, isLoading: isLoadingbillCount, isError: isErrorbillCount } = useReadContract({
//     abi: dimeAbi,
//     address: "0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2",
//     functionName: "billCount",
//     args: [],
//   });


  const { data: addbilldata,  } = useSimulateContract({
    address: "0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2",
    abi:dimeAbi,
    args: ["0x852CB496f904B784B99E418cDE57452a70fc7559", '100', '10'],
    functionName: "addBill"
});
const {writeContractAsync} = useWriteContract()

//   console.log(databalances);

  const [formData, setFormData] = useState({
    amount:'',
    recipientAddress:'',
    lockDuration:'',
  })

    const addbill = async () => {
        console.log("hello ghhffgg")
      const response = await writeContractAsync(addbilldata.request)
    //  const response =    await writeContract(config,{
    //         address: "0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2",
    //         abi:dimeAbi,
    //         args: ["0x852CB496f904B784B99E418cDE57452a70fc7559", '100', '10'],
    //         functionName: "addBill"
    //     })
    
    //     console.log(response)
    }




 

  return (
    <div>
      <div></div>
      <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <Link href="/">
         <button type="button" className="text-lg text-gray-900 font-semibold sidebar-toggle">
          DIME
        </button>
        </Link>
       
        <ul className="ml-auto flex items-center text-black">
          <ConnectButton />
        </ul>
      </div>

      {/* <p>The result of getLockCountdown is: {datagetLockCountdown}</p> */}
      {/* <p>The result of getBalance is: {data}</p> */}
      {/* <p>The result of getLockDetails is: {datagetLockDetails}</p> */}
      {/* <p>The result of bills is: {databills.recipient} {databills.amount} {databills.paid} {databills.lockDuration} {databills.lockReleaseTime}</p> */}
      {/* <p>The result of billCount is: {databillCount}</p>
      <p>The result of balances is: {databalances}</p> */}

      {/* <p>Contract address: {deployedContract as string}</p> */}

      <div className='m-5'>
      <p>
				<input
					type="text"
					className="text-black"
					placeholder="Amount"
					onChange={(event) => {
						setFormData((prev) => ({...prev, amount:event.target.value }));
					}}
				/>
			</p>

            <p>
				<input
					type="text"
					className="text-black"
					placeholder="recipient Address"
					onChange={(event) => {
						setFormData((prev) => ({...prev, recipient:event.target.value }));
					}}
				/>
			</p>

            <p>
				<input
					type="text"
					className="text-black"
					placeholder="lockDuration"
					onChange={(event) => {
						setFormData((prev) => ({...prev, lockDuration:event.target.value }));
					}}
				/>
			</p>

      </div>

      <button onClick={() => addbill()}>
confirm tx
      </button>

     
    </div>
  );
}

export default Dapp;
