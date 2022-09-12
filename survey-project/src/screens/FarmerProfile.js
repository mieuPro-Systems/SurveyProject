import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePic from "../assests/defaultProfilePicuture.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import FarmerProfileAccordion from "../components/Farmer-Profile/FarmerProfileAccordion";
import { useDispatch } from "react-redux";
import { SET_UPDATE_FARMER } from "../actions/types";

const FarmerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  console.log('farmer update details', location.state);
  // const {
  //   farmerDetails,
  //   landDetails,
  //   labourDetails,
  //   livestockDetails,
  //   machineDetails,
  //   cropDetails,
  //   gardenDetails,
  //   sellDetails,
  //   buyDetails,
  // } = location.state;
  const { state } = location
  const farmerDetailForUpdate =
  {
    // farmerDetails: state?.update ? state.farmerUpdate : state.farmerDetails,
    farmerDetails: state.farmerDetails,
    landDetails: state.landDetails,
    cropDetails: state.cropDetails,
    labourDetails: state.labourDetails,
    livestockDetails: state.livestockDetails,
    machineDetails: state.machineDetails,
    gardenDetails: state.gardenDetails,
    buyDetails: state.buyDetails,
    sellDetails: state.sellDetails
  }
  // console.log("farmerDetails", farmerDetails);

  // useEffect(() => {
  //   dispatch({
  //     type: SET_FARMER_DETAILS,
  //     payload: {
  //       farmerDetails,
  //       landDetails,
  //       labourDetails,
  //       livestockDetails,
  //       machineDetails,
  //       cropDetails,
  //       gardenDetails,
  //       sellDetails,
  //       buyDetails,
  //     }
  //   })
  // }, [])

  return (
    <div>
      <div className="col mb-1 fw-bold">Farmer's Profile </div>
      <div style={{ float: "right" }}>
        <button
          type="button"
          className="btn btn-sm m-3 float-right btn-success"
          onClick={() => navigate('/dashboard/viewfarmer')}
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
                  <h5 className="mt-3">{farmerDetailForUpdate.farmerDetails.farmerName}</h5>
                  {farmerDetailForUpdate.farmerDetails.nickName && <h6>{farmerDetailForUpdate.farmerDetails.nickName}</h6>}
                  {farmerDetailForUpdate.farmerDetails.phoneNumber && (
                    <p className="text-muted mb-1">
                      {farmerDetailForUpdate.farmerDetails.phoneNumber}
                    </p>
                  )}

                  <p className="">Farmer ID - {farmerDetailForUpdate.farmerDetails.farmerId}</p>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      navigate("/dashboard/addFarmer", {
                        state: { update: true, farmerDetailForUpdate: farmerDetailForUpdate },
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
                        farmerDetailForUpdate.farmerDetails.organic ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Organic Farming"
                      color={farmerDetailForUpdate.farmerDetails.organic ? "success" : "error"}
                      variant={farmerDetailForUpdate.farmerDetails.organic ? "" : "outlined"}
                    />
                    <Chip
                      icon={
                        farmerDetailForUpdate.farmerDetails.singleSeed ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Single Seedling"
                      variant={farmerDetailForUpdate.farmerDetails.singleSeed ? "" : "outlined"}
                      color={farmerDetailForUpdate.farmerDetails.singleSeed ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetailForUpdate.farmerDetails.altCrop ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Alternative Crop"
                      variant={farmerDetailForUpdate.farmerDetails.altCrop ? "" : "outlined"}
                      color={farmerDetailForUpdate.farmerDetails.altCrop ? "success" : "error"}
                    />
                    <Chip
                      icon={
                        farmerDetailForUpdate.farmerDetails.seedVariety ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="Seed Variety Advice"
                      variant={farmerDetailForUpdate.farmerDetails.seedVariety ? "" : "outlined"}
                      color={farmerDetailForUpdate.farmerDetails.seedVariety ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetailForUpdate.farmerDetails.leaseOwnLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To lease Own land"
                      variant={farmerDetailForUpdate.farmerDetails.leaseOwnLand ? "" : "outlined"}
                      color={farmerDetailForUpdate.farmerDetails.leaseOwnLand ? "success" : "error"}
                    />
                  </Stack>
                  <Stack className="mb-3 mx-3" spacing={1} direction="row">
                    <Chip
                      icon={
                        farmerDetailForUpdate.farmerDetails.farmRentedLand ? (
                          <CheckCircleOutlineOutlinedIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label="To Farm Rented 
                      Land"
                      variant={farmerDetailForUpdate.farmerDetails.farmRentedLand ? "" : "outlined"}
                      color={farmerDetailForUpdate.farmerDetails.farmRentedLand ? "success" : "error"}
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
                        {farmerDetailForUpdate.farmerDetails.farmerName
                          ? farmerDetailForUpdate.farmerDetails.farmerName
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
                        {farmerDetailForUpdate.farmerDetails.fatherName
                          ? farmerDetailForUpdate.farmerDetails.fatherName
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
                        {farmerDetailForUpdate.farmerDetails.age ? farmerDetailForUpdate.farmerDetails.age : "-"}
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
                        {farmerDetailForUpdate.farmerDetails.gender
                          ? farmerDetailForUpdate.farmerDetails.gender[0].toUpperCase() +
                          farmerDetailForUpdate.farmerDetails.gender.slice(1).toLowerCase()
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
                        {farmerDetailForUpdate.farmerDetails.phoneNumber
                          ? farmerDetailForUpdate.farmerDetails.phoneNumber
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
                        {farmerDetailForUpdate.farmerDetails.whatsappNumber
                          ? farmerDetailForUpdate.farmerDetails.whatsappNumber
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
                        {farmerDetailForUpdate.farmerDetails.residentialType
                          ? farmerDetailForUpdate.farmerDetails.residentialType[0].toUpperCase() +
                          farmerDetailForUpdate.farmerDetails.residentialType.slice(1).toLowerCase()
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
                              {farmerDetailForUpdate.farmerDetails.village
                                ? farmerDetailForUpdate.farmerDetails.village
                                : "-"}
                            </td>
                            <th>Panchayat:</th>
                            <td>
                              {farmerDetailForUpdate.farmerDetails.panchayat
                                ? farmerDetailForUpdate.farmerDetails.panchayat
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Union:</th>
                            <td>
                              {farmerDetailForUpdate.farmerDetails.union ? farmerDetailForUpdate.farmerDetails.union : "-"}
                            </td>
                            <th>District:</th>
                            <td>
                              {farmerDetailForUpdate.farmerDetails.district
                                ? farmerDetailForUpdate.farmerDetails.district
                                : "-"}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">State:</th>
                            <td colSpan="2">
                              {farmerDetailForUpdate.farmerDetails.state ? farmerDetailForUpdate.farmerDetails.state : "-"}
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
              farmerDetails={farmerDetailForUpdate.farmerDetails}
              landDetails={farmerDetailForUpdate.landDetails}
              cropDetails={farmerDetailForUpdate.cropDetails}
              labourDetails={farmerDetailForUpdate.labourDetails}
              machineDetails={farmerDetailForUpdate.machineDetails}
              livestockDetails={farmerDetailForUpdate.livestockDetails}
              gardenDetails={farmerDetailForUpdate.gardenDetails}
              buyDetails={farmerDetailForUpdate.buyDetails}
              sellDetails={farmerDetailForUpdate.sellDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
