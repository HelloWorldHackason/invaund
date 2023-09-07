import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className='flex justify-center items-center mx-auto' style={{
            width: "80vw",
            height: "10vh"
        }}>
            <Link href={"/customerpage"} className='mx-auto'>
                <Image src='/images/customerIcon.svg' alt='' width={100} height={100} style={{
                    width: "10vw",
                    height: "10vh"
                }}></Image>
            </Link>

            <Link href={"/adminpage"} className='mx-auto'>
                <Image src='/images/adminIcon.svg' alt='' width={100} height={100} style={{
                    width: "10vw",
                    height: "10vh"
                }}></Image>
            </Link>

        </div>
    )
}

export default Footer
