import React from "react";
import "../components/navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navBar container">
        <div className="navLogo glow">FaFaCo.</div>
        <div className="navLink navLinks">
          <a href="/#">Home</a>
          <a href="/#">Documents</a>
          <a href="/#">Reports</a>
          <a href="/#">About</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
