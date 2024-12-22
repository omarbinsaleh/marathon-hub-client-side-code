import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import ErrorElement from "../components/ErrorElement";
import Spinner from "../components/Spinner";
import { AuthContext } from "../providers/AuthProvider";
import UpcomingMarathons from "../components/UpcomingMarathons";
import WhyUs from "../components/WhyUs";

const Home = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState(data?.slice(0, 3));
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const {darkMood, setDarkMood} = useContext(AuthContext);

  // change the page title:
  document.title = "Home | Unity Fund";

  useEffect(() => {
    // fetch 6 running campaigns:
    fetch('https://unity-fund-server.vercel.app/campaigns/limit/6')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      }).catch(error => {
        console.log("Error Happened in the Home:", error);
      });
  }, []);

  if (loading) {
    return <Spinner></Spinner>
  }


  return (
    <div className={`bg-gray-50 ${darkMood ? 'dark' : ''} dark:bg-slate-800`}>
      {/* Banner/Slider Section */}
      <section>
        <Slider sliders={sliders}></Slider>
      </section>

      {/* Marathon Section */}

      {/* Upcomming Marathon Section */}
      <section>
        <UpcomingMarathons></UpcomingMarathons>
      </section>

      {/* Why to choose us*/}
      <section>
        <WhyUs />
      </section>

      {/* Extra Section 2 */}
      <section>
        How it works sections
      </section>
    </div>
  );
};

export default Home;

