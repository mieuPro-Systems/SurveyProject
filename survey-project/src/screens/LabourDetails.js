import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { SET_LABOUR_DETAILS, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import axiosInstance from "../utils/axiosInstance";

const theme = createTheme();

const LabourDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmer);

    const [Error, setError] = useState(false);
    const [chipData, setChipData] = useState([]);
    const [workData, setworkData] = useState([
        "Land plowing",
        "Land plowing with tractor",
        "Weed removing",
        "Pesticide spraying",
        "Hand harvesting",
        "Crop spanking",
        "Pumpset duty",
        "Land cleaning",
        "Tree climbing",
        "Paddy Steaming",
        "Fertilization"
    ]);
    const keyvalues = [
        "landPlowing",
        "landPlowingWithTractor",
        "weedRemoving",
        "pesticideSpraying",
        "handHarvesting",
        "cropSpanking",
        "pumpsetDuty",
        "landCleaning",
        "treeClimbing",
        "paddySteaming",
        "Fertilization"
    ];
    const worksdata = {
        landPlowing: false,
        landPlowingWithTractor: false,
        weedRemoving: false,
        pesticideSpraying: false,
        handHarvesting: false,
        cropSpanking: false,
        pumpsetDuty: false,
        landCleaning: false,
        treeClimbing: false,
        paddySteaming: false,
        fertilization: false
    };

    const configureworkdata = (Allworkdata, Selectedwork) => {
        for (const work of Selectedwork) {
            Allworkdata[work.key] = true;
        }
        Allworkdata.farmerId = farmers.farmerDetails.farmerId
        return Allworkdata;
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        let ConfiguredData = []
        ConfiguredData.push(configureworkdata(worksdata, chipData))

        dispatch({
            type: SET_LABOUR_DETAILS,
            payload: ConfiguredData
        })
        console.log("Reduc labour", farmers)
        const postData = {
            labourDetails: ConfiguredData
        }
        console.log("postData", postData)
        axiosInstance.post('/labour/create', postData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Uploaded Successfully(LabourDetails)", res.data)
                }

                if (res.status === 400) {
                    console.log("error for jeyendran", res.data);
                    dispatch({
                        type: SET_SHOW_SNACKBAR_TRUE,
                        payload: {
                            snackBarMessage: "Error while adding Labour details",
                            snackBarColor: "warning",
                        },
                    });
                }
            })
            .catch((err) => {
                console.log("LabourDetails", err);
                dispatch({
                    type: SET_SHOW_SNACKBAR_TRUE,
                    payload: {
                        snackBarMessage: "Error while adding Labour details",
                        snackBarColor: "warning",
                    },
                });
            });
    };


    const handleChange = (e) => {
        const data = {
            key: e.target.value,
            label: e.target.value,
        };
        if (!chipData.some((value) => value.key === data.key)) {
            setChipData([...chipData, data]);
            setError(false);
        } else {
            setError(!Error);
        }
    };

    const HandleDelete = (chipToDelete) => {
        setChipData((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
        setError(false);
    };

    const ListItem = styled("li")(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

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
                        {Error && (
                            <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                You have Already added this Work —{" "}
                                <strong>Please try to different One!</strong>
                            </Alert>
                        )}
                        <Avatar sx={{ m: 1, bgcolor: "green" }}>
                            <EmojiPeopleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Farm Works
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            // onSubmit={addtotable}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth style={{ minWidth: "180px" }}>
                                        <InputLabel id="work">Select Work</InputLabel>
                                        <Select
                                            required
                                            name="work"
                                            labelId="work"
                                            id="work"
                                            label="Select Work"
                                            onChange={handleChange}
                                        >
                                            {workData.map((Value, index) => (
                                                <MenuItem value={keyvalues[index]}>{Value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth style={{ minWidth: "180px" }}>
                                        <InputLabel id="gender">Select Gender</InputLabel>
                                        <Select
                                            required
                                            name="gender"
                                            labelId="gender"
                                            id="gender"
                                            label="Select Gender"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={"Male"}>Male</MenuItem>
                                            <MenuItem value={"Female"}>Female</MenuItem>
                                            <MenuItem value={"Others"}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {chipData.length !== 0 && (
                                    <Grid item xs={12}>
                                        <div>Added Works:</div>
                                        <Paper
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexWrap: "wrap",
                                                listStyle: "none",
                                                p: 0.5,
                                                m: 0,
                                            }}
                                            component="ul"
                                        >
                                            {chipData.map((data) => {
                                                return (
                                                    <ListItem key={data.key}>
                                                        <Chip
                                                            label={data.label}
                                                            onDelete={() => HandleDelete(data)}
                                                        />
                                                    </ListItem>
                                                );
                                            })}
                                        </Paper>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Container maxWidth="sm">
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

export default LabourDetails;
