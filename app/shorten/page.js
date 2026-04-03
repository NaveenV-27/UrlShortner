"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const ShortenPage = () => {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setgenerated] = useState("")
  const [error, setError] = useState("")

  const generate = async () => {
    setError("");
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        shorturl: shorturl, // Sending this is now optional
      }),
    };

    try {
      const response = await fetch("/api/generate", requestOptions);
      const result = await response.json();

      if (result.success) {
        // Use result.shorturl because server might have generated a random one
        setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${result.shorturl}`);
        seturl("");
        setshorturl("");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Are you signed in?");
    }
  }

  return (
    <div className='min-h-[90vh] flex bg-cyan-50'>
      <div className="flex flex-col gap-6 h-fit bg-white mx-auto min-w-96 my-16 p-8 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-xl text-cyan-600 font-serif">Generate Your Short URL</h1>
        
        {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-cyan-100 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => seturl(e.target.value)}
            value={url}
            placeholder="Paste your long URL here"
          />
          <div className="relative">
            <input
              type="text"
              className="w-full border border-cyan-100 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={(e) => setshorturl(e.target.value)}
              value={shorturl}
              placeholder="Custom alias (optional)"
            />
            <span className="text-[10px] text-gray-400 absolute -bottom-5 left-1 italic">
              Leave blank for a random URL
            </span>
          </div>

          <button
            className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all active:scale-95"
            onClick={generate}
          >
            Generate
          </button>
        </div>

        {generated && (
          <div className="mt-6 p-4 bg-cyan-50 border border-cyan-100 rounded-lg text-center">
            <span className="block text-cyan-700 font-semibold mb-1">Your Link is Ready:</span>
            <code className="text-cyan-600 break-all">
              <Link href={generated} target="_blank" className="hover:underline">
                {generated}
              </Link>
            </code>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortenPage;