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
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate, useLocation } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { SET_MACHINE_DETAILS } from "../actions/types";
import axiosInstance from "../utils/axiosInstance";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import validateMachineInput from "../Validation/Machine";

const theme = createTheme();

const MachineDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);

    const [priceLabel, setpriceLable] = useState("Price per Hour ");
    const [Pricevalue, setPriceValue] = useState("0.00")
    const [rent, setrent] = useState("Hour");
    const [Machines, setMachines] = useState([]);
    const [Error, setError] = useState({});

    const location = useLocation();
    const { state } = location;
    const { farmerDetailForUpdate } = state
    console.log("machine details state", state);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Machines.length > 0) {
            dispatch({
                type: SET_MACHINE_DETAILS,
                payload: Machines,
            });

            const postData = {
                machineDetails: Machines,
            };
            console.log("postData", postData);
            if (state.update === false) {
                axiosInstance
                    .post("/machinery/create", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Machine Details Uploaded Successfully", res.data);
                            navigate("/dashboard/farmerinfo");
                        }
                        if (res.status === 400) {
                            console.log("Error", res.data);
                            navigate("/dashboard/farmerinfo");
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        navigate("/dashboard/farmerinfo");
                    });
            } else if (state.update === true) {
                axiosInstance
                    .put("/machinery/", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Machine Details updated Successfully", res.data);
                            console.log("Machine update ", { ...farmerDetailForUpdate, machineDetails: Machines })
                            navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, machineDetails: Machines } })
                        }
                        if (res.status === 400) {
                            console.log("Error", res.data);
                            console.log("Machine update ", { ...farmerDetailForUpdate, machineDetails: Machines })
                            navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, machineDetails: Machines } })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        console.log("Machine update ", { ...farmerDetailForUpdate, machineDetails: Machines })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, machineDetails: Machines } })
                    });
            }
        }
    };

    const addtotable = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const MachinesData = {
            farmerId: state.update ? state.farmerId : farmers.farmerDetails.farmerId,
            type: data.get("type"),
            subType: data.get("subtype"),
            attachments: data.get("attachments"),
            brand: data.get("brand"),
            count: data.get("count"),
            rentalBasis: data.get("rentalbasis"),
            rent: data.get("price"),
        };
        const { isValid, errors } = validateMachineInput(MachinesData);
        if (isValid) {
            setMachines([...Machines, MachinesData]);
            console.log("land", MachinesData);
        }
        setError(errors)
    };

    const handleChange = (e) => {
        switch (e.target.value) {
            case "Hour":
                setpriceLable("Price per Hour");
                setrent(e.target.value);
                break;
            case "Day":
                setpriceLable("Price per Day");
                setrent(e.target.value);
                break;
            case "Acre":
                setpriceLable("Price per Acre");
                setrent(e.target.value);
                break;
            default:
                break;
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

    useEffect(() => {
        if (state.update === true) {
            setMachines(state.machineDetails);
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
                            <AgricultureIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Machineries
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={addtotable}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="type"
                                        name="type"
                                        required
                                        fullWidth
                                        id="type"
                                        label="Type"
                                        autoFocus
                                        color="success"
                                        placeholder="Type of machine"
                                        error={Error?.type !== undefined}
                                        helperText={Error.type}
                                        onInput={(e) => {
                                            setError({});
                                            e.target.value = e.target.value.toString().slice(0, 40);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="subtype"
                                        name="subtype"
                                        fullWidth
                                        id="subtype"
                                        label="Subtype"
                                        color="success"
                                        placeholder="Subtype of Machine"
                                        error={Error?.subType !== undefined}
                                        helperText={Error.subType}
                                        onInput={(e) => {
                                            setError({})
                                            e.target.value = (e.target.value).toString().slice(0, 40);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        autoComplete="attachments"
                                        name="attachments"
                                        fullWidth
                                        id="attachments"
                                        label="Attachments"
                                        color="success"
                                        placeholder="Attachments for Machines"
                                        error={Error?.attachments !== undefined}
                                        helperText={Error.attachments}
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
                                        placeholder="Machine Brand"
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
                                        autoComplete="count"
                                        name="count"
                                        fullWidth
                                        id="count"
                                        label="Count"
                                        color="success"
                                        placeholder="count"
                                        type="number"
                                        onInput={(e) => {
                                            setError({})
                                            e.target.value = parseInt(
                                                Math.max(0, parseInt(e.target.value))
                                                    .toString()
                                                    .slice(0, 5)
                                            );
                                        }}
                                        error={Error?.count !== undefined}
                                        helperText={Error.count}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="rental">Rental Basis</InputLabel>
                                        <Select
                                            required
                                            name="rentalbasis"
                                            labelId="rental"
                                            id="rental"
                                            label="Rental Basis"
                                            onChange={handleChange}
                                            value={rent}
                                        >
                                            <MenuItem value={"Hour"}>Hour</MenuItem>
                                            <MenuItem value={"Day"}>Day</MenuItem>
                                            <MenuItem value={"Acre"}>Acre</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="price"
                                        name="price"
                                        fullWidth
                                        id="price"
                                        label={priceLabel}
                                        color="success"
                                        placeholder="in Rupess"
                                        type="number"
                                        inputProps={{
                                            maxLength: 13,
                                            step: "1"
                                        }}
                                        // value={Pricevalue}
                                        // onChange={(e) => setPriceValue(parseFloat(e.target.value).toFixed(1))}
                                        onInput={(e) => {
                                            setError({})
                                            // e.target.value = e.target.value
                                            //     .toString()
                                            //     .slice(0, 10);
                                        }}
                                        error={Error?.rent !== undefined}
                                        helperText={Error.rent}
                                    />
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
                                            Total Machines :
                                        </p>
                                        <Chip label={Machines.length} />
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
                <Container maxWidth="md">
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">S.No</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">SubType</StyledTableCell>
                                        <StyledTableCell align="center">
                                            Attachments
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Brand</StyledTableCell>
                                        <StyledTableCell align="center">
                                            Count (Nos)
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            Rental Basis
                                        </StyledTableCell>
                                        <StyledTableCell align="center">Rent</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Machines.length > 0 &&
                                        Machines.map((machine, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.type}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.subType}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.attachments}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.brand}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.count}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.rentalBasis}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {machine.rent}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                    onClick={() => {
                                                        setMachines((prevValues) =>
                                                            prevValues.filter(
                                                                (value, prevIndex) => prevIndex !== index
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {<HighlightOffIcon style={{ cursor: "pointer" }} />}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {Machines.length === 0 && (
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

export default MachineDetails;
