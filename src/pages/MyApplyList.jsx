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

  // UPDATE THE PAGE TITLE:
  document.title = "My Applications | Marathon Hub";

  // FUNCTION: TO FETCH ALL THE NECESSARY DATA FROM THE DATABASE => [SPECIFICALLY CURRENT USER'S APPLICATION DATA]
  const fetchApplications = async (userEmail, searchQuery) => {

    // SET THE DEFAULT VALUE OF THE 'searchQuery', IF IT IS NOT PROVIDED
    if (!searchQuery) {
      searchQuery = ''
    }

    try {
      // MAKE A GET REQUEST TO FETCH DATA FROM THE DATABASE
      console.log(user?.email);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/marathon-registration/${userEmail}?search=${searchQuery}`);
      // LOG THE DATA COMMING FROM THE DATABASE IN THE CONSOLE AND SAVE THEM IN THE STATE
      console.log(data);
      setApplications(data);
    } catch (error) {
      // IF SOMETHING GOES WRONG, LOG THE ERROR OBJECT IN THE CONSOLE
      toast.error("Somethin went wrong!!");
      console.log(error.message);
    } finally {
      // SET THE LOADING STATE TO FALSE:
      setLoading(false)
    }
  }

  // FETCH THE NECCESSARY DATA:
  useEffect(() => {
    fetchApplications(user?.email, search);
  }, [user.email, search])

  // FUNCTION TO HANDLE THE SEARCH FUNCTIONLITY SET WHATEVER USER TYPE IN THE SEARCH BOX TO THE SEARCH STATE
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // FUNCTION: TO HANDLE THE EDIT FUNCTIONALITY
  const handleEdit = (id) => {
    console.log("Edit Marathon:", id);
    // WHEN USER CLICK ON THE 'EDIT' BUTTON, REDIRECT THE USER TO THE 'APPLICATION UPDATE' PAGE, WHERE THE USER CAN SEE THE PREVIOUS INFORMATION HE OR SHE PROVIDED AND CAN UPDATE ANY INFORMATION, IF HE OR SHE WANT
    navigate(`/dashboard/my-applications/update/${id}`)
  };

  // FUNCTION: TO HANDLE THE DELETE FUNCTIONALITY
  const handleDelete = async (id) => {
    console.log("Delete Marathon:", id);
    // ASK USER FOR CONFIRMATION
    const confirmed = confirm("Are You Sure? You can not reverse this action")
    // IF USER CONFIRM, THEN EXECUTE THE DELETE FUNCTIONALITY
    if (confirmed) {
      try {
        // MAKE A DELETE REQUEST TO THE BACKEND
        const { data } = await axios.delete(`${import.meta.env.VITE_API}/marathon-registrations/delete/${id}`);
        // ON SUCCESSFULL DELETE, SHOW USER A SUCCESS MESSAGE
        if (data.deletedCount === 1) {
          toast.success("Application deleted successfully!!");
          fetchData(user?.email);
        }
      } catch (error) {
        // IF SOMETHING GOES WRONG, LOG THE ERROR OBJECT IN THE CONSOLE
        console.log(error.message);
        toast.error("Something went wrong!");
      }
    }
  };

  // RENDER THE SPINNER, WHEN THE DATA IS BEING LOADED
  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full  mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-6">

        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-center">My Application</h2>
          </div>
          <div className="flex items-center flex-1 justify-center md:justify-end">
            <Search handleSearch={handleSearch} />
          </div>
        </header>
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
