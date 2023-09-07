'use client'
import React from 'react'
import Link from 'next/link'


export default function Home() {
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
