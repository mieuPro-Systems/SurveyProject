import React from "react";
import Chip from "@mui/material/Chip";

const LabourDetails = (props) => {

  const labourDetail = {
    cropSpanking: "Crop Spanking",
    handHarvesting: "Hand Harvesting",
    landCleaning: "Land Cleaning",
    landPlowing: "Land Plowing",
    landPlowingWithTractor: "Land Plowing With Tractor",
    paddySteaming: "Paddy Steaming",
    pesticideSpraying: "Pesticide Spraying",
    pumpsetDuty: "Pump Set Duty",
    treeClimbing: "Tree Climbing",
    weedRemoving: "Weed Removing",
    fertilization: "Fertilization"
  };
  console.log('data to render labour', Object.keys(props.labourDetails[0]))
  //   console.log("landdetail", props.labourDetails);
  //   for (let key of Object.keys(props.labourDetails[0])) {
  //     console.log(props.labourDetails[0][key]);
  //   }

  return (
    <div>
      {Object.keys(props.labourDetails[0]).map((detail) => {
        if (detail !== 'farmerId') {
          return <Chip
            key={labourDetail[detail]}
            label={labourDetail[detail]}
            color={props.labourDetails[0][detail] ? "success" : "error"}
            className="m-2"
          />
        }
      }
      )}
    </div>
  );
};

export default LabourDetails;
