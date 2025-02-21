import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../providers/AuthProvider";
import { format } from 'date-fns';
import Spinner from "../components/Spinner";
import EmptyMarathonList from "../components/EmptyMarathonList";
import { useNavigate } from "react-router-dom";

const MyMarathonList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([])
  const [loading, setLoading] = useState(true);

  // UPDATE THE PAGE TITLE:
  document.title = "My Marathons | Marathon Hub";

  // Sample data to simulate marathons created by the user
  const fetchData = async (userEmail) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/marathons/${userEmail}`);
      console.log(data);
      setMarathons(data);
    } catch (error) {
      toast.error("Somethin went wrong!!");
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData(user?.email);
  }, [user.email])

  const handleEdit = (id) => {
    console.log("Edit Marathon:", id);
    // Navigate to the edit page or handle editing logic here
    navigate(`/dashboard/my-marathons-list/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log("Delete Marathon:", id);

    const confirmed = confirm("Are you sure to Delete.\nYou can not reverse this action");

    if (confirmed) {
      // Implement delete functionality
      try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API}/marathons/delete/${id}`)
        console.log(data);
        if (data.deletedCount === 1) {
          fetchData(user?.email);
          return toast.success("Data Deleted Successfully!!");

        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong!!");
      }
    }
  };

  // if loading is true, render the spinner
  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full  mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Marathons</h2>
        {marathons.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table  w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white ">
                  <th className="p-4">#</th>
                  <th className="p-4 min-w-[250px]">Title</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4 min-w-[200px]">Registration</th>
                  <th className="p-4 min-w-[150px]">Location</th>
                  <th className="p-4">Distance</th>
                  <th className="p-4 min-w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {marathons?.map((marathon, index) => (
                  <tr key={marathon._id} className="border-b-2 border-slate-200">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{marathon?.title}</td>
                    <td className="p-4">{format(new Date(marathon?.marathonStartDate), 'P')}</td>
                    <td className="p-4">
                      {format(new Date(marathon?.startRegistrationDate), 'P')} - {format(new Date(marathon?.endRegistrationDate), 'P')}
                    </td>
                    <td className="p-4">{marathon?.location}</td>
                    <td className="p-4">{marathon?.runningDistance}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(marathon._id)}
                          className="btn btn-sm rounded-md btn-primary bg-blue-800 flex items-center gap-1 text-white"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(marathon._id)}
                          className="btn btn-sm btn-error rounded-md flex items-center gap-1 text-white"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyMarathonList></EmptyMarathonList>
        )}
      </div>
    </div>
  );
};

export default MyMarathonList;
