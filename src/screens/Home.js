import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import "../App.css";
import Card from "../components/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  //   console.log(isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="app">
      <Navbar />
      <div style={{ marginTop: '30px' }}>
        <p className="text1 float-start mr-3">உழவுக்கு வந்தனை செய்வோம்...!!!</p>
      </div>
      {/* <div className="homecard">
        <Card />
      </div> */}
    </div>
  );
};

export default Home;
