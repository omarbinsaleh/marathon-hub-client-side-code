import React from "react";
import { FaUsers, FaBullhorn } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

const AboutUs = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 dark:text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
          About Us
        </h2>
        <p className="text-xl mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          At Marathon Hub, we are dedicated to creating a seamless experience for marathon
          organizers and participants. Our platform simplifies the process of organizing, managing,
          and participating in marathons, fostering a vibrant running community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="card p-8 bg-white dark:bg-gray-700 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <TbTargetArrow className="text-blue-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To provide a platform that brings together marathon organizers and participants,
              making the event management process simple and effective.
            </p>
          </div>
          <div className="card p-8 bg-white dark:bg-gray-700 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <FaUsers className="text-green-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Our Team
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A passionate team of developers, event planners, and marathon enthusiasts working
              together to make every event a success.
            </p>
          </div>
          <div className="card p-8 bg-white dark:bg-gray-700 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <FaBullhorn className="text-yellow-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Why Choose Us?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We provide streamlined event management, real-time tracking, and an easy-to-use
              platform to connect runners and organizers with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
