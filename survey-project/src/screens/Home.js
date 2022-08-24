import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import "../App.css";
import Card from "../components/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="app">
      <div className="row">
        <div className="col-11">
          <Navbar />
          <div>
            <p className="text1">உழவுக்கு வந்தனை செய்வோம்...!!!</p>
            {/* <p className='text2'>Profession of Hope</p> */}
            {/* <p className='text3'>Hope</p> */}
          </div>
          <div>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
