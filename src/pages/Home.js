import React from "react";
import PrayerCalendar from "../components/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-5 h-100 w-100">
      <Header />
      <PrayerCalendar />
    </div>
  );
};

export default Home;
