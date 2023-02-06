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
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
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
import { SET_GARDEN_DETAILS, SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import YardIcon from "@mui/icons-material/Yard";
import validateGardenInput from "../Validation/Garden";

const theme = createTheme();


const GardenDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);
    const [GardenDetail, setGardenDetail] = useState([]);
    const [Type, setType] = useState("");
    const [Organic, setOrganic] = useState("");
    const [Error, setError] = useState({});
    const location = useLocation();
    const { state } = location;
    const { farmerDetailForUpdate } = state
    console.log("Garden details state", state);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            gardenDetails: GardenDetail,
        };
        if (GardenDetail.length > 0) {
            dispatch({
                type: SET_LOADING_TRUE,
            });
            dispatch({
                type: SET_GARDEN_DETAILS,
                payload: GardenDetail,
            });
            console.log("farmersredux", farmers);
            // const postData = {
            //     gardenDetails: GardenDetail,
            // };
            console.log("postdata", postData);
            if (state.update === false) {
                axiosInstance
                    .post("/garden/create", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Uploaded Successfully", res.data);
                            navigate("/dashboard/farmerinfo");
                            dispatch({
                                type: SET_SHOW_SNACKBAR_TRUE,
                                payload: {
                                    snackBarMessage: "Garden Details Added Successfully",
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
                                    snackBarMessage: "Error while adding Garden details",
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
                                snackBarMessage: "Error while adding Garden details",
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
            axiosInstance
                .put("/garden/", postData)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Uploaded Successfully", res.data);
                        console.log("Garden update ", { ...farmerDetailForUpdate, gardenDetails: GardenDetail })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, gardenDetails: GardenDetail } })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Garden Details Added Successfully",
                                snackBarColor: "success",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                    if (res.status === 400) {
                        console.log("Error", res.data);
                        console.log("Garden update ", { ...farmerDetailForUpdate, gardenDetails: GardenDetail })
                        navigate('/dashboard/viewprofile', { state: farmerDetailForUpdate })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Error while adding Garden details",
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
                    console.log("Garden update ", { ...farmerDetailForUpdate, gardenDetails: GardenDetail })
                    navigate('/dashboard/viewprofile', { state: farmerDetailForUpdate })
                    dispatch({
                        type: SET_SHOW_SNACKBAR_TRUE,
                        payload: {
                            snackBarMessage: "Error while adding Garden details",
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
        const GardenData = {
            farmerId: state.update ? state.farmerId : farmers.farmerDetails.farmerId,
            type: data.get("gardentype"),
            name: data.get("gardenname"),
            variety: data.get("gardenvariety"),
            brand: data.get("brand"),
            area: data.get("area"),
            age: data.get("age"),
            organic: data.get("organic"),
            count: data.get("count"),
            sellingPeriod: data.get("sellingperiod"),
        };
        const { isValid, errors } = validateGardenInput(GardenData);

        if (isValid) {
            setGardenDetail([...GardenDetail, GardenData]);
            console.log("GArden", GardenData);
        }
        setError(errors);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 13,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    useEffect(() => {
        if (state.update === true) {
            setGardenDetail(state.gardenDetails);
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
                            <YardIcon />
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" marginBottom='10px' textAlign='center' >
                        Add Garden Details
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={addtotable}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="gardentype">Garden Type</InputLabel>
                                    <Select
                                        required
                                        name='gardentype'
                                        labelId="gardentype"
                                        id="gardentype"
                                        label="Garden Type"
                                        onChange={(e) => setType(e.target.value)}
                                        value={Type}
                                    >
                                        <MenuItem value={"HouseGarden"}>House Garden</MenuItem>
                                        <MenuItem value={"FarmGarden"}>Farm Garden</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="gardenname"
                                    name="gardenname"
                                    fullWidth
                                    id="gardenname"
                                    label="Name"
                                    color="success"
                                    placeholder='Name'
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
                                    autoComplete="gardenvariety"
                                    name="gardenvariety"
                                    fullWidth
                                    id="gardenvariety"
                                    label="Variety"
                                    color="success"
                                    placeholder='Variety'
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
                                    error={Error?.area !== undefined}
                                    helperText={Error.area}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="age"
                                    name="age"
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    color="success"
                                    placeholder='Age'
                                    type='number'
                                    error={Error?.age !== undefined}
                                    helperText={Error.age}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="count"
                                    name="count"
                                    fullWidth
                                    id="count"
                                    label="Count"
                                    color="success"
                                    placeholder='count'
                                    type='number'
                                    error={Error?.count !== undefined}
                                    helperText={Error.count}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="typeofcrop">Organic</InputLabel>
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
                                <TextField
                                    autoComplete="sellingperiod"
                                    name="sellingperiod"
                                    fullWidth
                                    id="sellingperiod"
                                    label="Selling Period"
                                    color="success"
                                    placeholder='Selling Season'
                                    error={Error?.sellingPeriod !== undefined}
                                    helperText={Error.sellingPeriod}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                    <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Entries :</p>
                                    <Chip label={GardenDetail.length} />
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>S.No</StyledTableCell>
                                        <StyledTableCell align='center'>Type</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Variety</StyledTableCell>
                                        <StyledTableCell align="center">Brand</StyledTableCell>
                                        <StyledTableCell align="center">Area (acre)</StyledTableCell>
                                        <StyledTableCell align="center">Age</StyledTableCell>
                                        <StyledTableCell align="center">Count</StyledTableCell>
                                        <StyledTableCell align="center">Organic</StyledTableCell>
                                        <StyledTableCell align="center">Selling Period</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {GardenDetail.length > 0 &&
                                        GardenDetail.map((garden, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{garden.type}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.name}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.variety}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.brand}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.area}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.age}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.count}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.organic}</StyledTableCell>
                                                <StyledTableCell align="center">{garden.sellingPeriod}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setGardenDetail(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {GardenDetail.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
                        </TableContainer>
                    </div>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid sm={3} marginRight={10}>
                            <Button
                                fullWidth
                                onClick={() => navigate('/dashboard/farmerinfo')}
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
    )
}

export default GardenDetails