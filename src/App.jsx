import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Sidebar from './Sidebar'

import Games from './Pages/Games'
import Blogs from './Pages/Blogs' 
import Home from './Pages/Home'
import Mindgym from './mindgym/mindgym' 
import Community from './Pages/Community'


function App() {
  return (
    <Router>
      <div>
        <header className='w-full h-20 px-4 py-5 bg-gray-800 '>
          
        </header>
      </div>
      <Routes >
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/mindgym" element={<Mindgym />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
      
    </Router>
  )
}

export default App
