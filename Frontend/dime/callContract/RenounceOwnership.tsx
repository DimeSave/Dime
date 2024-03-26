"use client"

import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';
import React from 'react';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function  RenounceOwnership() {
  const { writeContractAsync } = useWriteContract();

  const handleRenounceOwnership = async () => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'renounceOwnership',
        args: [], // No arguments for this function
      });
      console.log('Renounce Ownership response:', response);
    } catch (error) {
      console.error('Error calling renounceOwnership function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5"> 
       <h1 className="text-2xl  text-center font-bold mb-4">RENOUNCE OWNERSHIP</h1>
    <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
      onClick={handleRenounceOwnership}
    >
      Renounce Ownership
    </button>
  </div>
  
  );
}

export default RenounceOwnership;
