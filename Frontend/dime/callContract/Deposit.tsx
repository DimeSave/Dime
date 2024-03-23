import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';
import React from 'react';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function Deposit() {
  const { writeContractAsync } = useWriteContract();

  const handleDeposit = async () => {
    try {
      const valueInWei = BigInt('10000000000000000000'); // Convert string to BigInt
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'deposit',
        value: valueInWei, // Use BigInt for value
      });
      console.log('Deposit response:', response);
    } catch (error) {
      console.error('Error calling deposit function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">DEPOSIT</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
        onClick={handleDeposit}
      >
        Deposit
      </button>
    </div>
  );
}

export default Deposit;
