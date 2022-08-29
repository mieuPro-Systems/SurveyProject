import React from "react";
import "../components/card.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();
  return (
    <div className="cardcontainer">
      <div className="card1">
        <div className="text">Login as Admin</div>
        <div className="icon">
          <AdminPanelSettingsIcon style={{ width: "80px", height: "80px" }} />
          <button
            type="button"
            onClick={() =>
              navigate("/login", { state: { loggedInAs: "Admin" } })
            }
            className="btn btn-outline-success button "
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="card2">
        <div className="text">Login as Employee</div>
        <div className="icon">
          <SupervisorAccountIcon style={{ width: "80px", height: "80px" }} />
          <div className="flex-row">
            <button
              type="button"
              onClick={() =>
                navigate("/login", {
                  state: { loggedInAs: "Employee", type: "signIn" },
                })
              }
              className="btn btn-outline-success button btn-sm"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() =>
                navigate("/employeesignup", {
                  state: { loggedInAs: "Employee", type: "signUp" },
                })
              }
              className="btn btn-outline-success button btn-sm ms-1"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
