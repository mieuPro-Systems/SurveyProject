import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandscapeIcon from "@mui/icons-material/Landscape";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SET_LAND_DETAILS, SET_UPDATED_LAND_DETAILS } from "../actions/types";
import axiosInstance from "../utils/axiosInstance";
import validateLandInput from "../Validation/LandAddition";

const theme = createTheme();

const LandDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { farmers } = useSelector((state) => state.farmer);
    const [HideFields, setHideFields] = useState(false)
    const [Error, setError] = useState({})
    const [Category, setCategory] = useState("ownFarming")
    const [Addons, setAddons] = useState("None")
    const { landDetails } = farmers;

    const handleChange = (e) => {
        setCategory(e.target.value)
        if (e.target.value === "takenLease") {
            setHideFields(!HideFields)
        } else {
            setHideFields(false)
        }
    }

    const handleChangeAddon = (e) => {
        setAddons(e.target.value)
    }
    const getTotalArea = () => {
        var area = 0;
        for (const data of landDetails) {
            area += parseInt(data.area);
        }
        // console.log("area", area)
        return area;
    };

    const deletelandDetail = (index) => {
        const postData = landDetails[index]
        postData['farmerId'] = "HAN0001"
        console.log("postData", postData)

        axiosInstance
            .delete(`/land/id/${postData.landId}`, { data: postData })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Land Details deleted Successfully", res.data);
                    const UpdatedLandDetails = landDetails.filter(
                        (value, prevIndex) => prevIndex !== index
                    );
                    console.log("updated land details", UpdatedLandDetails);
                    dispatch({
                        type: SET_UPDATED_LAND_DETAILS,
                        payload: UpdatedLandDetails,
                    });
                }
                if (res.status === 400) {
                    console.log("error while deleting landdetails", res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     dispatch({
    //         type: SET_LAND_DETAILS,
    //         payload: LandDetail
    //     })
    //     const postData = {
    //         farmerId: farmers.farmerDetails.farmerId,
    //         landDetails: LandDetail
    //     }
    //     console.log("postdata".postData)
    //     axiosInstance.post('/', postData)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 console.log("Upload successfully", postData)
    //             }
    //             if (res.status === 400) {
    //                 console.log("Error while uploading", res.data)
    //             }
    //         }).then(err => console.log(err))

    //     LandDetail.forEach((data) => {
    //         if (data.toshare.length > 0) {
    //             navigate('/dashboard/ownerdetails')
    //         }
    //     })
    //     console.log("Landdetails", LandDetail)
    // }

    const addtotable = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (["ownFarming", "wasteLand", "availableForLease"].includes(data.get("category"))) {
            const LandData = {
                farmerId: "VEE0002",
                category: data.get("category"),
                area: data.get("area"),
                addons: data.get("addons"),
                supervisorId: "",
                ownerId: "VEE0002",
            };
            const { isValid, errors } = validateLandInput(LandData)
            const LandDataArray = [];
            console.log("isValid", isValid, errors)
            if (isValid) {
                LandDataArray.push(LandData);
                const postData = {
                    landDetails: LandDataArray,
                };
                console.log("postData", postData);
                axiosInstance.post("/land/create", postData).then((res) => {
                    if (res.status === 200) {
                        console.log("Successfully get LandId", res.data);
                        LandData["landId"] = res.data.landId;
                        // LandData["ownerId"] = farmers.farmerDetails.farmerId;
                        LandData["supervisorId"] = "None";
                        // setLandDetail([...LandDetail, LandData])
                        dispatch({
                            type: SET_LAND_DETAILS,
                            payload: LandData,
                        });
                    }
                    if (res.status === 400) {
                        console.log("Error while getting Land Id", res.data);
                    }
                });
            }
            setError(errors)
        }

        if (data.get("category") === "leasedLand") {
            const Data = {
                farmerId: "HAN0001",
                category: data.get("category"),
                area: data.get("area"),
                addons: data.get("addons"),
                supervisorId: "",
                ownerId: "HAN0001",
            };
            const { isValid, errors } = validateLandInput(Data)
            if (isValid) {
                navigate('/dashboard/searchfarmer', { state: Data })
            }
            setError(errors)
        }

        if (data.get("category") === "takenLease") {
            const Data = {
                farmerId: "HAN0001",
                category: data.get("category"),
                area: "",
                addons: "",
                supervisorId: "",
                ownerId: "",
            };
            navigate("/dashboard/searchfarmer", { state: Data });
        }
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

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="lg">
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
                            <LandscapeIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Land Details
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={addtotable}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth style={{ minWidth: "180px" }}>
                                        <InputLabel id="category">Category</InputLabel>
                                        <Select
                                            required
                                            name="category"
                                            labelId="category"
                                            id="category"
                                            label="Category"
                                            onChange={handleChange}
                                            value={Category}
                                        >
                                            <MenuItem value={"ownFarming"}>Own Farming</MenuItem>
                                            <MenuItem value={"wasteLand"}>Waste Land</MenuItem>
                                            <MenuItem value={"leasedLand"}>Leased Land</MenuItem>
                                            <MenuItem value={"takenLease"}>Taken Lease</MenuItem>
                                            <MenuItem value={"availableForLease"}>
                                                Available For Lease
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="Area"
                                        name="area"
                                        required
                                        fullWidth
                                        disabled={HideFields}
                                        id="Area"
                                        label="Area"
                                        autoFocus
                                        color="success"
                                        placeholder="in Acres"
                                        type='number'
                                        // inputProps={{
                                        //     maxLength: 13,
                                        //     step: "1"
                                        // }}
                                        error={Error?.area !== undefined}
                                        helperText={Error.area}
                                        onInput={(e) => {
                                            setError("")
                                            // e.target.value = (e.target.value)
                                            //     .slice(0, 5);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth style={{ minWidth: "180px" }}>
                                        <InputLabel id="addons">Add-ons</InputLabel>
                                        <Select
                                            required
                                            disabled={HideFields}
                                            name="addons"
                                            labelId="addons"
                                            id="addons"
                                            label="Add-ons"
                                            value={Addons}
                                            onChange={handleChangeAddon}
                                        >
                                            <MenuItem value={"interestedToClean"}>
                                                Interested to Clean
                                            </MenuItem>
                                            <MenuItem value={"cleanupTOFarm"}>
                                                Cleanup to Farm
                                            </MenuItem>
                                            <MenuItem value={"None"}>None</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div
                                        style={{
                                            flexDirection: "row",
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "14px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                marginTop: "1px",
                                                marginRight: "7px",
                                                fontSize: "20px",
                                            }}
                                        >
                                            Total Lands :
                                        </p>
                                        <Chip label={landDetails.length} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div
                                        style={{
                                            flexDirection: "row",
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "14px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                marginTop: "1px",
                                                marginRight: "7px",
                                                fontSize: "20px",
                                            }}
                                        >
                                            Total Area :
                                        </p>
                                        <Chip label={getTotalArea()} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={3} className="mx-auto">
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 2, mb: 5, bgcolor: "green" }}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="lg">
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">S.no</StyledTableCell>
                                        <StyledTableCell align="center">Owner ID</StyledTableCell>
                                        <StyledTableCell align="center">
                                            Supervisor ID
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Land ID</StyledTableCell>
                                        <StyledTableCell align="center">Category</StyledTableCell>
                                        <StyledTableCell align="center">
                                            Area (Acres)
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Add-ons</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {landDetails.length > 0 &&
                                        landDetails.map((land, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.ownerId}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.supervisorId}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.landId}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.category}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.area}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {land.addons}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                    onClick={() => deletelandDetail(index)}
                                                >
                                                    {<HighlightOffIcon style={{ cursor: "pointer" }} />}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {landDetails.length === 0 && (
                                <p style={{ textAlign: "center" }}>No records Added</p>
                            )}
                        </TableContainer>
                    </div>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid sm={3} marginRight={10}>
                            <Button
                                fullWidth
                                onClick={() => navigate("/dashboard/farmerinfo")}
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid sm={3} marginLeft={10}>
                            <Button
                                onClick={() => navigate("/dashboard/searchfarmer")}
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

export default LandDetails;
