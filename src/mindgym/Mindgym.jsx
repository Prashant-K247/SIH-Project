import React from 'react'
import { Link } from 'react-router-dom' 
function mindgym() {
  return (
    <div className='grid grid-cols-3 gap-x-5 gap-y-6'>
        {/* breathing card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link to="/breathing">
          <img
            className="rounded-t-lg w-128 h-64"
            src="https://assets.clevelandclinic.org/m/3809e96e358cfd65/webimage-4-7-8-breathing-1388104915-770x533-1_jpg.png"
            alt="img"
          />
        </Link>
        <div className="p-5">
          <Link to="/breathing">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Breathing Exercise
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-800 ">
            Inhale peace, exhale tension.
          </p>
        </div>
        </div>

        {/* meditation card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link to="/meditation">
          <img
            className="rounded-t-lg w-128 h-64"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvXT-l8EUuzJLnAi2HjyJo99kr5xZ4PCcLg&s"
            alt="img"
            
          />
        </Link>
        <div className="p-5">
          <Link to="/meditation">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Meditation Exercise
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-800 ">
            Still mind, strong soul.
          </p>
        </div>
        </div>

        {/* Nature card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link to="/nature">
          <img
            className="rounded-t-lg w-128 h-64"
            src="data:image/jpeg;base64,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"
            alt="img"
            
          />
        </Link>
        <div className="p-5">
          <Link to="/nature">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Spend time in Nature
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-800 ">
            Take some fresh air and enjoy the beauty of nature.
          </p>
        </div>
        </div>

        {/* Connect with others */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg ">
        <Link to="/community">
          <img
            className="rounded-t-lg w-128 h-64"
            src="https://media.istockphoto.com/id/1395008633/vector/diverse-people-friend-group-round-holding-hands.jpg?s=612x612&w=0&k=20&c=r3_RbrKxgiEZE7Z83l23750nhmfScqPRBG3ALxJG14M="
            alt="img"
            
          />
        </Link>
        <div className="p-5">
          <Link to="/community">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Connect with Others
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-800 ">
            Join a community of like-minded individuals.
          </p>
        </div>
        </div>

    </div>
  )
}

export default mindgym