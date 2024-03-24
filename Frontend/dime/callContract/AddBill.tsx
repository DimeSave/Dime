import React, { useState } from 'react';
import { useSimulateContract, useWriteContract } from 'wagmi';
import { dimeAbi } from '../dimeAbi';

export function AddBill() {
  const { data: addbilldata } = useSimulateContract({
    address: '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2',
    abi: dimeAbi,
    args: ['0x852CB496f904B784B99E418cDE57452a70fc7559', '100', '10'],
    functionName: 'addBill',
  });

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

  const addBill = async () => {
    console.log('Adding bill...');
    try {
      if (addbilldata) { // Check if addbilldata is defined
        const response = await writeContractAsync(addbilldata.request);
        console.log('Transaction response:', response);
      } else {
        console.error('addbilldata is undefined');
      }
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mb-4">ADD BILL</h1>
      <div className="m-5">
        <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Amount"
          onChange={(event) => handleInputChange(event, 'amount')}
        />

        <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Recipient Address"
          onChange={(event) => handleInputChange(event, 'recipientAddress')}
        />

        <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Lock Duration"
          onChange={(event) => handleInputChange(event, 'lockDuration')}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
        onClick={addBill}
      >
        Confirm Transaction
      </button>
    </div>
  );
}

export default AddBill;
