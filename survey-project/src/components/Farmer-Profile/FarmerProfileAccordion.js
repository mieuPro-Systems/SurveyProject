import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import FarmerLandDetails from "./FarmerLandDetails";
import FarmerCropDetails from "./FarmerCropDetails";
import LabourDetails from "./LabourDetails";
import MachineDetails from "./MachineDetails";
import LivestockDetails from "./LivestockDetails";
import GardenDetails from "./GardenDetails";
import BuyDetails from "./BuyDetails";
import SellDetails from "./SellDetails";

export default function FarmerProfileAccordion(props) {
  const navigate = useNavigate();
  const LandDetailCategory = {
    ownFarming: "Own Farming",
    wasteLand: "Waste Land",
    leasedLand: "Leased Land",
    takenLease: "Taken Lease",
    availableForLease: "Available For Lease",
  };
  const updatedLandDetails = props.landDetails.map((detail) => {
    return { ...detail, category: LandDetailCategory[detail.category] };
  });
  console.log("machineDetails", props.machineDetails);
  return (
    <div>
      <Accordion className="mt-1">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="fw-bold ms-3">Land Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() =>
              navigate("/dashboard/landdetails", { state: props.landDetails })
            }
            className="btn btn-success btn-sm float-end mb-3"
          >
            Edit
          </button>
          {props.landDetails.length > 0 ? (
            <FarmerLandDetails landDetails={updatedLandDetails} />
          ) : (
            <p className="text-primary text-center">
              No Land Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="fw-bold ms-3">Crop Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() =>
              navigate("/dashboard/cropdetails", { state: props.cropDetails })
            }
            className="btn btn-success btn-sm float-end mb-3"
          >
            Edit
          </button>
          {props.cropDetails.length > 0 ? (
            <FarmerCropDetails cropDetails={props.cropDetails} />
          ) : (
            <p className="text-primary text-center">
              No Crop Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Labour Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/labour")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>
          {props.labourDetails.length > 0 ? (
            <LabourDetails labourDetails={props.labourDetails} />
          ) : (
            <p className="text-primary text-center">
              No Labour Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Machine Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/machines")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>
          {props.machineDetails.length > 0 ? (
            <MachineDetails machineDetails={props.machineDetails} />
          ) : (
            <p className="text-primary text-center">
              No Machine Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Live Stock Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/livestocks")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.livestockDetails.length > 0 ? (
            <LivestockDetails livestockDetails={props.livestockDetails} />
          ) : (
            <p className="text-primary text-center">
              No LiveStock Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Garden Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/gardendetails")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.gardenDetails.length > 0 ? (
            <GardenDetails gardenDetails={props.gardenDetails} />
          ) : (
            <p className="text-primary text-center">
              No Garden Details Added Yet
            </p>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Buy Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/buy")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.gardenDetails.length > 0 ? (
            <BuyDetails buyDetails={props.buyDetails} />
          ) : (
            <p className="text-primary text-center">No Details Added Yet</p>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Sell Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/sell")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.gardenDetails.length > 0 ? (
            <SellDetails sellDetails={props.sellDetails} />
          ) : (
            <p className="text-primary text-center">No Details Added Yet</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
