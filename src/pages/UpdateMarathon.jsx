import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const UpdateMarathon = () => {
   const { marathonId } = useParams();
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);
   const [loading, setLoading] = useState(true);
   const [marathonDetails, setMarathonDetails] = useState({
      title: "",
      coverPhotoURL: "",
      startRegistrationDate: null,
      endRegistrationDate: null,
      marathonStartDate: null,
      location: "",
      runningDistance: "",
      description: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setMarathonDetails({ ...marathonDetails, [name]: value });
   };

   const handleDateChange = (name, date) => {
      setMarathonDetails({ ...marathonDetails, [name]: date });
   };

   const handleUpdate = async (e) => {
      e.preventDefault();

      const formData = {
         title: marathonDetails.title,
         coverPhotoURL: marathonDetails.coverPhotoURL,
         startRegistrationDate: marathonDetails.startRegistrationDate,
         endRegistrationDate: marathonDetails.endRegistrationDate,
         marathonStartDate: marathonDetails.marathonStartDate,
         location: marathonDetails.location,
         runningDistance: marathonDetails.runningDistance,
         description: marathonDetails.description,
         registrationCount: marathonDetails.registrationCount,
         userInfo: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
         }
      }

      console.log(formData);
      // Send data to backend
      try {
         const { data } = await axios.put(`${import.meta.env.VITE_API}/marathons/update/${marathonId}`, formData);
         console.log(data);
         if(data.modifiedCount) {
            toast.success("Data updated successfully!")
            navigate('/dashboard/my-marathons-list')
         }
      } catch (error) {
         console.log(error.message);
         toast.error("Something went wrong!!")
      }

   };

   useEffect(() => {
      const fetchMarathonData = async (id) => {
         try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/marathons?id=${id}`);
            const marathonData = data[0];
            console.log(marathonData);
            setMarathonDetails(marathonData);
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
      <div className="container mx-auto py-12 pt-6">
         <h2 className="text-3xl font-bold text-center mb-8">Update Marathon Information</h2>
         <form
            onSubmit={handleUpdate}
            className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6"
            encType="multipart/form-data"
         >
            {/* Marathon Title */}
            <div>
               <label className="block text-lg font-medium mb-2">Marathon Title</label>
               <input
                  type="text"
                  name="title"
                  value={marathonDetails?.title}
                  onChange={handleInputChange}
                  placeholder="Enter the marathon title"
                  className="input input-bordered w-full rounded-md dark:text-black"
                  required
               />
            </div>

            {/* Marathon Cover Photo URL */}
            <div>
               <label className="block text-lg font-medium mb-2">Marathon Cover Photo URL</label>
               <input
                  type="text"
                  name="coverPhotoURL"
                  value={marathonDetails.coverPhotoURL}
                  onChange={handleInputChange}
                  placeholder="Enter the cover photo URL"
                  className="input input-bordered w-full rounded-md dark:text-black"
                  required
               />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
               <div className="w-full">
                  <label className="block text-lg font-medium mb-2">
                     Start Registration Date
                  </label>
                  <DatePicker
                     selected={marathonDetails.startRegistrationDate}
                     onChange={(date) =>
                        handleDateChange("startRegistrationDate", date)
                     }
                     className="input input-bordered w-full rounded-md dark:text-black"
                     placeholderText="e.g: mm/dd/yyyy"
                     required
                  />
               </div>
               <div>
                  <label className="block text-lg font-medium mb-2">
                     End Registration Date
                  </label>
                  <DatePicker
                     selected={marathonDetails.endRegistrationDate}
                     onChange={(date) => handleDateChange("endRegistrationDate", date)}
                     className="input input-bordered w-full rounded-md dark:text-black"
                     placeholderText="e.g: mm/dd/yyyy"
                     required
                  />
               </div>
               <div>
                  <label className="block text-lg font-medium mb-2">
                     Marathon Start
                  </label>
                  <DatePicker
                     selected={marathonDetails.marathonStartDate}
                     onChange={(date) => handleDateChange("marathonStartDate", date)}
                     className="input input-bordered w-full rounded-md dark:text-black"
                     placeholderText="e.g: mm/dd/yyyy"
                     required
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
               {/* Location */}
               <div className="">
                  <label className="block text-lg font-medium mb-2">Location</label>
                  <input
                     type="text"
                     name="location"
                     value={marathonDetails.location}
                     onChange={handleInputChange}
                     placeholder="Enter the location"
                     className="input input-bordered w-full rounded-md dark:text-black"
                     required
                  />
               </div>

               {/* Running Distance */}
               <div>
                  <label className="block text-lg font-medium mb-2">Running Distance</label>
                  <select
                     name="runningDistance"
                     value={marathonDetails.runningDistance}
                     onChange={handleInputChange}
                     className="select select-bordered w-full rounded-md dark:text-black"
                     required
                  >
                     <option value="">Select Distance</option>
                     <option value="25k">25k</option>
                     <option value="10k">10k</option>
                     <option value="3k">3k</option>
                  </select>
               </div>
            </div>

            {/* Description */}
            <div>
               <label className="block text-lg font-medium mb-2">Description</label>
               <textarea
                  name="description"
                  value={marathonDetails.description}
                  onChange={handleInputChange}
                  placeholder="Enter the marathon description"
                  className="textarea textarea-bordered w-full rounded-md dark:text-black"
                  required
               />
            </div>

            {/* Submit Button */}
            <div className="text-center md:text-left flex items-center gap-5">
               <button
                  type="submit"
                  className="btn btn-primary  max-w-full md:w-auto bg-blue-900 text-white rounded-md"
               >
                  Update
               </button>
               <button
                  onClick={() => navigate('/dashboard/my-marathons-list')}
                  className="btn btn-primary max-w-full md:w-auto bg-green-900 border-green-700 text-white rounded-md"
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
};

export default UpdateMarathon;
