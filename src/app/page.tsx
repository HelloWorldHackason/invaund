'use client'
import React from 'react'
import Link from 'next/link'
import { getCustomerPins, getAdminPins, setCustomerPin, setAdminPin } from './useDatabase'


export default function Home() {
  console.log( "getCustomerPins: ", getCustomerPins() );
  console.log( "getAdminPins: ", getAdminPins() );
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Link href={"/customerpage"}>
        <div className='block container w-full h-full'>
          Let's Trabel!
        </div>
      </Link>
    </div>
  )
}
