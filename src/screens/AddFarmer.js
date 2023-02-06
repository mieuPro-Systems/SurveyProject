import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FARMER_DETAILS,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import validateFarmerAddInput from "../Validation/FarmerAddition";

const theme = createTheme();

const AddFarmer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location.state", location.state);
  const { update, farmerDetailForUpdate } = location.state;
  const farmerDetails = update ? farmerDetailForUpdate.farmerDetails : ""
  console.log("update", update, "farmerDetails: ", farmerDetails);
  const [farmerData, setFarmerData] = useState({
    farmerName: update ? farmerDetails.farmerName : "",
    nickName: update ? farmerDetails.nickName : "",
    fatherName: update ? farmerDetails.fatherName : "",
    age: update ? farmerDetails.age : "",
    gender: update ? farmerDetails.gender : "",
    phoneNumber: update ? farmerDetails.phoneNumber : "",
    whatsappNumber: update ? farmerDetails.whatsappNumber : "",
    residentialType: update ? farmerDetails.residentialType : "",
    state: update ? farmerDetails.state : "",
    district: update ? farmerDetails.district : "",
    union: update ? farmerDetails.union : "",
    panchayat: update ? farmerDetails.panchayat : "",
    village: update ? farmerDetails.village : "",
    organic: update ? farmerDetails.organic : false,
    singleSeed: update ? farmerDetails.singleSeed : false,
    altCrop: update ? farmerDetails.altCrop : false,
    seedVariety: update ? farmerDetails.seedVariety : false,
    leaseOwnLand: update ? farmerDetails.leaseOwnLand : false,
    farmRentedLand: update ? farmerDetails.farmRentedLand : false,
  });

  const [States, setStates] = useState([]);
  const [District, setDistrict] = useState([]);
  const [Union, setUnion] = useState([]);
  const [Panchayat, setPanchayat] = useState([]);
  const [Village, setVillage] = useState([]);
  const [Error, setError] = useState({})

  const handleInputChange = (e) => {
    setError({})
    setFarmerData({ ...farmerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    console.log("farmerData", farmerData);
    event.preventDefault();
    const { isValid, errors } = validateFarmerAddInput(farmerData)
    console.log("farmer input Validation", isValid, errors)
    if (isValid) {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      console.log("farmerDetails", farmerData);
      if (!update) {
        axiosInstance
          .post("/farmer/create", {
            farmerDetails: farmerData,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("response for create new farmer", res.data);
              dispatch({
                type: SET_FARMER_DETAILS,
                payload: { ...farmerData, farmerId: res.data.farmerId },
              });
              dispatch({
                type: SET_LOADING_FALSE,
              });
              navigate("/dashboard/farmerinfo");
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: "Farmer Added Successfully",
                  snackBarColor: "success",
                },
              });
            } else {
              console.error("Error in adding new farmer");
            }
          })
          .catch((err) => {
            console.log("error in create new user", err.response.data);
            dispatch({
              type: SET_LOADING_FALSE,
            });
          });
      } else {
        axiosInstance
          .put(`/farmer/id/${farmerDetails.farmerId}`, {
            farmerDetails: farmerData,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("response for updating farmer", res.data);
              dispatch({
                type: SET_FARMER_DETAILS,
                payload: { ...farmerData, farmerId: res.data.farmerId },
              });
              navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, farmerDetails: { ...farmerData, farmerId: farmerDetails.farmerId } } })
              dispatch({
                type: SET_LOADING_FALSE,
              });
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: `Farmer Updated Successfully`,
                  snackBarColor: "success",
                },
              });
            } else {
              console.error("Error in adding updating farmer");
              navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate } })
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: `Error while Updating Farmer Detail`,
                  snackBarColor: "warning",
                },
              });
              dispatch({
                type: SET_LOADING_FALSE,
              });
            }
          })
          .catch((err) => {
            console.log("error in create new user", err.response.data);
            dispatch({
              type: SET_LOADING_FALSE,
            });
          });
      }
    }
    setError(errors)
  };

  const handleState = (state) => {
    console.log("StateDropDown", state);
    axiosInstance.get(`/farmer/districts/?state=${state}`).then((res) => {
      if (res.status === 200) {
        console.log("DistrictDropDown", res.data);
        setDistrict(res.data);
      }
    });
  };

  const handleDistrict = (district) => {
    axiosInstance.get(`/farmer/unions/?district=${district}`).then((res) => {
      if (res.status === 200) {
        console.log("UnionDropDown", res.data);
        setUnion(res.data);
      }
    });
  };

  const handleUnion = (union) => {
    axiosInstance.get(`/farmer/panchayats/?union=${union}`).then((res) => {
      if (res.status === 200) {
        console.log("PanchayatDropdown", res.data);
        setPanchayat(res.data);
      }
    });
  };

  const handlePanchayat = (panchayat) => {
    axiosInstance.get(`/farmer/villages/?panchayat=${panchayat}`).then((res) => {
      if (res.status === 200) {
        console.log("VillageDropdown", res.data);
        setVillage(res.data);
      }
    });
  };

  const getState = () => {
    axiosInstance
      .get("/farmer/states")
      .then((res) => {
        if (res.status === 200) {
          console.log("StatesDropdown", res.data);
          setStates(res.data);
        }
      })
      .catch((err) => console.log("err", err));
  };

  // useEffect(() => {
  //   axiosInstance
  //     .get("/farmer/states")
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log("StatesDropdown", res.data);
  //         setStates(res.data).then(
  //           setFarmerData({
  //             ...farmerData,
  //             state: update ? farmerDetails.state : "",
  //           })
  //         );
  //       }
  //     })
  //     .catch((err) => console.log("err", err));
  // }, []);

  useEffect(() => {
    getState();
    if (update) {
      handleState(farmerDetails.state);
      handleDistrict(farmerDetails.district);
      handleUnion(farmerDetails.union);
      handlePanchayat(farmerDetails.panchayat);
    }
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <PersonAddAlt1Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {update ? "Update" : "Add"} Farmer
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="farmername"
                    name="farmerName"
                    required
                    fullWidth
                    id="farmername"
                    label="Farmer Name/முதல் பெயர்"
                    autoFocus
                    color="success"
                    error={Error?.farmerName !== undefined}
                    helperText={Error.farmerName}
                    value={farmerData.farmerName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="nickName"
                    label="Nick Name/அழைப்பெயர்"
                    id="NickName"
                    autoComplete="NickName"
                    color="success"
                    value={farmerData.nickName}
                    onChange={handleInputChange}
                    error={Error?.nickName !== undefined}
                    helperText={Error.nickName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="fatherName"
                    label="Father Name/தந்தையின் பெயர்"
                    id="fatherName"
                    color="success"
                    value={farmerData.fatherName}
                    onChange={handleInputChange}
                    error={Error?.fatherName !== undefined}
                    helperText={Error.fatherName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Age/வயது"
                    id="age"
                    autoComplete="age"
                    color="success"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 3);
                    }}
                    value={farmerData.age}
                    onChange={handleInputChange}
                    error={Error?.age !== undefined}
                    helperText={Error.age}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender/பாலினம்</InputLabel>
                    <Select
                      required
                      name="gender"
                      labelId="gender"
                      id="gender"
                      label="Gender/பாலினம்"
                      value={farmerData.gender}
                      error={Error?.gender !== undefined}
                      onChange={handleInputChange}
                    // onChange={handleChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone No/தொலைபேசி எண்"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    color="success"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    value={farmerData.phoneNumber}
                    onChange={handleInputChange}
                    error={Error?.phoneNumber !== undefined}
                    helperText={Error.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="whatsappNumber"
                    label="Whatsapp No/வாட்ஸ்அப் எண்"
                    name="whatsappNumber"
                    autoComplete="whatsappNumber"
                    color="success"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    value={farmerData.whatsappNumber}
                    onChange={handleInputChange}
                  // error={Error?.email !== undefined}
                  // helperText={Error.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="Local">
                      Local(உள்ளூர்)/Outsider(வெளி நபர்)
                    </InputLabel>
                    <Select
                      labelId="Local/Outsider"
                      name="residentialType"
                      id="Local/Outsider"
                      label="Local(உள்ளூர்)/Outsider(வெளி நபர்)"
                      error={Error?.residentialType !== undefined}
                      value={farmerData.residentialType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Local"}>Local</MenuItem>
                      <MenuItem value={"Outsider"}>Outsider</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="state">State/மாநிலம்</InputLabel>
                    <Select
                      labelId="state"
                      id="state"
                      name="state"
                      label="State/மாநிலம்"
                      value={farmerData.state}
                      error={Error?.state !== undefined}
                      onChange={(e) => {
                        handleState(e.target.value);
                        handleInputChange(e);
                      }}
                    >
                      {States.map((State, index) => (
                        <MenuItem key={index} value={State}>{State}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="district">District/மாவட்டம்</InputLabel>
                    <Select
                      labelId="district"
                      name="district"
                      id="district"
                      label="District/மாவட்டம்"
                      value={farmerData.district}
                      error={Error?.district !== undefined}
                      onChange={(e) => {
                        handleDistrict(e.target.value);
                        handleInputChange(e);
                      }}
                    >
                      {District.map((district, index) => (
                        <MenuItem key={index} value={district}>{district}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="Union">Union/ஒன்றியம்</InputLabel>
                    <Select
                      labelId="Union"
                      id="Union"
                      name="union"
                      // value={age}
                      label="Union/ஒன்றியம்"
                      value={farmerData.union}
                      error={Error?.union !== undefined}
                      onChange={(e) => {
                        handleUnion(e.target.value);
                        handleInputChange(e);
                      }}
                    >
                      {Union.map((union, index) => (
                        <MenuItem key={index} value={union}>{union}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="Panchayat">Panchayat/பஞ்சாயத்து</InputLabel>
                    <Select
                      labelId="Panchayat"
                      id="Panchayat"
                      name="panchayat"
                      // value={age}
                      label="Panchayat/பஞ்சாயத்து"
                      value={farmerData.panchayat}
                      error={Error?.panchayat !== undefined}
                      onChange={(e) => {
                        handlePanchayat(e.target.value);
                        handleInputChange(e);
                      }}
                    >
                      {Panchayat.map((panchayat, index) => (
                        <MenuItem key={index} value={panchayat}>{panchayat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">
                      Village(கிராமம்)/Town(நகரம்)
                    </InputLabel>
                    <Select
                      labelId="Village/Town"
                      required
                      id="Village/Town"
                      name="village"
                      label="Village(கிராமம்)/Town(நகரம்)"
                      value={farmerData.village}
                      error={Error?.village !== undefined}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    >
                      {Village.map((village, index) => (
                        <MenuItem key={index} value={village}>{village}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "500",
                  fontSize: "17px",
                }}
              >
                <p>Interested in :</p>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    checked={farmerData.organic}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        organic: !farmerData.organic,
                      })
                    }
                    control={<Checkbox />}
                    label="Organic Farming"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    value="end"
                    checked={farmerData.singleSeed}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        singleSeed: !farmerData.singleSeed,
                      })
                    }
                    control={<Checkbox />}
                    label="Single Seedling"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    value="end"
                    checked={farmerData.altCrop}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        altCrop: !farmerData.altCrop,
                      })
                    }
                    control={<Checkbox />}
                    label="Alternative Crop"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    value="end"
                    checked={farmerData.seedVariety}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        seedVariety: !farmerData.seedVariety,
                      })
                    }
                    control={<Checkbox />}
                    label="Seed Variety Advice"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    value="end"
                    checked={farmerData.leaseOwnLand}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        leaseOwnLand: !farmerData.leaseOwnLand,
                      })
                    }
                    control={<Checkbox />}
                    label="To Lease own Land"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    // fullWidth
                    value="end"
                    checked={farmerData.farmRentedLand}
                    onChange={() =>
                      setFarmerData({
                        ...farmerData,
                        farmRentedLand: !farmerData.farmRentedLand,
                      })
                    }
                    control={<Checkbox />}
                    label="To Farm Rented Land"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
              >
                Next
              </Button>
              {/* <Button
                onClick={() => navigate("/dashboard/farmerinfo")}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
              >
                skip
              </Button> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddFarmer;
