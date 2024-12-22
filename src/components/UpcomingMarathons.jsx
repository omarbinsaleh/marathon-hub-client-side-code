import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const marathons = [
  {
    id: 1,
    name: "City Run 2025",
    date: "March 15, 2025",
    time: "7:00 AM",
    location: "Dubai, UAE",
    image: "https://promosevensports.com/wp-content/uploads/2024/12/expocity-dubai-half-marathon-inside-left.png", 
  },
  {
    id: 2,
    name: "Beachside Marathon",
    date: "April 20, 2025",
    time: "6:00 AM",
    location: "Santa Monica, USA",
    image: "https://www.sandiegorunningco.com/wp-content/uploads/2020/06/Pacific-Beach-Half-Marathon-and-5K.jpg",
  },
  {
    id: 3,
    name: "Desert Dash",
    date: "May 10, 2025",
    time: "5:30 AM",
    location: "Dubai, UAE",
    image: "https://namibian.org/img/cms/news/Desert%20Dash%202018%20DH%20237%20web_max1200x800.jpg",
  },
//   {
//     id: 4,
//     name: "Forest Trail Run",
//     date: "June 5, 2024",
//     time: "6:45 AM",
//     location: "Vancouver, Canada",
//     image: "https://via.placeholder.com/300",
//   },
//   {
//     id: 5,
//     name: "Capital City Marathon",
//     date: "July 25, 2024",
//     time: "7:15 AM",
//     location: "London, UK",
//     image: "https://via.placeholder.com/300",
//   },
//   {
//     id: 6,
//     name: "Sunset Sprint",
//     date: "August 12, 2024",
//     time: "5:00 PM",
//     location: "Sydney, Australia",
//     image: "https://via.placeholder.com/300",
//   },
];

const UpcomingMarathons = () => {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Upcoming Marathons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <div
              key={marathon.id}
              className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-sm overflow-hidden"
            >
              <img
                src={marathon.image}
                alt={marathon.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {marathon.name}
                </h3>
                <div className="text-gray-600 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{marathon.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-green-500" />
                    <span>{marathon.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{marathon.location}</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full bg-blue-900 rounded-sm">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMarathons;
