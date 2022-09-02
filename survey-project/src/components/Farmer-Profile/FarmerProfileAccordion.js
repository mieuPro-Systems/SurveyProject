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
import { useDispatch } from "react-redux";
import { SET_FARMER_DETAILS, SET_UPDATED_LAND_DETAILS, SET_UPDATE_FARMER } from "../../actions/types";

export default function FarmerProfileAccordion(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LandDetailCategory = {
    ownFarming: "Own Farming",
    wasteLand: "Waste Land",
    leasedLand: "Leased Land",
    takenLease: "Taken Lease",
    availableForLease: "Available For Lease",
  };
  const updatedLandDetails = props.landDetails.map((detail) => {
    return {
      ...detail,
      farmerId: props.farmerDetails.farmerId,
      supervisorId: detail.supervisorId.length === 0 ? 'None' : detail.supervisorId
    };
  });

  // console.log("landDetails 1", updatedLandDetails);

  const farmerDetailForUpdate =
  {
    farmerDetails: props.farmerDetails,
    landDetails: props.landDetails,
    cropDetails: props.cropDetails,
    labourDetails: props.labourDetails,
    livestockDetails: props.livestockDetails,
    machineDetails: props.machineDetails,
    gardenDetails: props.gardenDetails,
    buyDetails: props.buyDetails,
    sellDetails: props.sellDetails
  }

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
            onClick={() => {
              console.log('landDetails check', updatedLandDetails)
              dispatch({
                type: SET_UPDATED_LAND_DETAILS,
                payload: updatedLandDetails,
              });
              dispatch({
                type: SET_UPDATE_FARMER,
                payload: farmerDetailForUpdate,
              });
              dispatch({
                type: SET_FARMER_DETAILS,
                payload: props.farmerDetails,
              });

              navigate("/dashboard/landdetails", {
                state: {
                  update: true,
                  landDetails: updatedLandDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
            onClick={() => {
              const updatedCropDetails = props.cropDetails.map((detail) => {
                return {
                  ...detail,
                  farmerId: props.farmerDetails.farmerId,
                  organic: detail.organic ? "Yes" : "No",
                };
              });
              navigate("/dashboard/cropdetails", {
                state: {
                  update: true,
                  cropDetails: updatedCropDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
            onClick={() => {
              const updatedLabourDetails = props.labourDetails.map((detail) => {
                return {
                  ...detail,
                };
              });
              navigate("/dashboard/labour", {
                state: {
                  update: true,
                  labourDetails: updatedLabourDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
            onClick={() => {
              const updatedMachineDetails = props.machineDetails.map(
                (detail) => {
                  return {
                    ...detail,
                    farmerId: props.farmerDetails.farmerId,
                  };
                }
              );
              // console.log("updated machine dtails", updatedMachineDetails);
              navigate("/dashboard/machines", {
                state: {
                  update: true,
                  machineDetails: updatedMachineDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
            onClick={() => {
              const updatedliveStockDetails = props.livestockDetails.map(
                (detail) => {
                  return {
                    ...detail,
                    farmerId: props.farmerDetails.farmerId,
                  };
                }
              );
              // console.log("updated machine dtails", updatedMachineDetails);
              navigate("/dashboard/livestocks", {
                state: {
                  update: true,
                  livestockDetails: updatedliveStockDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
            onClick={() => {
              console.log("props.gardenDetails", props.gardenDetails);
              const updatedGardenDetails = props.gardenDetails.map((detail) => {
                return {
                  ...detail,
                  farmerId: props.farmerDetails.farmerId,
                  organic: detail.organic ? "Yes" : "No",
                };
              });
              console.log("updatedGardenDetails", updatedGardenDetails);
              navigate("/dashboard/gardendetails", {
                state: {
                  update: true,
                  gardenDetails: updatedGardenDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
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
          <Typography className="fw-bold ms-3">Interested in Buying</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => {
              const updatedBuyDetails = props.buyDetails.map((detail) => {
                return {
                  ...detail,
                  farmerId: props.farmerDetails.farmerId,
                };
              });
              console.log("updatedBuyDetails", updatedBuyDetails);
              navigate("/dashboard/buy", {
                state: {
                  update: true,
                  buyDetails: updatedBuyDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.buyDetails.length > 0 ? (
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
          <Typography className="fw-bold ms-3">
            Interested in Selling
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => {
              const updatedSellDetails = props.sellDetails.map((detail) => {
                return {
                  ...detail,
                  farmerId: props.farmerDetails.farmerId,
                  organic: detail.organic ? "Yes" : "No",
                };
              });
              console.log("updatedSellDetails", updatedSellDetails);
              navigate("/dashboard/sell", {
                state: {
                  update: true,
                  sellDetails: updatedSellDetails,
                  farmerId: props.farmerDetails.farmerId,
                  farmerDetailForUpdate: farmerDetailForUpdate
                },
              });
            }}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>

          {props.sellDetails.length > 0 ? (
            <SellDetails sellDetails={props.sellDetails} />
          ) : (
            <p className="text-primary text-center">No Details Added Yet</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
