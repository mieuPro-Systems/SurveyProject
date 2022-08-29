import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import FarmerLandDetails from "./FarmerLandDetails";

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
  console.log("landDetail", props.landDetails);
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
          <FarmerLandDetails landDetails={updatedLandDetails} />
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fw-bold ms-3">Live Stock Detailss</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/livestocks")}
            className="btn btn-success btn-sm float-end"
          >
            Edit
          </button>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
