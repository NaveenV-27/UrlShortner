"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just redirect to home page
    router.push("/");
  };

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-600 font-serif">Create Account</h1>
          <p className="text-gray-500 mt-2">Join BitLinks and start shortening URLs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-cyan-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-700"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyan-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-700"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyan-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-700"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-700"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-start">
            <input type="checkbox" required className="mt-1 mr-2 accent-cyan-600" />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-cyan-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-cyan-600 hover:underline">Privacy Policy</a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-all focus:ring-4 focus:ring-cyan-300"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </main>
  );
}
