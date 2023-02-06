import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { SET_CROP_DETAILS, SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import GrassIcon from "@mui/icons-material/Grass";
import validateCropInput from "../Validation/Crop";
import Tables from "../components/screens/Tables";

const theme = createTheme();

const CropDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);
    const location = useLocation();
    const { state } = location;
    const { farmerDetailForUpdate } = state
    console.log("crop detail state", state);

    const [CropsDetail, setCropsDetail] = useState([])
    const [CropType, setCropType] = useState("")
    const [Organic, setOrganic] = useState("")
    const [SeedType, setSeedType] = useState("")
    const [Error, setError] = useState({})
    const Headers = ["Type", "Name", "Variety", "Brand", "Area", "Cropped At", "Organic", "Seeding Type", "Harvest Period"]
    const Keys = ["type", "name", "variety", "brand", "area", "croppedAt", "organic", "seedingType", "harvestPeriod"]


    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            cropDetails: CropsDetail,
        };
        if (CropsDetail.length > 0) {
            dispatch({
                type: SET_LOADING_TRUE,
            });
            dispatch({
                type: SET_CROP_DETAILS,
                payload: CropsDetail,
            });
            console.log("farmersredux", farmers);
            const postData = {
                cropDetails: CropsDetail,
            };
            console.log("postdata", postData);
            if (state.update === false) {
                axiosInstance
                    .post("/crop/create", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Uploaded Successfully", res.data);
                            navigate("/dashboard/farmerinfo");
                            dispatch({
                                type: SET_SHOW_SNACKBAR_TRUE,
                                payload: {
                                    snackBarMessage: "Crop Details Added Successfully",
                                    snackBarColor: "success",
                                },
                            });
                            dispatch({
                                type: SET_LOADING_FALSE,
                            });
                        }
                        if (res.status === 400) {
                            console.log("Error", res.data);
                            navigate("/dashboard/farmerinfo");
                            dispatch({
                                type: SET_SHOW_SNACKBAR_TRUE,
                                payload: {
                                    snackBarMessage: "Error while adding Labour details",
                                    snackBarColor: "warning",
                                },
                            });
                            dispatch({
                                type: SET_LOADING_FALSE,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("Error while Uploading liveStock details", err)
                        navigate("/dashboard/farmerinfo");
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Error while adding Labour details",
                                snackBarColor: "warning",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                    );
            }
        }
        if (state.update === true) {
            dispatch({
                type: SET_LOADING_TRUE,
            });
            postData.farmerId = state.farmerId
            console.log("postData", postData)
            axiosInstance
                .put("/crop/", postData)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Uploaded Successfully", res.data);
                        console.log("Crop update ", { ...farmerDetailForUpdate, cropDetails: CropsDetail })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, cropDetails: CropsDetail } })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Crop Details Added Successfully",
                                snackBarColor: "success",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                    if (res.status === 400) {
                        console.log("Error", res.data);
                        console.log("Crop update ", { ...farmerDetailForUpdate, cropDetails: CropsDetail })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, cropDetails: CropsDetail } })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Error while adding Labour details",
                                snackBarColor: "warning",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error while Uploading liveStock details", err)
                    console.log("Crop update ", { ...farmerDetailForUpdate, cropDetails: CropsDetail })
                    navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, cropDetails: CropsDetail } })
                    dispatch({
                        type: SET_SHOW_SNACKBAR_TRUE,
                        payload: {
                            snackBarMessage: "Error while adding Labour details",
                            snackBarColor: "warning",
                        },
                    });
                    dispatch({
                        type: SET_LOADING_FALSE,
                    });
                }
                );
        }
    };

    const addtotable = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const CropsData = {
            farmerId: state.update ? state.farmerId : farmers.farmerDetails.farmerId,
            type: data.get("typeofcrop"),
            name: data.get("cropname"),
            variety: data.get("cropvariety"),
            brand: data.get("brand"),
            area: data.get("area"),
            croppedAt: data.get("croppedat"),
            organic: data.get("organic"),
            seedingType: data.get("seedingtype"),
            harvestPeriod: data.get("harvestperiod"),
        };

        const { isValid, errors } = validateCropInput(CropsData)
        if (isValid) {
            setCropsDetail([...CropsDetail, CropsData])
            console.log("CropsData", CropsData)
        }
        setError(errors)

    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 13
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(() => {
        if (state.update === true) {
            setCropsDetail(state.cropDetails);
            dispatch({
                type: SET_CROP_DETAILS,
                payload: state.cropDetails,
            });
        } else {
            dispatch({
                type: SET_CROP_DETAILS,
                payload: [],
            });
        }
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
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
                            <GrassIcon />
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" marginBottom='10px' textAlign='center' >
                        Add Crops Details
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={addtotable}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="typeofcrop">Type of Cropping</InputLabel>
                                    <Select
                                        required
                                        name='typeofcrop'
                                        labelId="typeofcrop"
                                        id="typeofcrop"
                                        label="Type of Cropping"
                                        onChange={(e) => setCropType(e.target.value)}
                                        value={CropType}
                                    >
                                        <MenuItem value={"Wetland"}>Wet Land</MenuItem>
                                        <MenuItem value={"Dryland"}>Dry Land</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="cropname"
                                    name="cropname"
                                    fullWidth
                                    id="cropname"
                                    label="Crop Name"
                                    color="success"
                                    placeholder='Crop Name'
                                    error={Error?.name !== undefined}
                                    helperText={Error.name}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="cropvariety"
                                    name="cropvariety"
                                    fullWidth
                                    id="cropvariety"
                                    label="Crop Variety"
                                    color="success"
                                    placeholder='Crop Variety'
                                    error={Error?.variety !== undefined}
                                    helperText={Error.variety}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="brand"
                                    name="brand"
                                    fullWidth
                                    id="brand"
                                    label="Brand"
                                    color="success"
                                    placeholder='Brand'
                                    error={Error?.brand !== undefined}
                                    helperText={Error.brand}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="area"
                                    name="area"
                                    fullWidth
                                    id="area"
                                    label="Area"
                                    color="success"
                                    placeholder='in Acres'
                                    type='number'
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = Math.max(0, parseInt(e.target.value))
                                            .toString()
                                            .slice(0, 5);
                                    }}
                                    error={Error?.area !== undefined}
                                    helperText={Error.area}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="croppedat"
                                    name="croppedat"
                                    fullWidth
                                    id="croppedat"
                                    label="Cropped At"
                                    color="success"
                                    placeholder='Starting Date'
                                    error={Error?.croppedAt !== undefined}
                                    helperText={Error.croppedAt}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="organic">Organic</InputLabel>
                                    <Select
                                        required
                                        name='organic'
                                        labelId="organic"
                                        id="organic"
                                        label="Organic"
                                        onChange={(e) => setOrganic(e.target.value)}
                                        value={Organic}
                                    >
                                        <MenuItem value={"Yes"}>Yes</MenuItem>
                                        <MenuItem value={"No"}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="typeofcrop">Seeding Type</InputLabel>
                                    <Select
                                        required
                                        name='seedingtype'
                                        labelId="seedingtype"
                                        id="seedingtype"
                                        label="Seeding Type"
                                        onChange={(e) => setSeedType(e.target.value)}
                                        value={SeedType}
                                    >
                                        <MenuItem value={"Planted"}>Planted</MenuItem>
                                        <MenuItem value={"Seeded"}>Seeded</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="harvestperiod"
                                    name="harvestperiod"
                                    fullWidth
                                    id="harvestperiod"
                                    label="Harvest Period"
                                    color="success"
                                    placeholder='Harvesting Season'
                                    error={Error?.harvestPeriod !== undefined}
                                    helperText={Error.harvestPeriod}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                    <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Crops :</p>
                                    <Chip label={CropsDetail.length} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} className='mx-auto'>
                                <Button
                                    fullWidth
                                    type='submit'
                                    variant="contained"
                                    sx={{ mt: 2, mb: 5, bgcolor: "green" }}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <div>
                        <Tables header={Headers} body={CropsDetail} statevariable={CropsDetail}
                            setstatevariable={setCropsDetail} keys={Keys} />
                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">S.No</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Variety</StyledTableCell>
                                        <StyledTableCell align="center">Brand</StyledTableCell>
                                        <StyledTableCell align="center">Area (acre)</StyledTableCell>
                                        <StyledTableCell align="center">Cropped at</StyledTableCell>
                                        <StyledTableCell align="center">Organic</StyledTableCell>
                                        <StyledTableCell align="center">Seeding Type</StyledTableCell>
                                        <StyledTableCell align="center">Harvest Period</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {CropsDetail.length > 0 &&
                                        CropsDetail.map((crop, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{crop.type}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.name}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.variety}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.brand}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.area}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.croppedAt}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.organic}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.seedingType}</StyledTableCell>
                                                <StyledTableCell align="center">{crop.harvestPeriod}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setCropsDetail(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {CropsDetail.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
                        </TableContainer> */}
                    </div>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid sm={3} marginRight={10}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    if (state.update) {
                                        navigate('/dashboard/viewprofile', { state: farmerDetailForUpdate })
                                    } else {
                                        navigate("/dashboard/farmerinfo")
                                    }
                                }}
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid sm={3} marginLeft={10}>
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default CropDetails;
