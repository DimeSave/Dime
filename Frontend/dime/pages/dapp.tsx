import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link';
import {
  useAccount,
  useDisconnect,
  useSimulateContract,
  useWriteContract,
  useBalance,
  useReadContract,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { dimeAbi } from "../dimeAbi";
import { request } from "http";

const Dapp = () => {
  const { isConnected, isConnecting, address } = useAccount();
  const Balance = useBalance({
    address: address,
  });

  const { data: deployedContract, error: contractError } = useReadContract({
    abi: dimeAbi,
    address: '0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38',
    functionName: 'owner',
    args: [],
  });

  const { data: datagetLockCountdown, isLoading: loadinggetLockCountdown, isError: isErrorgetLockCountdown } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "getLockCountdown",
    args: [1], // replace with the billId you want to use
  });

  const { data, isLoading, isError } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "getBalance",
    args: [],
  });

  const { data: datagetLockDetails, isLoading: isLoadinggetLockDetails, isError: isErrorgetLockDetails } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "getLockDetails",
    args: [0], // replace with the billId you want to use
  });

  const { data: databills, isLoading: isLoadingbills, isError: isErrorbills } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "bills",
    args: [123], // replace with the index of the bill you want to retrieve
  });

//   console.log(databills)

  const { data: databillCount, isLoading: isLoadingbillCount, isError: isErrorbillCount } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "billCount",
    args: [],
  });

  console.log(databillCount)

  const { data: databalances, isLoading: isLoadingbalances, isError: isErrorbalances } = useReadContract({
    abi: dimeAbi,
    address: "0xD977A3Cb70De0Cbe61aC60d01730f02F17daEa38",
    functionName: "balances",
    args: ["0x852CB496f904B784B99E418cDE57452a70fc7559"], // replace with the address you want to check the balance for
  });

  console.log(databalances)

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

      <p>The result of getLockCountdown is: {datagetLockCountdown}</p>
      <p>The result of getBalance is: {data}</p>
      <p>The result of getLockDetails is: {datagetLockDetails}</p>
      {/* <p>The result of bills is: {databills.recipient} {databills.amount} {databills.paid} {databills.lockDuration} {databills.lockReleaseTime}</p> */}
      <p>The result of billCount is: {databillCount}</p>
      <p>The result of balances is: {databalances}</p>

      <p>Contract address: {deployedContract as string}</p>
    </div>
  );
}

export default Dapp;
