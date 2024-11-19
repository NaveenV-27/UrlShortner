import Link from "next/link";

export default function About() {
    return (
      <div className="min-h-screen bg-cyan-50 flex flex-col items-center py-16 px-6">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-cyan-600 mb-8">About BitLinks</h1>
  
        {/* Content Section */}
        <div className="max-w-4xl bg-white rounded-lg shadow-md p-8">
          <p className="text-lg text-cyan-700 leading-7 mb-6">
            Welcome to <span className="font-bold text-cyan-600">BitLinks</span>! We’re dedicated to providing the fastest, simplest, and most reliable URL shortening service. 
            Whether you're a marketer, developer, or casual user, our platform helps you transform long URLs into short and shareable links.
          </p>
          <p className="text-lg text-cyan-700 leading-7 mb-6">
            At <span className="font-bold text-cyan-600">BitLinks</span>, we believe in accessibility and efficiency. That's why our tools are designed with user-friendliness in mind. 
            From analyzing link performance to customizing your URLs, we have you covered.
          </p>
          <p className="text-lg text-cyan-700 leading-7">
            Join thousands of users who trust <span className="font-bold text-cyan-600">BitLinks</span> for their URL shortening needs. Let's make the web more concise, one link at a time.
          </p>
        </div>
  
        {/* Call-to-Action Section */}
        <div className="mt-12">
          <Link href="/shorten">
            <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-700 transition-all focus:ring-2 focus:ring-cyan-500">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    );
  }
  