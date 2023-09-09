'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-sky-200'>
        <RecoilRoot>
          <header className='mx-auto mt-3 mb-3 bg-white rounded-2xl' style={{
            width: "80vw",
            height: "10vh"
          }}>
            <Header></Header>
          </header>
          <div className='mx-auto mb-3' style={{
            width: "80vw",
            height: "75vh"
          }}>
            {children}
          </div>
          <footer className='mx-auto bg-white rounded-2xl' style={{
            width: "80vw",
            height: "10vh"
          }}>
            <Footer></Footer>
          </footer>
        </RecoilRoot>
      </body>
    </html>
  )
}
