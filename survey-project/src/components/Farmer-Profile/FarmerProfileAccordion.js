import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function FarmerProfileAccordion() {
  const navigate = useNavigate();
  return (
    <div>
      <Accordion className="mt-1">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="fw-bold">Land Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button
            onClick={() => navigate("/dashboard/landdetails")}
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
          <Typography className="fw-bold">Labour Details</Typography>
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
          <Typography className="fw-bold">Machine Details</Typography>
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
          <Typography className="fw-bold">Live Stock Detailss</Typography>
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
