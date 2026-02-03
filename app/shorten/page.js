"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setgenerated] = useState("")
  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const parsedUrl = shorturl.replace(" ", "-").toLowerCase()

    const raw = JSON.stringify({
      "url": url,
      "shorturl": parsedUrl,
    });
    console.log("Raw:", raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${parsedUrl}`)
        seturl("")
        setshorturl("")
        console.log(result);
        
      })
      .catch((error) => console.error(error));
  }

  return (
    // <div className='flex flex-col gap-4 mx-auto max-w-lg my-16 p-8  bg-cyan-50'>
    //   <center className='font-bold text-lg'>Generate your short URL</center>
    //   <div className="flex flex-col gap-2">

    //     <input type="text" className='border-black border-2 rounded-md py-2 px-4' onChange={e => seturl(e.target.value)} value={url} placeholder='Enter your url' />
    //     <input type="text" className='border-black border-2 rounded-md py-2 px-4' onChange={e => setshorturl(e.target.value)} value={shorturl} placeholder='Enter your preferred short-url' />
    //     <button className='bg-cyan-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white' onClick={generate}>Generate</button>
    //   </div>
    //   {generated && <><span>Generated Link</span><code><Link target='_blank' href={generated}>{generated}</Link></code></>}
    // </div>
    <div className='min-h-[90vh] flex  bg-cyan-50'>

      <div className="flex flex-col gap-6 h-fit bg-white mx-auto min-w-96 my-16 p-8 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-xl text-cyan-600">Generate Your Short URL</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => seturl(e.target.value)}
            value={url}
            placeholder="Enter your URL"
            />
          <input
            type="text"
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => setshorturl(e.target.value)}
            value={shorturl}
            placeholder="Enter your preferred short URL"
            />
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onClick={generate}
            >
            Generate
          </button>
        </div>
        {generated && (
          <div className="mt-4 text-center">
            <span className="block text-cyan-700 font-semibold">Generated Link:</span>
            <code className="text-cyan-600">
              <Link href={generated} target="_blank">
                {generated}
              </Link>
            </code>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
