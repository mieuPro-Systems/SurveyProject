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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from "react-redux";
import { SET_FARMER_DETAILS } from '../actions/types';



const theme = createTheme();

const AddFarmer = (props) => {
    console.log("props", props)

    const dispatch = useDispatch();

    const [States, setStates] = useState([])
    const [District, setDistrict] = useState([])
    const [Union, setUnion] = useState([])
    const [Panchayat, setPanchayat] = useState([])
    const [Village, setVillage] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const farmerDetails = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            nickName: data.get("nickName"),
            age: data.get("age"),
            gender: data.get("gender"),
            phoneNumber: data.get("phoneNumber"),
            whatsupNumber: data.get("whatsupNumber"),
            local: data.get("local"),
            state: data.get("state"),
            district: data.get("district"),
            union: data.get("union"),
            panchayat: data.get("panchayat"),
            village: data.get("village"),

        };
        console.log("farmerDetails", farmerDetails);
        dispatch({
            type: SET_FARMER_DETAILS,
            payload: farmerDetails
        })
        props.handleNext()
    }

    const handleState = (e) => {
        console.log("StateDropDown", e.target.value)
        axiosInstance.get(`/farmer/districts?state=${e.target.value}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("DistrictDropDown", res.data)
                    setDistrict(res.data)
                }
            })
    }

    const handleDistrict = (e) => {
        axiosInstance.get(`/farmer/unions?district=${e.target.value}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("UnionDropDown", res.data)
                    setUnion(res.data)
                }
            })
    }

    const handleUnion = (e) => {
        axiosInstance.get(`/farmer/panchayats?union=${e.target.value}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("PanchayatDropdown", res.data)
                    setPanchayat(res.data)
                }
            })
    }

    const handlePanchayat = (e) => {
        axiosInstance.get(`/farmer/villages?panchayat=${e.target.value}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("VillageDropdown", res.data)
                    setVillage(res.data)
                }
            })
    }

    useEffect(() => {
        axiosInstance.get('/farmer/states')
            .then((res) => {
                if (res.status === 200) {
                    console.log("StatesDropdown", res.data)
                    setStates(res.data)
                }
            }).catch(err => console.log("err", err))
    }, [])
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
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
                            <PersonAddAlt1Icon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Farmer
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name/
                                        முதல் பெயர்"
                                        autoFocus
                                        color="success"
                                    // error={error?.firstName !== undefined}
                                    // helperText={error.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label="Last Name/கடைசி பெயர்"
                                        name="lastName"
                                        autoComplete="family-name"
                                        color="success"
                                    // error={error?.lastName !== undefined}
                                    // helperText={error.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="nickName"
                                        label="Nick Name/அழைப்பெயர்"
                                        id="NickName"
                                        autoComplete="NickName"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="FatherName"
                                        label="Father Name/தந்தையின் பெயர்"
                                        id="FatherName"
                                        autoComplete="FatherName"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="age"
                                        label="Age/வயது"
                                        id="age"
                                        autoComplete="age"
                                        color="success"
                                        type="number"
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                        }}
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Gender/பாலினம்</InputLabel>
                                        <Select
                                            required
                                            name='gender'
                                            labelId="gender"
                                            id="gender"
                                            label="Gender/பாலினம்"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Other"}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone No/தொலைபேசி எண்"
                                        name="phoneNumber"
                                        autoComplete="phoneNumber"
                                        color="success"
                                        type="number"
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 11)
                                        }}
                                    // error={error?.phoneNumber !== undefined}
                                    // helperText={error.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="whatsupNumber"
                                        label="Whatsup No/வாட்ஸ்அப் எண்"
                                        name="whatsupNumber"
                                        autoComplete="whatsupNumber"
                                        color="success"
                                        type="number"
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 11)
                                        }}
                                    // error={error?.email !== undefined}
                                    // helperText={error.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Local">Local(உள்ளூர்)/Outsider(வெளி நபர்)</InputLabel>
                                        <Select
                                            labelId="Local/Outsider"
                                            name='local'
                                            id="Local/Outsider"
                                            // value={age}
                                            label="Local(உள்ளூர்)/Outsider(வெளி நபர்)"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={"Local"}>Local</MenuItem>
                                            <MenuItem value={"Outsider"}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">State/மாநிலம்</InputLabel>
                                        <Select
                                            labelId="state"
                                            id="state"
                                            name="state"
                                            // value={age}
                                            label="State/மாநிலம்"
                                            onChange={handleState}
                                        >
                                            {States.map((State, index) => <MenuItem value={State}>{State}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="district">District/மாவட்டம்</InputLabel>
                                        <Select
                                            labelId="district"
                                            name="district"
                                            id="district"
                                            label="District/மாவட்டம்"
                                            onChange={handleDistrict}
                                        >
                                            {District.map((district, index) => <MenuItem value={district}>{district}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Union">Union/ஒன்றியம்</InputLabel>
                                        <Select
                                            labelId="Union"
                                            id="Union"
                                            name='union'
                                            // value={age}
                                            label="Union/ஒன்றியம்"
                                            onChange={handleUnion}
                                        >
                                            {Union.map((union, index) => <MenuItem value={union}>{union}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Panchayat">Panchayat/பஞ்சாயத்து</InputLabel>
                                        <Select
                                            labelId="Panchayat"
                                            id="Panchayat"
                                            name='panchayat'
                                            // value={age}
                                            label="Panchayat/பஞ்சாயத்து"
                                            onChange={handlePanchayat}
                                        >
                                            {Panchayat.map((panchayat, index) => <MenuItem value={panchayat}>{panchayat}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Village(கிராமம்)/Town(நகரம்)</InputLabel>
                                        <Select
                                            labelId="Village/Town"
                                            required
                                            id="Village/Town"
                                            name='village'
                                            // value={age}
                                            label="Village(கிராமம்)/Town(நகரம்)"
                                        // onChange={handleChange}
                                        >
                                            {Village.map((village, index) => <MenuItem value={village}>{village}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AddFarmer