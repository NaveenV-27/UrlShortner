"use client"

import Image from "next/image";
import logo from "@/public/logo.jpg";
import del from "@/public/delete.png";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setdata] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, index: null })

  const getData = async () => {

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let a = await fetch("http://localhost:3000/api/generate", requestOptions)
    setdata(await a.json())
  }


  useEffect(() => {
    getData()
  }, []);

  const handleDeleteClick = (index) => {
    setDeleteConfirm({ show: true, index })
  }

  const handleDeleteConfirm = async () => {
    const id = deleteConfirm.index
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shorturl: data[id].shorturl,
      }),
    };

    await fetch("http://localhost:3000/api/generate", requestOptions);

    console.log("Deleted URL:", data[id].shorturl);
    setDeleteConfirm({ show: false, index: null })
    getData();
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, index: null })
  }

  return (
    <>
      {/* Confirmation Dialog */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this shortened URL? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-[90vh] flex flex-col">

        {data && (
          <div className="flex flex-col items-center w-screen mt-8">
            <h3 className="font-serif font-bold text-2xl text-cyan-700 mb-4">
              Checkout your previous shortened URLs
            </h3>
            <table className="table-auto w-11/12 rounded-md overflow-hidden my-4 border-collapse shadow-lg max-w-screen-xl">
              <thead className="bg-cyan-500 text-white">
                <tr>
                  <th className="py-2 w-[20%] text-left px-4">SI no</th>
                  <th className="py-2 w-[40%] text-left px-4">URL</th>
                  <th className="py-2 w-[30%] text-left px-4">Short URL</th>
                  <th className="py-2 w-[10%] text-left px-4"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-cyan-100' : 'bg-cyan-200'
                      } text-cyan-700 max-h-4`}
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 overflow-hidden text-ellipsis">
                      <Link href={item.url} target="_blank">
                        <span className="text-cyan-600 underline ">{item.url}</span>
                      </Link>
                    </td>
                    <td className="py-2 pl-4">
                      <Link href={item.shorturl} target="_blank">
                        <span className="text-cyan-600 underline">{`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}</span>
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      <button className="flex items-center justify-center hover:bg-red-100 p-2 rounded-lg" onClick={() => handleDeleteClick(index)}>
                        <Image height={20} width={20} src={del} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
      </main>


    </>
  );
}