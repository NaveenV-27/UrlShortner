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

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
        seturl("")
        setshorturl("")
        console.log(result);
        
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className='flex flex-col gap-4 mx-auto max-w-lg my-16 p-8  bg-cyan-100'>
      <center className='font-bold text-lg'>Generate your short URL</center>
      <div className="flex flex-col gap-2">

        <input type="text" className='border-black border-2 rounded-md py-2 px-4' onChange={e => seturl(e.target.value)} value={url} placeholder='Enter your url' />
        <input type="text" className='border-black border-2 rounded-md py-2 px-4' onChange={e => setshorturl(e.target.value)} value={shorturl} placeholder='Enter your preferred short-url' />
        <button className='bg-cyan-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white' onClick={generate}>Generate</button>
      </div>
      {generated && <><span>Generated Link</span><code><Link target='_blank' href={generated}>{generated}</Link></code></>}
    </div>
  )
}

export default page
