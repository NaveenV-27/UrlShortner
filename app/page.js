"use client"

import Image from "next/image";
import logo from "@/public/logo.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setdata] = useState([])
  const getData = async () => {

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let a = await fetch("http://localhost:3000/api/generate", requestOptions)
    setdata(await a.json())
    console.log(data)
  }


  useEffect(() => {
    getData()
  }, [])

  let count = 1;

  return (
    <>

    
<main className="min-h-[90vh] flex flex-col">
  <div className="overflow-x-hidden flex items-center justify-center gap-12 bg-cyan-50 p-8 shadow-md">
    <div className="text-3xl font-bold w-1/2 flex flex-col items-center gap-4 text-cyan-600">
      Try our best-in-the-biz URL shortener
      <Link href="/shorten">
        <button className="ring-2 ring-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all rounded-lg p-2 text-lg font-light font-serif focus:ring-4 focus:ring-cyan-300">
          Try Now
        </button>
      </Link>
    </div>
    <Image
      className="w-1/2"
      src={logo}
      height={400}
      width={640}
      alt="Logo"
    />
  </div>

  {data && (
    <div className="flex flex-col items-center w-screen mt-8">
      <h3 className="font-serif font-bold text-2xl text-cyan-700 mb-4">
        Checkout your previous shortened URLs
      </h3>
      <table className="table-auto w-11/12 rounded-md overflow-hidden my-4 border-collapse shadow-lg">
        <thead className="bg-cyan-500 text-white">
          <tr>
            <th className="py-2 w-[20%] text-left px-4">SI no</th>
            <th className="py-2 w-[50%] text-left px-4">URL</th>
            <th className="py-2 w-[30%] text-left px-4">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-cyan-100' : 'bg-cyan-200'
              } text-cyan-700`}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <Link href={item.url}>
                  <span className="text-cyan-600 underline">{item.url}</span>
                </Link>
              </td>
              <td className="py-2 px-4">
                <Link href={item.shorturl}>
                  <span className="text-cyan-600 underline">{`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</main>


    </>
  );
}
