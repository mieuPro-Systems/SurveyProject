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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { SET_BUY_DETAILS, SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import validateBuyInput from "../Validation/BuyValidation";
import Tables from "../components/screens/Tables";

const theme = createTheme();

const Buy = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);

    const [BuyDetail, setBuyDetail] = useState([]);
    const [Datevalue, setDateValue] = useState(null);
    const [Error, setError] = useState({});

    const location = useLocation();
    const { state } = location;
    const { farmerDetailForUpdate } = state
    const Headers = ["Requirement", "Name", "Brand/Variety", "Quantity", "Date"]
    const Keys = ["requirement", "name", "brandOrVariety", "quantity", "date"]
    console.log("buy details state", state);

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            buyDetails: BuyDetail,
        };
        if (BuyDetail.length > 0) {
            dispatch({
                type: SET_LOADING_TRUE,
            });
            dispatch({
                type: SET_BUY_DETAILS,
                payload: BuyDetail,
            });
            // const postData = {
            //     buyDetails: BuyDetail,
            // };
            console.log("postdata", postData);
            if (state.update === false) {
                axiosInstance
                    .post("/buy/product", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Uploaded Successfully", res.data);
                            navigate("/dashboard/farmerinfo");
                            dispatch({
                                type: SET_SHOW_SNACKBAR_TRUE,
                                payload: {
                                    snackBarMessage: "Buy Details Added Successfully",
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
                                    snackBarMessage: "Error while adding Buy details",
                                    snackBarColor: "warning",
                                },
                            });
                            dispatch({
                                type: SET_LOADING_FALSE,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("Error while Uploading buy details", err)
                        navigate("/dashboard/farmerinfo");
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Error while adding Buy details",
                                snackBarColor: "warning",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    });
            }
        }
        if (state.update === true) {
            dispatch({
                type: SET_LOADING_TRUE
            });
            postData.farmerId = state.farmerId
            axiosInstance
                .put("/buy/", postData)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Updated Successfully", res.data);
                        console.log("Buy update ", { ...farmerDetailForUpdate, buyDetails: BuyDetail })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, buyDetails: BuyDetail } })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Buy Details Added Successfully",
                                snackBarColor: "success",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                    if (res.status === 400) {
                        console.log("Error", res.data);
                        console.log("Buy update ", { ...farmerDetailForUpdate, buyDetails: BuyDetail })
                        navigate('/dashboard/viewprofile', { state: farmerDetailForUpdate })
                        dispatch({
                            type: SET_SHOW_SNACKBAR_TRUE,
                            payload: {
                                snackBarMessage: "Error while adding Buy details",
                                snackBarColor: "warning",
                            },
                        });
                        dispatch({
                            type: SET_LOADING_FALSE,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error while Updating buy details", err)
                    console.log("Buy update ", { ...farmerDetailForUpdate, buyDetails: BuyDetail })
                    navigate('/dashboard/viewprofile', { state: farmerDetailForUpdate })
                    dispatch({
                        type: SET_SHOW_SNACKBAR_TRUE,
                        payload: {
                            snackBarMessage: "Error while adding Buy details",
                            snackBarColor: "warning",
                        },
                    });
                    dispatch({
                        type: SET_LOADING_FALSE,
                    });
                });
        };
    }
    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const formattedDate = moment(Datevalue.$d).format('DD/MM/YYYY')
        const BuyData = {
            farmerId: state.update ? state.farmerId : farmers.farmerDetails.farmerId,
            requirement: data.get("requirement"),
            name: data.get("name"),
            brandOrVariety: data.get("brandorvariety"),
            quantity: data.get("quantity"),
            date: formattedDate,
        };
        const { isValid, errors } = validateBuyInput(BuyData);

        if (isValid) {
            // console.log("Object", Datevalue.$d)
            console.log("Date", formattedDate)
            setBuyDetail([...BuyDetail, BuyData])
            console.log("buy items", BuyData)
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
            setBuyDetail(state.buyDetails);
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
                            <ShoppingCartIcon />
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" marginBottom='10px' textAlign='center' >
                        Add Your Needs
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={addtotable}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="requirement"
                                    name="requirement"
                                    fullWidth
                                    id="requirement"
                                    label="Requirement"
                                    color="success"
                                    placeholder='Your Requirement'
                                    error={Error?.requirement !== undefined}
                                    helperText={Error.requirement}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    fullWidth
                                    id="name"
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
                                    autoComplete="brandorvariety"
                                    name="brandorvariety"
                                    fullWidth
                                    id="brandorvariety"
                                    label="Brand/Variety"
                                    color="success"
                                    placeholder='Brand/Variety'
                                    error={Error?.brandOrVariety !== undefined}
                                    helperText={Error.brandOrVariety}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="quantity"
                                    name="quantity"
                                    fullWidth
                                    id="quantity"
                                    label="Quantity"
                                    color="success"
                                    placeholder='Quantity'
                                    type="number"
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = parseInt(Math.max(0, parseInt(e.target.value)).toString().slice(0, 5))
                                    }}
                                    error={Error?.quantity !== undefined}
                                    helperText={Error.quantity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={Datevalue}
                                        inputFormat="DD/MM/YYYY"
                                        formatDate={(date) => moment(date).format('DD-MM-YYYY')}
                                        onChange={(newValue) => {
                                            setDateValue(newValue);
                                            setError({})
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        error={Error?.date !== undefined}
                                        helperText={Error.date}


                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                    <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Items :</p>
                                    <Chip label={BuyDetail.length} />
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
                        <Tables header={Headers} body={BuyDetail} statevariable={BuyDetail}
                            setstatevariable={setBuyDetail} keys={Keys} />
                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>S.No</StyledTableCell>
                                        <StyledTableCell align='center'>Requirement</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Brand/Variety</StyledTableCell>
                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {BuyDetail.length > 0 &&
                                        BuyDetail.map((item, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{item.requirement}</StyledTableCell>
                                                <StyledTableCell align="center">{item.name}</StyledTableCell>
                                                <StyledTableCell align="center">{item.brandOrVariety}</StyledTableCell>
                                                <StyledTableCell align="center">{item.quantity}</StyledTableCell>
                                                <StyledTableCell align="center">{item.date}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setBuyDetail(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {BuyDetail.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
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
        </div >
    )
}


export default Buy