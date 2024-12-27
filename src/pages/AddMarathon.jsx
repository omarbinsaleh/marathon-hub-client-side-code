import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";

const AddMarathon = () => {
  // DECLARE COMPONENT STATES
  const { user } = useContext(AuthContext);
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

  // UPDATE PAGE TIELE:
  document.title = "Add Marathon | Marathon Hub";

  // HANDLE INPUT CHANGE EVENT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarathonDetails({ ...marathonDetails, [name]: value });
  };

  // FUNCTION TO HANDLE DATE INPUT PROVIDED BY USERS
  const handleDateChange = (name, date) => {
    setMarathonDetails({ ...marathonDetails, [name]: date });
  };

  // FUNCTION TO HANDLE THE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...marathonDetails,
      registrationCount: 0,
      userInfo: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL
      }
    }

    // Send data to backend
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/marathons/add`, formData)
      console.log(data)

      if (data.insertedId) {
        toast.success("Marathon added successfully!");
        setMarathonDetails({
          title: "",
          coverPhotoURL: "",
          startRegistrationDate: null,
          endRegistrationDate: null,
          marathonStartDate: null,
          location: "",
          runningDistance: "",
          description: "",
        });
      } else {
        toast.error("Failed to add marathon. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto py-12 pt-6">
      <h2 className="text-3xl font-bold text-center mb-8">Create New Marathon</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6"
        encType="multipart/form-data"
      >
        {/* Marathon Title */}
        <div>
          <label className="block text-lg font-medium mb-2">Marathon Title</label>
          <input
            type="text"
            name="title"
            value={marathonDetails.title}
            onChange={handleInputChange}
            placeholder="Enter the marathon title"
            className="input input-bordered w-full rounded-md"
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
            className="input input-bordered w-full rounded-md"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <label className="block text-lg font-medium mb-2">
              Start Registration Date
            </label>
            <DatePicker
              selected={marathonDetails.startRegistrationDate}
              onChange={(date) =>
                handleDateChange("startRegistrationDate", date)
              }
              className="input input-bordered w-full rounded-md"
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
              className="input input-bordered w-full rounded-md"
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
              className="input input-bordered w-full rounded-md"
              placeholderText="e.g: mm/dd/yyyy"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={marathonDetails.location}
            onChange={handleInputChange}
            placeholder="Enter the location"
            className="input input-bordered w-full rounded-md"
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

        {/* Description */}
        <div>
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={marathonDetails.description}
            onChange={handleInputChange}
            placeholder="Enter the marathon description"
            className="textarea textarea-bordered w-full rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center md:text-left">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-auto bg-blue-900 text-white rounded-md"
          >
            Create Marathon
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarathon;
