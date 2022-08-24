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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const theme = createTheme();


const OwnerDetails = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { farmers } = useSelector((state) => state.farmer)

    const [OwnerDetail, setOwnerDetail] = useState([])
    const [NameLabel, setNameLabel] = useState('Land Owner Name')

    const addtotable = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const OwnerData = {
            ownerShipType: data.get('ownershiptype'),
            name: data.get('name'),
            fatherName: data.get('fathername'),
            village: data.get('village'),
            area: data.get('area'),
            phoneNumber: data.get('phonenumber'),
            whatsappNumber: data.get('whatsappnumber'),
            gender: data.get('gender'),
            age: data.get('age'),
        }
        setOwnerDetail([...OwnerDetail, OwnerData])
        console.log("Owner", OwnerData)
    }

    const handleChange = (e) => {

        switch (e.target.value) {

            case 'Supervisor':
                setNameLabel('Supervisor Name')
                break
            case 'Owner':
                setNameLabel('Land Owner Name')
                break
        }
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
        <div><ThemeProvider theme={theme}>
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
                        <SupervisedUserCircleIcon />
                    </Avatar>
                </Box>
                <Typography component="h1" variant="h6" marginBottom='10px' textAlign='center' >
                    Add Owner/Supervisor Details
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={addtotable}
                    marginTop='15px'
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="ownershiptype">OwnerShip Type</InputLabel>
                                <Select
                                    required
                                    name='ownershiptype'
                                    labelId="ownershiptype"
                                    id="ownershiptype"
                                    label="OwnerShip Type"
                                    onChange={handleChange}
                                // value={rent}
                                >
                                    <MenuItem value={"Owner"}>Owner</MenuItem>
                                    <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                required
                                autoComplete='name'
                                name='name'
                                labelId="name"
                                id="name"
                                label={NameLabel}
                                placeholder={NameLabel}
                            // onChange={handleChange}
                            // value={rent}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                autoComplete="fathername"
                                name="fathername"
                                fullWidth
                                id="fathername"
                                label="FatherName"
                                color="success"
                                placeholder="Father Name"
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="village"
                                name="village"
                                fullWidth
                                id="village"
                                label="Village"
                                color="success"
                                placeholder='village'
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="phonenumber"
                                name="phonenumber"
                                fullWidth
                                id="phonenumber"
                                label="Phone Number"
                                color="success"
                                placeholder='Enter 10 digit No'
                                type='number'
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="whatsappnumber"
                                name="whatsappnumber"
                                fullWidth
                                id="whatsappnumber"
                                label="Whatsapp Number"
                                color="success"
                                placeholder='Enter 10 digit No'
                                type='number'
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
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
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    required
                                    name='gender'
                                    labelId="gender"
                                    id="gender"
                                    label="Gender"
                                // onChange={handleChange}
                                // value={rent}
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>
                                </Select>
                            </FormControl>
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
                            // error={error?.firstName !== undefined}
                            // helperText={error.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
                                <p style={{ marginTop: '1px', marginRight: '7px', fontSize: '20px' }}>Total Entries :</p>
                                <Chip label={OwnerDetail.length} />
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
                                    <StyledTableCell align='center'>OwnerShip</StyledTableCell>
                                    <StyledTableCell align='center'>Name</StyledTableCell>
                                    <StyledTableCell align="center">FatherName</StyledTableCell>
                                    <StyledTableCell align="center">Village</StyledTableCell>
                                    <StyledTableCell align="center">Area (acre)</StyledTableCell>
                                    <StyledTableCell align="center">Phone No</StyledTableCell>
                                    <StyledTableCell align="center">Whatsapp No</StyledTableCell>
                                    <StyledTableCell align="center">Gender</StyledTableCell>
                                    <StyledTableCell align="center">Age</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {OwnerDetail.length > 0 &&
                                    OwnerDetail.map((owner, index) => (
                                        <StyledTableRow key={index + 1}>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{owner.ownerShipType}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.name}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.fatherName}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.village}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.area}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.phoneNumber}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.whatsappNumber}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.gender}</StyledTableCell>
                                            <StyledTableCell align="center">{owner.age}</StyledTableCell>
                                            <StyledTableCell align="left" onClick={() => { setOwnerDetail(prevValues => prevValues.filter((value, prevIndex) => prevIndex !== index)) }}>
                                                {<HighlightOffIcon style={{ cursor: 'pointer' }} />}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        {OwnerDetail.length === 0 && <p style={{ textAlign: 'center' }}>No records  Added</p>}
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
                            // onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider></div >
    )
}

export default OwnerDetails