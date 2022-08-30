import React, { useState } from 'react'
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
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { SET_BUY_DETAILS } from '../actions/types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';



const theme = createTheme();

const Buy = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { farmers } = useSelector((state) => state.farmer)

    const [BuyDetail, setBuyDetail] = useState([])
    const [Datevalue, setDateValue] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({
            type: SET_BUY_DETAILS,
            payload: BuyDetail
        })
        const postData = {
            buyDetails: BuyDetail
        }
        console.log("postdata", postData)
        axiosInstance.post('/buy/product', postData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Uploaded Successfully", res.data)
                }
                if (res.status === 400) {
                    console.log("Error", res.data)
                }
            }).catch(err => console.log("Error while Uploading buy details", err))

        navigate('/dashboard/farmerinfo')
    }

    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const formattedDate = moment(Datevalue.$d).format('DD/MM/YYYY')
        const BuyData = {
            farmerId: "HAN0001",
            requirement: data.get('requirement'),
            name: data.get('name'),
            brandOrVariety: data.get('brandorvariety'),
            quantity: data.get('quantity'),
            date: formattedDate
        }
        // console.log("Object", Datevalue.$d)
        console.log("Date", formattedDate)
        setBuyDetail([...BuyDetail, BuyData])
        console.log("buy items", BuyData)
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
                                // error={error?.firstName !== undefined}
                                // helperText={error.firstName}
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
                                // error={error?.firstName !== undefined}
                                // helperText={error.firstName}
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
                                // error={error?.firstName !== undefined}
                                // helperText={error.firstName}
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
                                        e.target.value = parseInt(Math.max(0, parseInt(e.target.value)).toString().slice(0, 5))
                                    }}
                                // error={error?.firstName !== undefined}
                                // helperText={error.firstName}
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
                        <TableContainer component={Paper}>
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

export default Buy