import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../providers/AuthProvider";
import { format } from 'date-fns';
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import EmptyApplicationList from "../components/EmptyApplicationList";
import Search from "../components/Search";

const MyApplyList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // fetch applications data from the server [for logedin user]
  const fetchApplications = async (userEmail, searchQuery) => {

    if (!searchQuery) {
      searchQuery = ''
    }

    try {
      // setLoading(true);
      console.log(user?.email);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/marathon-registration/${userEmail}?search=${searchQuery}`);
      console.log(data);
      setApplications(data);
    } catch (error) {
      toast.error("Somethin went wrong!!");
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchApplications(user?.email, search);
  }, [user.email, search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleEdit = (id) => {
    console.log("Edit Marathon:", id);
    // Navigate to the edit page or handle editing logic here
    navigate(`/dashboard/my-applications/update/${id}`)
  };

  const handleDelete = async (id) => {
    console.log("Delete Marathon:", id);

    const confirmed = confirm("Are You Sure? You can not reverse this action")
    if (confirmed) {
      // Implement delete functionality 
      try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API}/marathon-registrations/delete/${id}`);
        if (data.deletedCount === 1) {
          toast.success("Application deleted successfully!!");
          fetchData(user?.email);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong!");
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
        <h2 className="text-2xl font-bold mb-6">My Application</h2>
        <div className="mb-4">
          <Search handleSearch={handleSearch} />
        </div>
        {applications.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table  w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white ">
                  <th className="p-4">#</th>
                  <th className="p-4 min-w-[250px]">Title</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4 min-w-[150px]">Location</th>
                  <th className="p-4">Distance</th>
                  <th className="p-4 min-w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((application, index) => (
                  <tr key={application._id} className="border-b-2 border-slate-200">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4"> <Link to={`/marathons/${application.marathonId}`} className="hover:underline">{application?.marathonTitle}</Link> </td>
                    <td className="p-4">{format(new Date(application?.marathonStartDate), 'P')}</td>

                    <td className="p-4">{application?.marathonLocation}</td>
                    <td className="p-4">{application?.runningDistance}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(application._id)}
                          className="btn btn-sm rounded-md btn-primary bg-blue-800 flex items-center gap-1 text-white"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(application._id)}
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
          <EmptyApplicationList></EmptyApplicationList>
        )}
      </div>
    </div>
  );
};

export default MyApplyList;
