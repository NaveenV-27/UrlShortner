import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-10 bg-cyan-300 h-16 text-black'>
        <div className='text-2xl font-bold font-serif'>
            Bit<span className='text-red-500'>Links</span>
        </div>
        <ul className='flex gap-4'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/shorten">shorten</Link></li>
            <li><Link href="/about">about</Link></li>
        </ul>
      
    </nav>
  )
}

export default Navbar
