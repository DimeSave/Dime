"use client"

import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';
import React from 'react';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

 export function TransferOwnership({ newOwnerAddress }) {
  const { writeContractAsync } = useWriteContract();

  const handleTransferOwnership = async () => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'transferOwnership',
        args: ["0x851642d53B0482D10c874B5109CEea78d91B35B3"], // Pass the newOwnerAddress as an argument
      });
      console.log('Transfer Ownership response:', response);
    } catch (error) {
      console.error('Error calling transferOwnership function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
    <h1 className="text-2xl font-bold mb-4">Transfer Ownership Function</h1>
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-green-700"
      onClick={handleTransferOwnership}
    >
      Transfer Ownership
    </button>
  </div>
  
  );
}

export default TransferOwnership;
