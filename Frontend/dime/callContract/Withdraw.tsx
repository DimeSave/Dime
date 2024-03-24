import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function Withdraw() {
  const { writeContractAsync } = useWriteContract();

  const [formData, setFormData] = useState({
    amount: '',
    recipientAddress: '',
    lockDuration: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleWithdraw = async () => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'withdraw',
        args: ["10"], 
      });
      console.log('Withdraw response:', response);
    } catch (error) {
      console.error('Error calling withdraw function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mb-4">Withdraw </h1>
      <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Amount"
          onChange={(event) => handleInputChange(event, 'amount')}
        />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
}

export default Withdraw;
