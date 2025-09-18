import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='grid'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
    </div>
  )
}

export default Home
