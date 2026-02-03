import React from 'react'

const page = () => {
  
  return (
    <div className='w-full min-h-[91.7vh] flex flex-col items-center justify-center bg-slate-950'>
      <h1 className='text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 italic'>404</h1>
      <h2 className='font-bold text-3xl text-white mt-4'>Page Not Found</h2>
      <p className='text-slate-400 mt-2 text-center max-w-md'>Oops! The page you're looking for doesn't exist or has been moved.</p>
      <a href='/' className='mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-900/20'>
        Go Back Home
      </a>
    </div>
  )
}

export default page
