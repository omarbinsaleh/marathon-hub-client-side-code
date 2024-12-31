import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import ErrorElement from "../components/ErrorElement";
import Spinner from "../components/Spinner";
import { AuthContext } from "../providers/AuthProvider";
import UpcomingMarathons from "../components/UpcomingMarathons";
import WhyUs from "../components/WhyUs";
import AboutUs from "../components/AboutUs";
import Marathons from "../components/Marathons";

const Home = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState(data?.slice(0, 3));
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const {darkMood, setDarkMood} = useContext(AuthContext);

  // CHANGE THE PAGE TITLE:
  document.title = "Home | Marathon Hub";

  // FETCH NECESSARY DATA FROM THE DATABASE: => HERE ONLY SIX MARATHON EVENT DATA TO DISPLAY IN THE HOME PAGE
  useEffect(() => {
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
      {/* SLIDER SECTION */}
      <section>
        <Slider></Slider>
      </section>

      {/* HOT MARATHONS SECTIONS: => ONLY SIX MARATHON EVENT DATA WILL BE DISPLAYED */}
      <section>
        <Marathons></Marathons>
      </section>

      {/* UPCOMMING MARATHON EVENT SECTIONS: UPCOMMING MARATHON EVENT WILL BE DISPLAYED HERE */}
      <section>
        <UpcomingMarathons></UpcomingMarathons>
      </section>

      {/* 'WHY TO CHOOSE US' SECTIONS'*/}
      <section>
        <WhyUs />
      </section>

      {/* ABOUT US SECTIONS */}
      <section>
        <AboutUs></AboutUs>
      </section>
    </div>
  );
};

export default Home;

