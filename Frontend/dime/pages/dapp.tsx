import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'
import Image from 'next/image';

import { AddBill } from '../callContract/AddBill'
import { Deposit } from '../callContract/Deposit'
import { TransferOwnership } from '../callContract/TransferOwnership'
import { Withdraw } from '../callContract/Withdraw'
import { payBill } from '../callContract/PayBill';
import {RenounceOwnership} from '../callContract/RenounceOwnership';

const dapp = () => {
  return (
    <div>
      <div className="py-2 px-6 bg-[#f8f4f3] mb-5  flex items-center shadow-md shadow-black/5  top-0 left-0 z-30">
      <Link href={'/'}>
        <Image
            src="/Dime.jpg"
            width={100}
            height={100}
            alt="DIME"
          />
        </Link>
        <ul className="ml-auto flex items-center text-black">
          <ConnectButton />
        </ul>
      </div>

      <div className=''>
      <AddBill  />
      <Deposit />
      <payBill/>
      <RenounceOwnership />
      <TransferOwnership />
      <Withdraw />
      </div>

      
    </div>
  )
}

export default dapp