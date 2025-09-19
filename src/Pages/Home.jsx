import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="space-y-5">
      {/* Two-card row, Mind Gym fixed, Assessment fills */}
      <div className="grid grid-cols-[max-content_1fr] gap-5">
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link to="/mindgym">
            <img
              className="rounded-t-lg"
              src="https://www.eurokidsindia.com/blog/wp-content/uploads/2023/11/top-10-brain-gym-exercises-for-kids-870x570.jpg"
              alt="img"
            />
          </Link>
          <div className="p-5">
            <Link to="/mindgym">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mind Gym
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Because your mind deserves a workout too.
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
          <div className="">
            <Link to="/mindgym">
            <img
              className="rounded-t-lg h-80 w-200"
              src="https://www.harbingergroup.com/wp-content/uploads/2023/08/MicrosoftTeams-image-21.jpg.webp"
              alt="img"
            />
          </Link>
          <div className='p-5'>
          <Link to="/">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Self Assessment
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              to Calculate your Mental Wellbeing Score.
            </p>
          </div>
            
          </div>
        </div>
      </div>
    <div className='grid grid-cols-2 gap-5'>
         {/* 3rd caard */}
      <div className="bg-white border h-80 max-w-200 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
        <div className="">
          <Link to="/Blogs">
            <img
              className="rounded-t-lg w-full h-50 object-cover mb-2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMNgrry4NBu5xyutJ8cdcYkTQh37YNXa5dqw&s"
              alt="img"
            />
          </Link>
          <div className='p-5'>
            <Link to="/Blogs">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Read Daily Blogs
            </h3>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            to Calculate your Mental Wellbeing Score.
          </p>
          </div>
          
        </div>
      </div>
      {/* 4th */}
      <div className="bg-white border max-w-200 h-80 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
        <div className="">
          <Link to="/Blogs">
            <img
              className="rounded-t-lg w-full h-50 object-cover mb-2"
              src=''
              alt="img"
            />
          </Link>
          <div className='p-5'>
            <Link to="/">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Relax, Play some games
            </h3>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            play games
          </p>
          </div>
          
        </div>
      </div>

    </div>

    </div>
  )
}

export default Home
