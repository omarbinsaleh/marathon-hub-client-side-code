import React, { useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaUser, FaSun, FaMoon, FaList, FaRunning, FaClipboardList, FaFlagCheckered } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const { darkMood, setDarkMood } = useContext(AuthContext);

  // UPDATE THE PAGE TITLE:
  document.title = "Dashbaord | Marathon Hub";

  // NAVLINKS FOR THE SIDEBAR
  const menuItems = [
    // { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Add Marathon", path: "/dashboard/add-marathon", icon: <FaPlus /> },
    { name: "My Marathons List", path: "/dashboard/my-marathons-list", icon: <FaList /> },
    { name: "My Apply List", path: "/dashboard/my-apply-list", icon: <FaClipboardList /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];

  return (
    <div id="dashboard" className="h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* SIDEBAR */}
      <div className="hidden md:flex flex-col w-[250px] bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-300 dark:border-gray-700">
          <Link to='/dashboard' className="text-2xl font-bold btn btn-block btn-ghost justify-start pl-0 items-end hover:bg-transparent"> <MdDashboard className="text-4xl" /> Dashboard</Link>
        </div>
        <nav className="flex-1 p-4 px-0 space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center space-x-4 p-3 pl-8 rounded-none hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        {/* THEME TOGGLER FOR DARK AND LIGHT MOOD */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <span>Theme</span>
          <ThemeToggle></ThemeToggle>

          <Tooltip
            anchorSelect=".dark-light-mood"
            content={!darkMood ? "Dark Mood" : "Light Mood"}
          />
        </div>
      </div>

      {/* MAIN CONTENTS SECTION */}
      <div className="flex-1 p-6 px-4 overflow-auto relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

