import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link'
import Image from 'next/image';

import { AddBill } from '../callContract/AddBill'
import { Deposit } from '../callContract/Deposit'
import { TransferOwnership } from '../callContract/TransferOwnership'
import { Withdraw } from '../callContract/Withdraw'
import { PayBill } from '../callContract/PayBill'
import {RenounceOwnership} from '../callContract/RenounceOwnership';
import ThemeSwitcher from "../components/ThemeSwitcher";


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
        <ul className="ml-auto  flex items-center  text-black">
          <div className=' flex justify-center  items-center'>
            <div className='mr-3'>
            <ConnectButton />
            </div>

            <div>
            < ThemeSwitcher/>
            </div>
         
        
          </div>
         
        </ul>
      </div>

      <div className=''>
      <AddBill  />
      <Deposit />
      <PayBill/>
      <RenounceOwnership />
      <TransferOwnership />
      <Withdraw />
      </div>

      
    </div>
  )
}

export default dapp