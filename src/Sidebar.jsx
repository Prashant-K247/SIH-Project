import { NavLink, Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex w-screen h-screen bg-gray-900 overflow-hidden">
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700 p-4">
          <img
            src="https://flowbite.com/docs/images/logo.svg" 
            alt="Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-white text-3xl">Logo</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col space-y-4 overflow-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-gray-700 text-blue-400"
                  : "text-blue-300 hover:bg-gray-700"
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
                  ? "bg-gray-700 text-blue-400"
                  : "text-blue-300 hover:bg-gray-700"
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
                  ? "bg-gray-700 text-blue-400"
                  : "text-blue-300 hover:bg-gray-700"
              }`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `rounded-lg p-2 transition font-semibold ${
                isActive
                  ? "bg-gray-700 text-blue-400"
                  : "text-blue-300 hover:bg-gray-700"
              }`
            }
          >
            Community
          </NavLink>
        </nav>
      </aside>

      <main className="ml-64 flex-1 h-screen p-8 bg-gray-950 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
