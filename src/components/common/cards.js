import React from "react";
import LandscapeIcon from "@mui/icons-material/Landscape";
import "./cards.css";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate(props.data.onclick, { state: { update: false } });
  };

  return (
    <div className="cardscontainer" onClick={handleclick}>
      <div className="cards1">
        <div className="icon">{props.data.icon}</div>
        <div style={{ fontSize: "19px", fontWeight: "600" }}>
          {props.data.headerText}
        </div>
        <div style={{ fontSize: "12px" }}>{props.data.centerText}</div>
      </div>
      <div className="bottom">
        <div style={{ marginTop: "10px" }}>{props.data.bottomText}</div>
      </div>
    </div>
  );
};

export default Cards;
