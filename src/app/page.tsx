'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <button type="button" onClick={() => router.replace('/googlemap')} className='block container mx-auto px-4  w-24'>
        Click Me!
      </button>
    </div>
  )
}
