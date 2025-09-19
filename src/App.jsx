import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import Games from './Pages/Games';
import Blogs from './Pages/Blogs';
import Home from './Pages/Home';
import Mindgym from './mindgym/mindgym';
import Community from './Pages/Community';
import Meditation from './mindgym/Meditation';
import Breathing from './mindgym/Breathing';
import Nature from './mindgym/Nature';
import Upgrade from './Pages/Upgrade';

import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Chat from "./pages/ChatPage";
import VideoCall from "./pages/VideoCallPage";
import PeopleList from "./components/PeopleList";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes: no sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / Main App Routes: with sidebar */}
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/mindgym" element={<Mindgym />} />
          <Route path="/community" element={<Community />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/nature" element={<Nature />} />
          <Route path="/upgrade" element={<Upgrade />} />

          <Route path="/chat/:contactId" element={<Chat />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/people" element={<PeopleList />} />
          <Route path="/contacts" element={<ContactsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
