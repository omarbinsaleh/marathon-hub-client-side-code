import React, { useContext, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
   const { user } = useContext(AuthContext);
   const [isEditing, setIsEditing] = useState(false);
   const [userInfo, setUserInfo] = useState({
      name: user?.displayName,
      email: user?.email,
      phone: user.auth.currentUser.phoneNumber,
      address: "",
   });

   // UPDATE THE PAGE TITLE:
   document.title = "Marathon Hub | Profile";

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const toggleEdit = () => {
      setIsEditing(!isEditing);
   };

   const saveChanges = () => {
      setIsEditing(false);
      // You can integrate API calls to save user information here.
      console.log("User Info Saved:", userInfo);
   };

   return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 ">
         <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div>
               <img src={user?.photoURL} className="w-[100px] aspect-square rounded-full mx-auto ring-2 ring-offset-2 mb-10" alt="" />
            </div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Profile Info */}
               <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                     type="text"
                     name="name"
                     value={userInfo.name}
                     onChange={handleInputChange}
                     disabled
                     readOnly
                     className={`input input-bordered w-full cursor-not-allowed ${isEditing ? "" : "bg-gray-200 dark:bg-gray-700 rounded-sm"
                        }`}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                     type="email"
                     name="email"
                     value={userInfo.email}
                     onChange={handleInputChange}
                     disabled
                     readOnly
                     className={`input input-bordered w-full cursor-not-allowed ${isEditing ? "" : "bg-gray-200 dark:bg-gray-700 rounded-sm"
                        }`}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                     type="text"
                     name="phone"
                     value={userInfo.phone}
                     onChange={handleInputChange}
                     placeholder={userInfo.phone || "N/A" }
                     disabled={!isEditing}
                     className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 dark:bg-gray-700 rounded-sm"
                        }`}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                     type="text"
                     name="address"
                     value={userInfo.address}
                     onChange={handleInputChange}
                     placeholder={userInfo.address || "N/A"}
                     disabled={!isEditing}
                     className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 dark:bg-gray-700 rounded-sm"
                        }`}
                  />
               </div>
            </div>
            {/* Edit/Save Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
               {!isEditing ? (
                  <button
                     onClick={toggleEdit}
                     className="btn btn-primary flex items-center space-x-2 bg-blue-900 text-white rounded-md"
                  >
                     <FaEdit />
                     <span>Edit Profile</span>
                  </button>
               ) : (
                  <button
                     onClick={saveChanges}
                     className="btn btn-success text-white rounded-md flex items-center space-x-2"
                  >
                     <FaSave />
                     <span>Save Changes</span>
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default Profile;
