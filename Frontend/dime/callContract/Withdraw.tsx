import React from 'react';
import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function Withdraw() {
  const { writeContractAsync } = useWriteContract();

  const handleWithdraw = async () => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'withdraw',
        args: ["10"], // Pass the amount to withdraw as an argument
      });
      console.log('Withdraw response:', response);
    } catch (error) {
      console.error('Error calling withdraw function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Withdraw Function</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-green-700"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
}

export default Withdraw;
