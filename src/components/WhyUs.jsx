import React from "react";
import { FaRunning, FaUserFriends, FaShieldAlt, FaChartLine } from "react-icons/fa";

const WhyUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaRunning className="text-blue-500 text-5xl mb-4" />,
      title: "Streamlined Event Management",
      description:
        "Easily organize and manage marathon events with tools designed to simplify your workflow.",
    },
    {
      id: 2,
      icon: <FaUserFriends className="text-green-500 text-5xl mb-4" />,
      title: "Connect Runners & Organizers",
      description:
        "Bring participants and event planners together seamlessly for a smooth experience.",
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-yellow-500 text-5xl mb-4" />,
      title: "Secure & Reliable",
      description:
        "Enjoy peace of mind with a platform built for security, data protection, and reliability.",
    },
    {
      id: 4,
      icon: <FaChartLine className="text-red-500 text-5xl mb-4" />,
      title: "Track Performance",
      description:
        "Monitor event progress, participant stats, and key metrics with our intuitive dashboard.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Why Choose <span className="text-blue-800">Marathon Hub?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="card bg-white shadow-lg hover:shadow-xl  hover:scale-105 active:scale-110 transition-transform duration-300 p-6 rounded-md text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
