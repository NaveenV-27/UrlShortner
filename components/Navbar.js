import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-10 bg-cyan-600 h-16 text-white shadow-md">
  <div className="text-2xl font-bold font-serif text-white">
    Bit<span className="text-red-300">Links</span>
  </div>
  <ul className="flex gap-6 text-lg font-medium">
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/">Home</Link>
    </li>
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/contact">Contact</Link>
    </li>
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/shorten">Shorten</Link>
    </li>
    <li className="hover:text-cyan-300 transition-colors">
      <Link href="/about">About</Link>
    </li>
  </ul>
</nav>
  )
}

export default Navbar
