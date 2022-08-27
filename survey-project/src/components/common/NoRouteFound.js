import React from "react";
import { Link } from "react-router-dom";

const NoRouteFound = () => {
  return (
    <div>
      <p>NoRouteFound</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NoRouteFound;
