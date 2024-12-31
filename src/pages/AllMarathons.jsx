import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { TbTimezone } from "react-icons/tb";

const AllMarathons = () => {
  // DECLARE STATES
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('');

  // UPDATE THE PAGE TITLE
  document.title = "All Marathons Events | Marathon Hub";

  // FETCH DATA FROM DATABASE AND SAVE IN THE STATES
  useEffect(() => {
    const fetchAllMarathons = async (searchQuery='', sortQuery='') => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/marathons?title=${searchQuery}&sort=${sortQuery}`);
        setMarathons(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }

    fetchAllMarathons(search, sort);
  }, [search, sort])

  // FUNCTION TO HANDLE THE SEARCH FUNCTIONALITY
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // FUNCTION TO HANDLE THE FILTER FUNCTIONALITY
  const handleSort = (e) => {
    setSort(e.target.value);
  }

  // REDNDER THE LOADER WHEN FETCHING DATA
  if (loading) {
    return <Spinner></Spinner>
  }

  console.log("Search and Filter -->", {search, sort});

  return (
    <section className="py-10 pt-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto ">
        {/* HEADER SECTION */}
        <header className="mb-8 flex items-center flex-wrap justify-between gap-3 sticky top-14 z-10 bg-white dark:bg-slate-800 px-4 py-4">
          <div>
            <h1 className="text-3xl font-bold  text-gray-800 dark:text-gray-100">
              All Marathons
            </h1>
          </div>
          <div className=" flex items-center gap-4 flex-wrap md:flex-nowrap">
            <Search handleSearch={handleSearch} />
            <Sort handleChange={handleSort} />
          </div>
        </header>

        {/* MAIN SECTION */}
        {marathons.length > 0 ? (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {marathons?.map((marathon) => (
              <div
                key={marathon._id}
                className="bg-white dark:bg-gray-700 shadow-lg rounded-sm overflow-hidden transform transition duration-200 hover:scale-105"
              >
                {/* COVER PHOTO */}
                <img
                  src={marathon.coverPhotoURL}
                  alt={marathon.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  {/* MARATHON TITLE */}
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {marathon.title}
                  </h2>
                  {/* MARATHON LOCATION */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    📍 {marathon.location}
                  </p>
                  {/* MARATHON REGISTRATION DATE */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    🗓 Registration:{" "}
                    {new Date(
                      marathon.startRegistrationDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      marathon.endRegistrationDate
                    ).toLocaleDateString()}
                  </p>
                  {/* MARATHON POSTED DATE */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-1">
                    <TbTimezone className="text-[19px]"  />
                    {`Posted on : ${new Date(
                      marathon.createdAt
                    ).toLocaleDateString()}`}
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
          </main>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No marathons available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllMarathons;
