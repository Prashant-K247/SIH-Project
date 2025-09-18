import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import Games from './Pages/Games'
import Blogs from './Pages/Blogs' 
import Home from './Pages/Home'
import Mindgym from './mindgym/mindgym' 
import Community from './Pages/Community'
import Upgrade from './Pages/Upgrade'
import Nature from './mindgym/Nature'


function App() {
  return (
    <Router>
      <div>
        <header className="w-full h-20 px-4 py-5 bg-gray-800 flex items-center">
          <Link to="/upgrade" className='ml-auto'>
          <button className="flex items-center text-white font-bold text-xl ml-4 ml-auto bg-gray-600 rounded-lg px-2 py-1 transition  hover:bg-gray-500">
          <h1 className='mb-1'>upgrade</h1>
          </button>
          </Link>
          
        </header>
      </div>
      <Routes >
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/mindgym" element={<Mindgym />} />
          <Route path="/community" element={<Community />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/nature" element={<Nature />} />
        </Route>
      </Routes>
      
    </Router>
  )
}

export default App
