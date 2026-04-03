"use client";

import Image from "next/image";
import logo from "@/public/logo.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setdata] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, index: null });
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getData = async () => {
    try {
      const a = await fetch("/api/urls");
      const result = await a.json();
      setdata(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCopy = (url, index) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_HOST}/${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    const item = data[deleteConfirm.index];
    await fetch("/api/generate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shorturl: item.shorturl }),
    });
    setDeleteConfirm({ show: false, index: null });
    getData();
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* Delete Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-cyan-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-auto">
            <h3 className="text-xl font-bold text-gray-900">Delete Link?</h3>
            <p className="text-gray-500 mt-2">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteConfirm({ show: false, index: null })} className="flex-1 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-all">Cancel</button>
              <button onClick={handleDeleteConfirm} className="flex-1 px-4 py-2 bg-red-500 text-white font-medium hover:bg-red-600 rounded-xl transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Wrapped and Centered */}
      <section className="bg-white border-b border-cyan-100 py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Shorten links. <span className="text-cyan-600">Share faster.</span>
            </h1>
            <p className="text-lg text-slate-500 mt-4 mb-8">
              The professional way to manage your links with custom aliases and secure tracking.
            </p>
            <Link href="/shorten">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-200 transition-all hover:-translate-y-1">
                Create New Link
              </button>
            </Link>
          </div>
          <div className="hidden md:block flex-1 relative w-full max-w-sm aspect-square">
             <Image src={logo} alt="Illustration" fill className="object-contain" priority />
          </div>
        </div>
      </section>

      {/* Links List - Strictly Centered Container */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Your Dashboard</h2>
          <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            {data.length} Links
          </span>
        </div>

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-cyan-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Content Side: Text wrapping handled here */}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block mb-1">Destination</span>
                  <p className="text-slate-500 text-sm break-all line-clamp-1 mb-3 pr-4">{item.url}</p>
                  
                  <Link href={`/${item.shorturl}`} target="_blank" className="text-lg font-bold text-cyan-600 hover:text-cyan-700 break-all leading-tight">
                    {process.env.NEXT_PUBLIC_HOST}/{item.shorturl}
                  </Link>
                </div>

                {/* Actions Side: Fixed width buttons */}
                <div className="flex items-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-6">
                  <button 
                    onClick={() => handleCopy(item.shorturl, index)}
                    className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-w-[90px] ${
                      copiedIndex === index 
                      ? 'bg-green-500 text-white' 
                      : 'bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                    }`}
                  >
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </button>
                  
                  <button 
                    onClick={() => setDeleteConfirm({ show: true, index })}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Your link library is empty.</p>
          </div>
        )}
      </section>
    </main>
  );
}