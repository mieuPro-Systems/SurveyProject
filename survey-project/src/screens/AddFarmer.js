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
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



const theme = createTheme();

const AddFarmer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [States, setStates] = useState([])
    const [District, setDistrict] = useState([])
    const [Union, setUnion] = useState([])
    const [Panchayat, setPanchayat] = useState([])
    const [Village, setVillage] = useState([])
    const [Organic, setOrganic] = useState(false)
    const [SingleSeed, setSingleSeed] = useState(false)
    const [AlternativeCrop, setAlternativeCrop] = useState(false)
    const [SeedVariety, setSeedVariety] = useState(false)
    const [LeaseOwnLand, setLeaseOwnLand] = useState(false)
    const [FarmRentedLand, setFarmRentedLand] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const farmerDetails = {
            farmerName: data.get("farmerName"),
            nickName: data.get("nickName"),
            fatherName: data.get("FatherName"),
            age: data.get("age"),
            gender: data.get("gender"),
            phoneNumber: data.get("phoneNumber"),
            whatsappNumber: data.get("whatsappNumber"),
            residentialType: data.get("local"),
            state: data.get("state"),
            district: data.get("district"),
            union: data.get("union"),
            panchayat: data.get("panchayat"),
            village: data.get("village"),
            organic: Organic,
            singleSeed: SingleSeed,
            altCrop: AlternativeCrop,
            seedVariety: SeedVariety,
            leaseOwnLand: LeaseOwnLand,
            farmRentedLand: FarmRentedLand
        };
        console.log("farmerDetails", farmerDetails);
        dispatch({
            type: SET_FARMER_DETAILS,
            payload: farmerDetails
        })
        navigate('/dashboard/farmerinfo')

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
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="farmername"
                                        name="farmerName"
                                        required
                                        fullWidth
                                        id="farmername"
                                        label="Farmer Name/
                                        முதல் பெயர்"
                                        autoFocus
                                        color="success"
                                    // error={error?.firstName !== undefined}
                                    // helperText={error.firstName}
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
                                        id="whatsappNumber"
                                        label="Whatsapp No/வாட்ஸ்அப் எண்"
                                        name="whatsappNumber"
                                        autoComplete="whatsappNumber"
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
                            <div style={{ marginTop: '10px', fontWeight: '500', fontSize: '17px' }}><p>Interested in :</p></div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        fullWidth
                                        checked={Organic}
                                        onChange={() => setOrganic(!Organic)}
                                        control={<Checkbox />}
                                        label="Organic Farming"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <FormControlLabel
                                        fullWidth
                                        value="end"
                                        checked={SingleSeed}
                                        onChange={() => setSingleSeed(!SingleSeed)}
                                        control={<Checkbox />}
                                        label="Single Seedling"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        fullWidth
                                        value="end"
                                        checked={AlternativeCrop}
                                        onChange={() => setAlternativeCrop(!AlternativeCrop)}
                                        control={<Checkbox />}
                                        label="Alternative Crop"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        fullWidth
                                        value="end"
                                        checked={SeedVariety}
                                        onChange={() => setSeedVariety(!SeedVariety)}
                                        control={<Checkbox />}
                                        label="Seed Variety Advice"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        fullWidth
                                        value="end"
                                        checked={LeaseOwnLand}
                                        onChange={() => setLeaseOwnLand(!LeaseOwnLand)}
                                        control={<Checkbox />}
                                        label="To Lease own Land"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        fullWidth
                                        value="end"
                                        checked={FarmRentedLand}
                                        onChange={() => setFarmRentedLand(!FarmRentedLand)}
                                        control={<Checkbox />}
                                        label="To Farm Rented Land"
                                        labelPlacement="end"
                                    />
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