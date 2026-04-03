"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the "token" cookie exists on mount
  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    setIsLoggedIn(hasToken);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh(); 
  };

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between px-6 md:px-12 bg-white h-20 border-b border-cyan-100 shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-black font-serif tracking-tight">
        <Link href="/" className="text-cyan-600 hover:opacity-90 transition-opacity">
          Bit<span className="text-cyan-400">Links</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
          <li className="hover:text-cyan-600 transition-colors">
            <Link href="/shorten">Shorten</Link>
          </li>
          <li className="hover:text-cyan-600 transition-colors">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-cyan-600 transition-colors">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link 
                href="/login" 
                className="px-5 py-2.5 text-sm font-bold text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-5 py-2.5 text-sm font-bold bg-cyan-600 text-white rounded-xl shadow-lg shadow-cyan-100 hover:bg-cyan-700 transition-all hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-bold border border-red-100 text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar