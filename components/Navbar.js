import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-10 bg-cyan-600 h-16 text-white shadow-md">
  <div className="text-2xl font-bold font-serif text-white">
    <Link href="/">Bit<span className="text-red-300">Links</span></Link>
  </div>
  <ul className="flex gap-6 text-lg font-medium items-center">
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/contact">Contact</Link>
    </li>
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/shorten">Shorten</Link>
    </li>
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/about">About</Link>
    </li>
    <li>
      <Link href="/login" className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-cyan-600 transition-all">
        Login
      </Link>
    </li>
    <li>
      <Link href="/signup" className="px-4 py-2 rounded-lg bg-white text-cyan-600 hover:bg-cyan-100 transition-all font-semibold">
        Sign Up
      </Link>
    </li>
  </ul>
</nav>
  )
}

export default Navbar
