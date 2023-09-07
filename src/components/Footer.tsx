import React from 'react'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='flex justify-center items-center mx-auto' style={{
            width: "80vw",
            height: "10vh"
        }}>
            <Image src='/images/customerIcon.svg' alt='' width={100} height={100} className='mx-auto' style={{
                width: "10vw",
                height: "10vh"
            }}></Image>
            <Image src='/images/adminIcon.svg' alt='' width={100} height={100} className='mx-auto' style={{
                width: "10vw",
                height: "10vh"
            }}></Image>
        </div>
    )
}

export default Footer
