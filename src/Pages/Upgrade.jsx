import React from "react";
import { Link } from "react-router-dom";

function Upgrade() {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

        {/* Free Plan */}
        <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Free Plan</h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">₹</span>
            <span className="text-5xl font-extrabold tracking-tight">0</span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
          </div>
          <ul className="space-y-4 my-7 text-gray-500 dark:text-gray-400">
            <li className="flex items-center">✅ Basic Breathing Exercises</li>
            <li className="flex items-center">✅ Access to Blogs</li>
            <li className="flex items-center line-through decoration-gray-400">❌ Guided Meditations</li>
            <li className="flex items-center line-through decoration-gray-400">❌ Premium Support</li>
          </ul>
          <Link to="/">
            <button className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
              Get Started
            </button>
          </Link>
        </div>

        {/* Monthly Plan */}
        <div className="relative w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition dark:bg-gray-800 dark:border-gray-700">
          {/* Badge */}
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">Most Popular</span>
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Monthly Plan</h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">₹</span>
            <span className="text-5xl font-extrabold tracking-tight">99</span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
          </div>
          <ul className="space-y-4 my-7 text-gray-500 dark:text-gray-400">
            <li className="flex items-center">✅ All Free Plan Features</li>
            <li className="flex items-center">✅ Guided Meditations</li>
            <li className="flex items-center">✅ Stress Relief Games</li>
            <li className="flex items-center">✅ Priority Support</li>
            <li className="flex items-center">✅ Weekly Progress Tracker</li>
          </ul>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
            Upgrade Now
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="relative w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition dark:bg-gray-800 dark:border-gray-700">
          {/* Badge */}
          <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">Best Value</span>
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Yearly Plan</h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">₹</span>
            <span className="text-5xl font-extrabold tracking-tight">999</span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/year</span>
          </div>
          <ul className="space-y-4 my-7 text-gray-500 dark:text-gray-400">
            <li className="flex items-center">✅ All Monthly Plan Features</li>
            <li className="flex items-center">✅ Exclusive Guided Courses</li>
            <li className="flex items-center">✅ Personalized Meditation Plans</li>
            <li className="flex items-center">✅ 1-on-1 Expert Q&A (Monthly)</li>
            <li className="flex items-center">✅ Lifetime Progress History</li>
          </ul>
          <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
