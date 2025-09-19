import React from 'react'
import { Link } from 'react-router-dom'
function Blogs() {
  return (
    <>
      <h1 className='text-4xl font-sans font-bold text-gray-900'>Mind Matters: Doctor’s Blog</h1>

      <div className="flex gap-6 mt-6 justify-center">
        {/* Today's Top Pick Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold mb-2 inline-block">
            Today's Top Pick
          </span>
          <img
            className="rounded-lg mb-3 w-full"
            src="https://i.pinimg.com/736x/86/fc/78/86fc78c02796d200872b8f241a72aca7.jpg"
            alt="Top pick"
          />
          <h2 className="text-2xl font-semibold mb-2 text-black">
            Practical Habits for Mental Wellbeing
          </h2>
          <p className="text-gray-800">
            Explore daily, science-backed routines that help keep your mind focused, resilient, and relaxed. Discover this week's expert recommendations and actionable tips.
          </p>
        </div>

        {/* Upgrade to Premium Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-bold text-gray-950 mb-4">
            Want to read more?
          </h3>
          
          <p className="text-gray-800 mb-6">
            Upgrade to the Premium plan and unlock exclusive content and insights.
          </p>
          <Link to= "/upgrade">
            <button className="py-2 px-6 bg-yellow-400 rounded text-gray-900 font-semibold hover:bg-yellow-500 transition">
            Upgrade to Premium
          </button>
          </Link>
          
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className='grid grid-cols-3 gap-4 mt-8'>
        <div className='bg-white rounded-lg shadow-md p-4 max-w-[30rem]'>
          <div>
            <img
              className='rounded-lg mb-2 w-full'
              src="https://i.pinimg.com/1200x/c4/d8/e6/c4d8e6770cf4028edde2def1bab8c1f7.jpg"
              alt="img"
            />
          </div>
          <h2 className='text-xl font-semibold text-black mb-2'>Blog Post Title 2</h2>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        {/* 2 */}
        <div className='bg-white rounded-lg shadow-md p-4 max-w-[30rem]'>
          <div>
            <img
              className='rounded-lg mb-2 w-full'
              src="https://i.pinimg.com/1200x/50/d2/99/50d29949d4c1f1917933c95c4971061d.jpg"
              alt="img"
            />
          </div>
          <h2 className='text-xl font-semibold text-black mb-2'>Blog Post Title 2</h2>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        {/* 3 */}
        <div className='bg-white rounded-lg shadow-md p-4 max-w-[30rem]'>
          <div>
            <img
              className='rounded-lg mb-2 w-full'
              src="https://i.pinimg.com/736x/31/d7/30/31d7309fbfdb8b23af81d301c10fa47e.jpg"
              alt="img"
            />
          </div>
          <h2 className='text-xl font-semibold text-black mb-2'>Blog Post Title 2</h2>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </>
  )
}

export default Blogs
