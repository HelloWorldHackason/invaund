'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <button type="button" onClick={() => router.replace('/googlemap')} className='block container w-full h-full'>
        Click Me!
      </button>
    </div>
  )
}
