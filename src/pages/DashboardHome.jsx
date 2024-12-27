import React, { useContext } from 'react';
import { FaRunning, FaCalendarAlt, FaUsers, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const DashboardHome = () => {

  const {user} = useContext(AuthContext);

  // UPDATE THE PAGE TITLE:
  document.title = "Marathon Hub | Dashboard Home";

  // Example data
  const userStats = {
    totalMarathons: 5,
    totalParticipants: 120,
    upcomingEvents: 3
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white/40 dark:bg-gray-800 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 capitalize">
            Welcome back, <span className='font-bold text-blue-800'>{user?.displayName}</span>!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's a quick overview of your dashboard. Manage your marathons, view statistics, and more.
          </p>
        </div>

        {/* Overview Card Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 gap-6">
          <div className="card bg-white dark:bg-gray-800 shadow-md p-2 justify-center rounded-md">
            <div className="flex items-center flex-col justify-center">
              <FaRunning className="text-4xl text-indigo-500" />
              <div className='text-center'>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Marathons</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{userStats.totalMarathons}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-md p-6 rounded-md">
            <div className="flex items-center justify-center flex-col">
              <FaUsers className="text-4xl text-green-500" />
              <div className='text-center'>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Total Participants</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{userStats.totalParticipants}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-md p-6 rounded-md">
            <div className="flex items-center justify-center flex-col">
              <FaCalendarAlt className="text-4xl text-blue-500" />
              <div className='text-center'>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Upcoming Events</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{userStats.upcomingEvents}</p>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-md p-6 rounded-md">
            <div className="flex items-center justify-center flex-col text-center">
              <FaTrophy className="text-4xl text-yellow-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Achievements</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">3 Marathons Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/dashboard/add-marathon"
              className="btn bg-blue-900 text-white hover:bg-blue-800 w-full flex items-center justify-center space-x-2 rounded-md"
            >
              <FaRunning />
              <span>Create Marathon</span>
            </Link>
            <Link
              to="/dashboard/my-marathons-list"
              className="btn bg-green-800 text-white hover:bg-green-700 w-full flex items-center justify-center space-x-2 rounded-md"
            >
              <FaCalendarAlt />
              <span>My Marathons</span>
            </Link>
            <Link
              to="/dashboard/my-apply-list"
              className="btn bg-blue-600 text-white hover:bg-blue-500 w-full flex items-center justify-center space-x-2 rounded-md"
            >
              <FaUsers />
              <span>My Applications</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
