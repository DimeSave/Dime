import React, { useState } from 'react'
import { dimeAbi } from '../dimeAbi';
import { useSimulateContract, useWriteContract } from 'wagmi';

const BillPayment = () => {
     
    const [formData, setFormData] = useState ({
        billId: '',
    })

    console.log(formData)

    const { data, error } = useSimulateContract({
        address: '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2',
        abi: dimeAbi,
        args: [formData.billId],
        functionName: 'payBill',
    })

    console.log('Simulate Contract data:', data);
    console.log('Simulate Contract error:', error);

    const { writeContractAsync } = useWriteContract();

    const handleAddBill = async () => {
        try {
            if (data && data.request) {
                const response = await writeContractAsync(data.request);
                console.log('Pay Bill response:', response);
            } else {
                console.error('Invalid contract data:', data);
            }
        } catch (error) {
            console.error('Error paying bill:', error);
        }
    }
        

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mb-4">PAY BILL</h1>
      <div className="m-5">
       
        <input
          type="text"
          className="border border-purple-500 rounded-md px-4 py-2 w-full mb-4"
          placeholder="Bill ID"
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, billId: event.target.value }));
          }}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring focus:border-blue-700"
        onClick={handleAddBill}
      >
        Confirm Transaction
      </button>
    </div>
  )
}

export default BillPayment
