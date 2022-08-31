import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assests/defaultProfilePicuture.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import FarmerProfileAccordion from "../components/Farmer-Profile/FarmerProfileAccordion";

const FarmerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state);
  const {
    farmerDetails,
    landDetails,
    labourDetails,
    livestockDetails,
    machineDetails,
    cropDetails,
    gardenDetails,
    sellDetails,
    buyDetails,
  } = location.state;
  // console.log("farmerDetails", farmerDetails);
  return (
    <div>
      <div className="col mb-1 fw-bold">Farmer's Profile </div>
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
              <div className="card mb-3">
                <div className="card-body text-center">
                  <img
                    src={ProfilePic}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "100px" }}
                  />
                  <h5 className="mt-3">{farmerDetails.farmerName}</h5>
                  {farmerDetails.nickName && <h6>{farmerDetails.nickName}</h6>}
                  {farmerDetails.phoneNumber && (
                    <p className="text-muted mb-1">
                      {farmerDetails.phoneNumber}
                    </p>
                  )}

                  <p className="">Farmer ID - {farmerDetails.id}</p>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      navigate("/dashboard/addFarmer", {
                        state: { update: true, farmerDetails: farmerDetails },
                      })
                    }
                  >
                    Edit details
                  </button>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <p className="text-center mt-2">Interested in</p>
                <div className="card-body p-0">
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetails.organic ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Organic Farming"
                      color={farmerDetails.organic ? "success" : "error"}
                      variant={farmerDetails.organic ? "" : "outlined"}
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
                      variant={farmerDetails.singleSeed ? "" : "outlined"}
                      color={farmerDetails.singleSeed ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetails.altCrop ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Alternative Crop"
                      variant={farmerDetails.altCrop ? "" : "outlined"}
                      color={farmerDetails.altCrop ? "success" : "error"}
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
                      variant={farmerDetails.seedVariety ? "" : "outlined"}
                      color={farmerDetails.seedVariety ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetails.leaseOwnLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To lease Own land"
                      variant={farmerDetails.leaseOwnLand ? "" : "outlined"}
                      color={farmerDetails.leaseOwnLand ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetails.farmRentedLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To Farm Rented 
                      Land"
                      variant={farmerDetails.farmRentedLand ? "" : "outlined"}
                      color={farmerDetails.farmRentedLand ? "success" : "error"}
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
                      <p className="mb-0">Age</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {farmerDetails.age ? farmerDetails.age : "-"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Gender</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {farmerDetails.gender
                          ? farmerDetails.gender[0].toUpperCase() +
                            farmerDetails.gender.slice(1).toLowerCase()
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
                      <p className="mb-0">Residential Type</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {farmerDetails.residentialType
                          ? farmerDetails.residentialType[0].toUpperCase() +
                            farmerDetails.residentialType.slice(1).toLowerCase()
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
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row">Village:</th>
                            <td>
                              {farmerDetails.village
                                ? farmerDetails.village
                                : "-"}
                            </td>
                            <th>Panchayat:</th>
                            <td>
                              {farmerDetails.panchayat
                                ? farmerDetails.panchayat
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Union:</th>
                            <td>
                              {farmerDetails.union ? farmerDetails.union : "-"}
                            </td>
                            <th>District:</th>
                            <td>
                              {farmerDetails.district
                                ? farmerDetails.district
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">State:</th>
                            <td colSpan="2">
                              {farmerDetails.state ? farmerDetails.state : "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FarmerProfileAccordion
              farmerDetails={farmerDetails}
              landDetails={landDetails}
              cropDetails={cropDetails}
              labourDetails={labourDetails}
              machineDetails={machineDetails}
              livestockDetails={livestockDetails}
              gardenDetails={gardenDetails}
              buyDetails={buyDetails}
              sellDetails={sellDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
