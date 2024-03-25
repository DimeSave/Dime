import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';

const contractAddress = '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2';

export function PayBill() {
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


  const handlePayBill = async () => {
    try {
      const response = await writeContractAsync({
        address: contractAddress,
        abi: dimeAbi,
        functionName: 'payBill',
        args: [1], // Pass the billId as an argument
        value: BigInt(0), // Set value to BigInt(0) for empty value (adjust as needed)
      });
      console.log('Pay Bill response:', response);
    } catch (error) {
      console.error('Error calling payBill function:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mb-4">Pay Bill </h1>

      <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Amount"
          onChange={(event) => handleInputChange(event, 'amount')}
        />

<input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Address"
          onChange={(event) => handleInputChange(event, 'amount')}
        />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
        onClick={handlePayBill}
      >
        Pay Bill
      </button>
    </div>
  );
}

export default PayBill;
