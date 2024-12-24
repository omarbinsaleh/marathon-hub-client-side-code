import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import axios from "axios";

const Marathons = () => {
   const [marathons, setMarathons] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchHotMarathons = async () => {
         try {
            const {data} = await axios.get(`${import.meta.env.VITE_API}/marathons?count=6`);
            setMarathons(data);
            setLoading(false);
         } catch (error) {
            console.log(error.message);
            toast.error(error.message);
         }
      }

      fetchHotMarathons();
   }, [])

   if (loading) {
      return <Spinner></Spinner>
   }

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-white">
            Marathons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-sm overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={marathon.coverPhotoURL}
                alt={marathon.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {marathon.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📍 {marathon.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  🗓 Registration:{" "}
                  {new Date(marathon.startRegistrationDate).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                </p>
                <div className="mt-4 text-center">
                  <Link
                    to={`/marathons/${marathon._id}`}
                    className="btn btn-block px-4 py-2 bg-blue-900 border-blue-800  text-white dark:bg-blue-900 dark:hover:bg-blue-700 hover:bg-blue-600 rounded-sm text-sm font-medium"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to='/marathons' className="btn btn-block max-w-sm rounded-sm bg-transparent text-blue-700 hover:text-white hover:ring-2 ring-offset-2 ring-blue-700 text-lg hover:bg-blue-600 uppercase border-blue-600">Explore More Event</Link>
        </div>
      </div>
    </section>
  );
};

export default Marathons;
