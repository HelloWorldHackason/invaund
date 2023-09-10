import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='flex justify-center items-center mx-auto' style={{
            width: "80vw",
            height: "10vh"
        }}>
            <Link href={"/"}>
                <Image src="/images/Beautytourism.svg" alt='' className='w-full mx-auto shadow-sm hover:shadow-none hover:translate-y-1 transition-all duration-300' width={100} height={100} style={{
                    width: "30vw",
                    height: "10vh"
                }}></Image>
            </Link>

        </div>
    )
}

export default Header
