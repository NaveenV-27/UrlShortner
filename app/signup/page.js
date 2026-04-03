"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true);

    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success! Redirect to home/dashboard
        router.push("/");
      } else {
        // Show error from server (e.g., "User already exists")
        setError(result.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-600 font-serif">Create Account</h1>
          <p className="text-gray-500 mt-2">Join BitLinks and start shortening URLs</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

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
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-all focus:ring-4 focus:ring-cyan-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* ... Rest of your UI (Google signup, Login link) remains same ... */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}