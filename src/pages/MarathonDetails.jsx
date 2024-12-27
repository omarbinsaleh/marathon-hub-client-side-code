import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt, FaRunning } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import CountDownTimer from "../components/CountDownTimer";

const MarathonDetails = () => {
   const { marathonId } = useParams();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [marathon, setMarathon] = useState({})
   const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

   useEffect(() => {
      const fetchSingleMarathon = async (id) => {
         try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/marathons?id=${id}`);
            const result = data[0];
            setMarathon(result);
            setIsRegistrationOpen(new Date() >= new Date(result.startRegistrationDate) && new Date() <= new Date(result.endRegistrationDate));
            setLoading(false);
         } catch (error) {
            console.log(error.message);
            toast(error.message);
         }
      }

      fetchSingleMarathon(marathonId);
   }, [marathonId])


   // when the data being loaded:
   if (loading) {
      return <Spinner></Spinner>
   }

   return (
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
         <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
               <img
                  src={marathon?.coverPhotoURL}
                  alt={marathon?.title}
                  className="w-full h-80 object-cover"
               />
               <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                     {marathon?.title}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                     Organized by: {marathon?.userInfo?.name} ({marathon?.userInfo?.email})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
                     <FaMapMarkerAlt className="text-blue-500" />
                     Location: {marathon?.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
                     <FaRunning className="text-green-500" />
                     Distance: {marathon?.runningDistance}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-2">
                     <FaCalendarAlt className="text-yellow-500" />
                     Marathon Date: {format(new Date(marathon?.marathonStartDate), "PPP")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                     Registration: {format(new Date(marathon?.startRegistrationDate), "PPP")} to{" "}
                     {format(new Date(marathon.endRegistrationDate), "PPP")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                     Total Registrations: {marathon?.registrationCount}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-4">
                     {marathon?.description}
                  </p>
                  <div className="mt-6 space-y-5">
                     <div className="flex items-center text-xl gap-5">
                       <CountDownTimer targetDate={marathon?.endRegistrationDate} />
                     </div>
                     <button
                        disabled={!isRegistrationOpen}
                        onClick={() => navigate(`/marathons/register/${marathon._id}`)}
                        className="px-6 btn btn-block max-w-sm hover:ring-2 ring-blue-900 ring-offset-2 uppercase py-3 bg-blue-900 text-white font-medium rounded-sm hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition dark:disabled:text-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed "
                     >
                        {isRegistrationOpen ? 'Register Now' : 'Registration is Currently Closed'}
                     </button>

                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default MarathonDetails;
