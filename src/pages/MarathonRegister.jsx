import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEnvelope, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const MarathonRegister = () => {
   const navigate = useNavigate();
   const { marathonId } = useParams();
   const { user } = useContext(AuthContext);
   const [marathon, setMarathon] = useState({})
   const [loading, setLoading] = useState(true);
   const [formData, setFormData] = useState({
      email: user.email,
      firstName: "",
      lastName: "",
      contactNumber: "",
      additionalInfo: "",
   });

   // UPDATE THE PAGE TITLE:
   document.title = "Marathon Hub | Marathon Registration";

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleRegister = async (e) => {
      e.preventDefault();

      // Make API Call
      const registrationDetails = {
         ...formData,
         marathonId,
         marathonTitle: marathon.title,
         marathonStartDate: marathon.marathonStartDate,
         marathonLocation: marathon.location,
         runningDistance: marathon.runningDistance
      };

      if (user?.email === marathon?.userInfo.email) {
         return toast.error("You are not allowed to apply in your own Marathon Event")
      }

      // make a post request and save data to the database and increment registration count
      try {
         const { data } = await axios.post(`${import.meta.env.VITE_API}/marathon-registrations`, registrationDetails);

         if (data.message === 'NOT ALLOWED') {
            return toast.error("You have already applied to this event");
         }

         if (data.insertedId) {
            toast.success("Registration Done Successfully!!");
            navigate('/dashboard/my-apply-list')
         }
      } catch (error) {
         console.log(error.message);
         toast.error("Something went wrong!")
      }

   };

   useEffect(() => {
      const fetchMarathonData = async (id) => {
         try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/marathons?id=${id}`);
            const finalData = data[0];
            setMarathon(finalData);
            setLoading(false);
         } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong!!")
         }
      }

      fetchMarathonData(marathonId);
   }, [marathonId])


   if (loading) {
      return <Spinner></Spinner>
   }

   return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-10 px-4">
         <div className="w-full max-w-lg bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
               Register for {marathon.title}
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
               {/* Email */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Email</label>
                  <div className="relative">
                     <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="pl-10 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                     />
                  </div>
               </div>
               {/* Marathon Title */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Marathon Title</label>
                  <input
                     type="text"
                     value={marathon.title}
                     readOnly
                     className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  />
               </div>
               {/* Marathon Start Date */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Marathon Start Date</label>
                  <div className="relative">
                     <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                     <input
                        type="text"
                        value={new Date(marathon.marathonStartDate).toDateString()}
                        readOnly
                        className="pl-10 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                     />
                  </div>
               </div>
               {/* First Name */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">First Name</label>
                  <input
                     type="text"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleChange}
                     placeholder="Enter your first name"
                     className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                     required
                  />
               </div>
               {/* Last Name */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Last Name</label>
                  <input
                     type="text"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleChange}
                     placeholder="Enter your last name"
                     className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                     required
                  />
               </div>
               {/* Contact Number */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Contact Number</label>
                  <div className="relative">
                     <FaPhoneAlt className="absolute top-3 left-3 text-gray-400" />
                     <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        className="pl-10 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        required
                     />
                  </div>
               </div>
               {/* Additional Info */}
               <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-1">Additional Info</label>
                  <textarea
                     name="additionalInfo"
                     value={formData.additionalInfo}
                     defaultValue={marathon.additionalInfo}
                     onChange={handleChange}
                     placeholder="Any additional information you'd like to share"
                     className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  />
               </div>
               {/* Submit Button */}
               <div>
                  <button
                     type="submit"
                     className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition"
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
      </section>
   );
};

export default MarathonRegister;
