import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaUser, FaSun, FaMoon, FaList, FaRunning, FaClipboardList, FaFlagCheckered } from "react-icons/fa";

const Dashboard = () => {
  const toggleTheme = () => {
    const rootElement = document.documentElement;
    if (rootElement.classList.contains("dark")) {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Add Marathon", path: "/dashboard/add-marathon", icon: <FaPlus /> },
    { name: "My Marathons List", path: "/dashboard/my-marathons-list", icon: <FaList /> },
    { name: "My Apply List", path: "/dashboard/my-apply-list", icon: <FaClipboardList /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];

  return (
    <div className="h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-[250px] bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center space-x-4 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <span>Theme</span>
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost"
            aria-label="Toggle Dark Mode"
          >
            <FaSun className="text-yellow-500 dark:hidden" />
            <FaMoon className="hidden dark:inline text-blue-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

