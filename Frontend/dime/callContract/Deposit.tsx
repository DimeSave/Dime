import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';
import React, { useState } from 'react';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function Deposit() {
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
      <h1 className="text-2xl text-center font-bold mb-4">DEPOSIT</h1>
      <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Amount"
          onChange={(event) => handleInputChange(event, 'amount')}
        />
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
