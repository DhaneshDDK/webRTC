import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' w-[100vw] h-[100vh] flex flex-col items-center justify-center flex-wrap gap-5  mt-[-4em]' >
        <h1 className='text-[24px] font-bold'>Select one</h1>
       <div className='flex items-center justify-center flex-wrap gap-5'>
       <Link to='/videoplayer' className='text-[20px] font-bold border-2 rounded-md bg-gray-800 text-white px-3 py-4 shadow-md cursor-pointer'>Video Player</Link>
       <Link to='/videocall' className='text-[20px] font-bold border-2 rounded-md bg-gray-800 text-white px-3 py-4 shadow-md cursor-pointer'>Video call streaming</Link>
       </div>
    </div>
  )
}

export default Home
