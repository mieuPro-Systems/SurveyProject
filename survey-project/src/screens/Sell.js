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
import { SET_SELL_DETAILS } from "../actions/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import SellIcon from "@mui/icons-material/Sell";
import validateSellInput from "../Validation/SellValidation";

const theme = createTheme();

const Sell = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);
    const location = useLocation();
    const { state } = location;
    const { farmerDetailForUpdate } = state
    const [SellDetail, setSellDetail] = useState([]);
    const [Datevalue, setDateValue] = useState(null);
    const [Organic, setOrganic] = useState("");
    const [Error, setError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (SellDetail.length > 0) {
            dispatch({
                type: SET_SELL_DETAILS,
                payload: SellDetail,
            });
            const postData = {
                sellDetails: SellDetail,
            };
            console.log("postdata", postData);
            if (state.update === false) {
                axiosInstance
                    .post("/sell/product", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Uploaded Successfully", res.data);
                        }
                        if (res.status === 400) {
                            console.log("Error", res.data);
                        }
                    })
                    .catch((err) =>
                        console.log("Error while Uploading liveStock details", err)
                    );
            } else if (state.update === true) {
                axiosInstance
                    .put("/sell/", postData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Updated Successfully", res.data);
                            console.log("Sell update ", { ...farmerDetailForUpdate, sellDetails: SellDetail })
                            navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, sellDetails: SellDetail } })
                        }
                        if (res.status === 400) {
                            console.log("Error", res.data);
                            console.log("Sell update ", { ...farmerDetailForUpdate, sellDetails: SellDetail })
                            navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, sellDetails: SellDetail } })
                        }
                    })
                    .catch((err) => {
                        console.log("Error while Updating liveStock details", err)
                        console.log("Sell update ", { ...farmerDetailForUpdate, sellDetails: SellDetail })
                        navigate('/dashboard/viewprofile', { state: { ...farmerDetailForUpdate, sellDetails: SellDetail } })
                    }
                    );
            }
            navigate("/dashboard/farmerinfo");
        }
    };

    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const formattedDate = moment(Datevalue.$d).format('DD/MM/YYYY')
        const SellData = {
            farmerId: state.update ? state.farmerId : farmers.farmerDetails.farmerId,
            productName: data.get("productname"),
            variety: data.get("variety"),
            organic: data.get("organic"),
            quantity: data.get("quantity"),
            price: data.get("price"),
            date: formattedDate,
        };
        const { isValid, errors } = validateSellInput(SellData);
        if (isValid) {
            // console.log("Object", Datevalue.$d)
            console.log("Date", formattedDate)
            setSellDetail([...SellDetail, SellData])
            console.log("Sell items", SellData)
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
            setSellDetail(state.sellDetails);
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
                            <SellIcon />
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" marginBottom='10px' textAlign='center' >
                        Add Your Product Details
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={addtotable}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="productname"
                                    name="productname"
                                    fullWidth
                                    id="productname"
                                    label="Product Name"
                                    color="success"
                                    placeholder='Product Name'
                                    error={Error?.productName !== undefined}
                                    helperText={Error.productName}
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = (e.target.value).toString().slice(0, 40);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="variety"
                                    name="variety"
                                    fullWidth
                                    id="variety"
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
                                        <MenuItem value={"no"}>no</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <TextField
                                    autoComplete="price"
                                    name="price"
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    color="success"
                                    placeholder='in Rupees'
                                    type="number"
                                    onInput={(e) => {
                                        setError({})
                                        e.target.value = parseInt(Math.max(0, parseInt(e.target.value)).toString().slice(0, 10))
                                    }}
                                    error={Error?.price !== undefined}
                                    helperText={Error.price}
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
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                    <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Items :</p>
                                    <Chip label={SellDetail.length} />
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
                                        <StyledTableCell align='center'>Product Name</StyledTableCell>
                                        <StyledTableCell align="center">Variety</StyledTableCell>
                                        <StyledTableCell align="center">Organic</StyledTableCell>
                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                        <StyledTableCell align="center">Price</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {SellDetail.length > 0 &&
                                        SellDetail.map((item, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{item.productName}</StyledTableCell>
                                                <StyledTableCell align="center">{item.variety}</StyledTableCell>
                                                <StyledTableCell align="center">{item.organic}</StyledTableCell>
                                                <StyledTableCell align="center">{item.quantity}</StyledTableCell>
                                                <StyledTableCell align="center">{item.price}</StyledTableCell>
                                                <StyledTableCell align="center">{item.date}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setSellDetail(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {SellDetail.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
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
        </div >
    )
}

export default Sell