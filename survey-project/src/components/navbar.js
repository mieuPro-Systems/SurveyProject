import React from "react";
import "../components/navbar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="navBar container">
        <div className="navLogo">FaFaCo</div>
        <div className="navLink navLinks">
          <a href="/#">Home</a>
          <a href="/#">Documents</a>
          <Button style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }} onClick={() =>
            navigate("/login", { state: { loggedInAs: "Admin" } })}>Admin</Button>
          <Button style={{ color: 'white', backgroundColor: 'transparent', border: 'none' }} onClick={() =>
            navigate("/login", { state: { loggedInAs: "Employee", type: "signIn" } })}>Staff</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
