import React from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';



const theme = createTheme();

const AddFarmer = () => {
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
                            // onSubmit={handleSubmit}
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
                                        name="NickName"
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
                                            labelId="gender"
                                            id="gender"
                                            label="Gender/பாலினம்"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Male</MenuItem>
                                            <MenuItem value={20}>Female</MenuItem>
                                            <MenuItem value={30}>Other</MenuItem>
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
                                            id="Local/Outsider"
                                            // value={age}
                                            label="Local(உள்ளூர்)/Outsider(வெளி நபர்)"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">State/மாநிலம்</InputLabel>
                                        <Select
                                            labelId="state"
                                            id="state"
                                            // value={age}
                                            label="State/மாநிலம்"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">State/மாநிலம்</InputLabel>
                                        <Select
                                            labelId="state"
                                            id="state"
                                            // value={age}
                                            label="State/மாநிலம்"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Village/Town</InputLabel>
                                        <Select
                                            labelId="Village/Town"
                                            id="Village/Town"
                                            // value={age}
                                            label="Village/Town"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Village/Town</InputLabel>
                                        <Select
                                            labelId="Village/Town"
                                            id="Village/Town"
                                            // value={age}
                                            label="Village/Town"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender">Village(கிராமம்)/Town(நகரம்)</InputLabel>
                                        <Select
                                            labelId="Village/Town"
                                            id="Village/Town"
                                            // value={age}
                                            label="Village(கிராமம்)/Town(நகரம்)"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Local</MenuItem>
                                            <MenuItem value={20}>Outsider</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default AddFarmer