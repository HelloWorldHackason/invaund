import React from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <div className='flex justify-center items-center mx-auto' style={{
            width: "80vw",
            height: "10vh"
        }}>
            <Image src="/images/Beautytourism.svg" alt='' className='w-full mx-auto' width={100} height={100} style={{
                width: "30vw",
                height: "10vh"
            }}></Image>
        </div>
    )
}

export default Header
