import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assests/defaultProfilePicuture.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const FarmerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location.state);
  const { farmerDetails, labourDetails, livestockDetails, machineDetails } =
    location.state;
  console.log("farmerDetails", farmerDetails);
  return (
    <div>
      <div className="col mb-1">Farmer's Profile </div>
      <div style={{ float: "right" }}>
        <button
          type="button"
          className="btn btn-sm m-3 float-right btn-success"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row"></div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={ProfilePic}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "100px" }}
                  />
                  <h5 className="my-3">{farmerDetails.farmerName}</h5>
                  {farmerDetails.nickName && <h6>{farmerDetails.nickName}</h6>}
                  {farmerDetails.phoneNumber && (
                    <p className="text-muted mb-4">
                      {farmerDetails.phoneNumber}
                    </p>
                  )}

                  <p className="text-muted mb-4">
                    Farmer ID - {farmerDetails.id}
                  </p>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <p className="text-center mt-3">Interested In</p>
                <div className="card-body p-0">
                  <Stack className="mb-3 mx-3" spacing={1}>
                    <Chip
                      icon={
                        farmerDetails.organic ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Organic Farming"
                    />
                    <Chip
                      icon={
                        farmerDetails.singleSeed ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Single Seedling"
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      icon={
                        farmerDetails.altCrop ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Alternative Crop"
                    />
                    <Chip
                      icon={
                        farmerDetails.seedVariety ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Seed Variety Advice"
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      icon={
                        farmerDetails.leaseOwnLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To lease Own land"
                    />
                    <Chip
                      icon={
                        farmerDetails.farmRentedLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To Farm Rented Land"
                      variant="outlined"
                      color="primary"
                    />
                  </Stack>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {farmerDetails.farmerName
                          ? farmerDetails.farmerName
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        {farmerDetails.phoneNumber
                          ? farmerDetails.phoneNumber
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Whatsapp number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        {farmerDetails.whatsappNumber
                          ? farmerDetails.whatsappNumber
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Father Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {" "}
                        {farmerDetails.fatherName
                          ? farmerDetails.fatherName
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {(farmerDetails.village
                          ? farmerDetails.village + ", "
                          : "") +
                          (farmerDetails.panchayat
                            ? farmerDetails.panchayat + ", "
                            : "") +
                          (farmerDetails.union
                            ? farmerDetails.union + ", "
                            : "") +
                          (farmerDetails.district
                            ? farmerDetails.district + ", "
                            : "") +
                          (farmerDetails.state ? farmerDetails.state : "")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
