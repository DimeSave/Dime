"use client"

import React from 'react';
import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function PayBill() {
  const { writeContractAsync } = useWriteContract();

  const handlePayBill = async (billId) => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'payBill',
        args: ["1"], // Pass the billId as an argument
        value: '', // 10 ETH in wei (adjust as needed)
      });
      console.log('Pay Bill response:', response);
    } catch (error) {
      console.error('Error calling payBill function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
  <h1 className="text-2xl font-bold mb-4">Pay Bill Function</h1>
  <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
      onClick={() => handlePayBill(1)}
  >
    Pay Bill
  </button>
</div>



  );
}

export default PayBill;
