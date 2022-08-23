import React, { useEffect, useState } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandscapeIcon from '@mui/icons-material/Landscape';
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


const theme = createTheme();

const LandDetails = () => {

    const navigate = useNavigate();
    const [rows, setrows] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const LandData = {
            area: data.get('Area'),
            ownfarming: data.get('ownfarming'),
            toshare: data.get('toshare'),
            othersfarmland: data.get('othersfarmland'),
            wasteland: data.get('wasteland'),
            interestedforclean: data.get('interestedforclean'),
            cleanup: data.get('CleanUp')
        }
        setrows([...rows, LandData])
        console.log("land", LandData)
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
                                    <TextField
                                        autoComplete="Area"
                                        name="Area"
                                        required
                                        fullWidth
                                        id="Area"
                                        label="Area"
                                        autoFocus
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.firstName !== undefined}
                                    // helperText={error.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        id="ownfarming"
                                        label="Own Farming"
                                        name="ownfarming"
                                        autoComplete="ownfarming"
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.lastName !== undefined}
                                    // helperText={error.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="toshare"
                                        label="Area To Share"
                                        id="toshare"
                                        autoComplete="toshare"
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="othersfarmland"
                                        label="Others Farmland"
                                        id="othersfarmland"
                                        autoComplete="othersfarmland"
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="CleanUp"
                                        label="CleanUp to Farm this time"
                                        id="CleanUp"
                                        autoComplete="CleanUp"
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="wasteland"
                                        label="Wasteland"
                                        id="wasteland"
                                        autoComplete="wasteland"
                                        color="success"
                                        placeholder='in Acres'
                                        type="number"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="interestedforclean"
                                        label="Interested to Clean Land"
                                        placeholder='in Acres'
                                        id="interestedforclean"
                                        autoComplete="interestedforclean"
                                        color="success"
                                        type="number"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                        <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Lands :</p>
                                        <Chip label={rows.length} />
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
                                        <StyledTableCell align='center'>Area (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">OwnFarming (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">ToShare (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">Others Farmland (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">CleanUptoFarm (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">Wasteland (Acres)</StyledTableCell>
                                        <StyledTableCell align="center">Interestedto CleanLand (Acres)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {rows.length > 0 &&
                                        rows.map((row, index) => (
                                            <StyledTableRow key={row.area}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {row.area}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.ownfarming}</StyledTableCell>
                                                <StyledTableCell align="center">{row.toshare}</StyledTableCell>
                                                <StyledTableCell align="center">{row.othersfarmland}</StyledTableCell>
                                                <StyledTableCell align="center">{row.interestedforclean}</StyledTableCell>
                                                <StyledTableCell align="center">{row.wasteland}</StyledTableCell>
                                                <StyledTableCell align="center">{row.cleanup}</StyledTableCell>
                                                <StyledTableCell align="left" onClick={() => { setrows(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                    {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {rows.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
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
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default LandDetails