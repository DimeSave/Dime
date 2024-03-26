"use client";

import React from 'react'





const ProductList = () => {
  return (
    <div className="px-2 py-20 w-full flex justify-center">
    <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
        <div className="lg:w-1/2">
            
           <img src="https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
            <h2 className="text-2xl text-gray-800 font-bold">
            Dime DApp Revolutionizes Crypto Savings and Bill Payments with <span className='text-indigo-600'>Arbitrum Integration</span> 
                
            </h2>
            <p className="mt-4 text-gray-600">
            Dime is a decentralized application (DApp) designed to help users manage their cryptocurrency savings and automate bill payments. Utilizing the efficiency and scalability of Arbitrum Layer 2 technologies, this DApp aims to provide a secure and user-friendly platform for financial management in the crypto space.
            </p>
          
        </div>
    </div>
</div>
  )
}

export default ProductList
