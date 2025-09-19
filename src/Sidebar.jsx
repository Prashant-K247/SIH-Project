import { NavLink, Outlet } from "react-router-dom";
import mokshpng from './assets/mokshpng.png'
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="flex w-screen h-screen bg-[#462994] overflow-hidden">
      <aside className="fixed top-0 left-0 w-64 h-screen bg-[#462994] border-r border-gray-700 flex flex-col">
        {/* Logo Section */}
        <Link to='/'>
        <div className="flex items-center justify-center h-20 border-b bg-[#462994] p-4">
          <img
            src={mokshpng}  
            alt="Logo" 
            className="w-100 h-70"
          />
          
        </div>
        
        </Link>
        

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col space-y-4 overflow-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
          >
            Games
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
          >
            Insights
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
          >
            Community
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
          >
            Counselors
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-[#a687ff] text-gray-50"
                  : "text-gray-50 hover:bg-[#a687ff]"
              }`
            }
          >
            Contacts
          </NavLink>
        </nav>
      </aside>

      <main className="ml-64 flex-1 h-screen p-8 bg-[#e6def8] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
