import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'

import { AddBill } from '../callContract/AddBill'
import { Deposit } from '../callContract/Deposit'
// import { PayBill } from '../callContract/PayBill'
import { TransferOwnership } from '../callContract/TransferOwnership'
import { Withdraw } from '../callContract/Withdraw'
import RenounceOwnership from '@/callContract/RenounceOwnerShip';

const dapp = () => {
  return (
    <div>
      <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <Link href="/">
          <button type="button" className="text-lg text-gray-900 font-semibold sidebar-toggle">
            DIME
          </button>
        </Link>
        <ul className="ml-auto flex items-center text-black">
          <ConnectButton />
        </ul>
      </div>
      <AddBill />
      <Deposit />
      <RenounceOwnership />
      {/* <PayBill /> */}
      <TransferOwnership />
      <Withdraw />
    </div>
  )
}

export default dapp