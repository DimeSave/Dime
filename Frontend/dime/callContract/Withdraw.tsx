import React, { useState } from 'react';
import { useWriteContract, useSimulateContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';


const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';


export function Withdraw() {
  const [formData, setFormData] = useState({
    amount: '',
  });

  const { data, error } = useSimulateContract ({
    address: contractAddress,
    abi: dimeAbi,
    args: [formData.amount],
    functionName: 'withdraw',
   
  })



  const { writeContractAsync } = useWriteContract();

  const handleWithdraw = async () => {
    try {
      if (data && data.request) {
        const response = await writeContractAsync(data.request);
        console.log('Deposit response:', response);
      } else {
        console.error('Invalid contract data:', data);
      }
    } catch (error) {
      console.error('Error depositing:', error);
    }
  }


  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mb-4">WITHDRAW </h1>
      <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Amount"
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, amount: event.target.value }));
          }}
        />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-10 focus:outline-none focus:ring focus:border-blue-700"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
}

export default Withdraw;
