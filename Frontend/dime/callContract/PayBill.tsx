import React, { useState } from 'react';

import { useSimulateContract, useWriteContract } from 'wagmi';

import { dimeAbi } from '../dimeAbi'

const Paybill = () => {

    const [formData, setFormData] = useState({
      billId: '',
     
    });

    console.log(formData)

    const { data, error } = useSimulateContract({
        address: '0x3d1e462b8b6e4A33f27B521b255D967aFCB8b5c2',
        abi: dimeAbi,
        args: [formData.billId],
        functionName: 'payBill',
      });

      console.log('Simulate Contract data:', data);
  console.log('Simulate Contract error:', error);

  const { writeContractAsync } = useWriteContract();
  
  return (
    <div>
      
    </div>
  )
}

export default Paybill
