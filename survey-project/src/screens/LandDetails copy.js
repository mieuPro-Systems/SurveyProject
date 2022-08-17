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

const theme = createTheme();

const LandDetails = () => {

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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
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
                            // onSubmit={handleSubmit}
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
                                        label="Area/பரப்பளவு"
                                        autoFocus
                                        color="success"
                                    // error={error?.firstName !== undefined}
                                    // helperText={error.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        id="ownfarming"
                                        label="OwnFarming/சொந்த விவசாயம்"
                                        name="ownfarming"
                                        autoComplete="ownfarming"
                                        color="success"
                                    // error={error?.lastName !== undefined}
                                    // helperText={error.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="toshare"
                                        label="ToShare/பங்குக்கிற்கு விடுவது"
                                        id="toshare"
                                        autoComplete="toshare"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="othersfarmland"
                                        label="Others Farmland/பிறர் நில விவசாயம்"
                                        id="othersfarmland"
                                        autoComplete="othersfarmland"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        name="CleanUp"
                                        label="CleanUp to Farm/சுத்தம் செய்து இம்முறை விவசாயம்"
                                        id="CleanUp"
                                        autoComplete="CleanUp"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="wasteland"
                                        label="Wasteland/தரிசு"
                                        id="wasteland"
                                        autoComplete="wasteland"
                                        color="success"
                                    // error={error?.userName !== undefined}
                                    // helperText={error.userName}
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
                <Container maxWidth="lg">
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Area/பரப்பளவு (Acres)</StyledTableCell>
                                        <StyledTableCell align="right">OwnFarming/சொந்த விவசாயம் (Acres)</StyledTableCell>
                                        <StyledTableCell align="right">ToShare/பங்குக்கிற்கு விடுவது (Acres)</StyledTableCell>
                                        <StyledTableCell align="right">Others Farmland/பிறர் நில விவசாயம் (Acres)</StyledTableCell>
                                        <StyledTableCell align="right">CleanUptoFarm/சுத்தம்செய்து இம்முறை விவசாயம் (Acres)</StyledTableCell>
                                        <StyledTableCell align="right">Wasteland/தரிசு(Acres)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default LandDetails