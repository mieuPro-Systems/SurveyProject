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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PetsIcon from '@mui/icons-material/Pets';
import { SET_LIVESTOCK_DETAILS } from '../actions/types';
import axiosInstance from '../utils/axiosInstance';
import validateLiveStockInput from '../Validation/LiveStock';


const theme = createTheme();

const LiveStockDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer)

    const [LiveStocks, setLiveStocks] = useState([]);
    const [Place, setPlace] = useState("Home")
    const [Error, setError] = useState({})

    const handleChange = (e) => {
        setPlace(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: SET_LIVESTOCK_DETAILS,
            payload: LiveStocks
        })
        console.log("farmersredux", farmers)
        const postData = {
            livestockDetails: LiveStocks
        }
        console.log("postdata", postData)
        axiosInstance.post('/livestock/create', postData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Uploaded Successfully", res.data)
                }
                if (res.status === 400) {
                    console.log("Error", res.data)
                }
            }).catch(err => console.log("Error while Uploading liveStock details", err))

        navigate('/dashboard/farmerinfo')
    }

    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const LiveStockData = {
            farmerId: farmers.farmerDetails.farmerId,
            place: data.get('place'),
            type: data.get('livestocktype'),
            breed: data.get('livestockbreed'),
            name: data.get('livestockname'),
            count: data.get('livestockcount'),
            season: data.get('season')
        }
        const { isValid, errors } = validateLiveStockInput(LiveStockData)
        if (isValid) {
            setLiveStocks([...LiveStocks, LiveStockData])
            console.log("land", LiveStockData)
            console.log("first", LiveStocks)
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
                            <PetsIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add LiveStock Details
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={addtotable}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="place">Place</InputLabel>
                                        <Select
                                            required
                                            name='place'
                                            labelId="place"
                                            id="place"
                                            label="Place"
                                            value={Place}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"Home"}>Home</MenuItem>
                                            <MenuItem value={"Farm"}>Farm</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        id="livestocktype"
                                        label="Type"
                                        name="livestocktype"
                                        autoComplete="livestocktype"
                                        color="success"
                                        placeholder=''
                                        error={Error?.type !== undefined}
                                        helperText={Error.type}
                                        onInput={(e) => {
                                            setError({})
                                            e.target.value = (e.target.value).toString().slice(0, 45);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="livestockbreed"
                                        label="Breed"
                                        id="livestockbreed"
                                        autoComplete="livestockbreed"
                                        color="success"
                                        placeholder=''
                                        error={Error?.breed !== undefined}
                                        helperText={Error.breed}
                                        onInput={() => setError({})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="livestockname"
                                        label="Name"
                                        id="livestockname"
                                        autoComplete="livestockname"
                                        color="success"
                                        placeholder=''
                                        error={Error?.name !== undefined}
                                        helperText={Error.name}
                                        onInput={() => setError({})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="livestockcount"
                                        label="Count"
                                        id="livestockcount"
                                        autoComplete="livestockcount"
                                        color="success"
                                        placeholder=''
                                        type="number"
                                        onInput={(e) => {
                                            setError({})
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 6);
                                        }}
                                        error={Error?.count !== undefined}
                                        helperText={Error.count}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="season"
                                        label="Season"
                                        id="season"
                                        autoComplete="season"
                                        color="success"
                                        placeholder=''
                                        error={Error?.season !== undefined}
                                        helperText={Error.season}
                                        onInput={() => setError({})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                        <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total LiveStocks :</p>
                                        <Chip label={LiveStocks.length} />
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
                    </Box>
                </Container>
                <Container maxWidth="lg">
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>S.No</StyledTableCell>
                                        <StyledTableCell align='center'>Place</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">Breed</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Count (Nos)</StyledTableCell>
                                        <StyledTableCell align="center">Season</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {LiveStocks.length > 0 &&
                                        LiveStocks.map((LiveStock, index) => (
                                            <StyledTableRow key={index + 1}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.place}</StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.type}</StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.breed}</StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.name}</StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.count}</StyledTableCell>
                                                <StyledTableCell align="center">{LiveStock.season}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setLiveStocks(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {LiveStocks.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
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

export default LiveStockDetails