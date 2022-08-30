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
import FeedIcon from '@mui/icons-material/Feed';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Cards from '../components/common/cards';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PetsIcon from '@mui/icons-material/Pets';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GrassIcon from '@mui/icons-material/Grass';
import YardIcon from '@mui/icons-material/Yard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';

const theme = createTheme();

const FarmerInfo = () => {

    const card1data = [{ icon: <LandscapeIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Land Records', centerText: 'Add your Land details here', bottomText: 'Add Land Details', onclick: '/dashboard/landdetails' },
    { icon: <PetsIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Live Stocks', centerText: 'Mention LiveStocks here', bottomText: 'Add LiveStock', onclick: '/dashboard/livestocks' },
    { icon: <AgricultureIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Machines', centerText: 'Available Machines for rent', bottomText: 'Add Machinery', onclick: '/dashboard/machines' },
    { icon: <EmojiPeopleIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Labour', centerText: 'Available for fields works', bottomText: 'Add Labour', onclick: '/dashboard/labour' }]

    const card2data = [
        { icon: <GrassIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Crops', centerText: 'Mention your crops details', bottomText: 'Add Crops', onclick: '/dashboard/cropdetails' },
        { icon: <YardIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Garden', centerText: 'Mention your garden details', bottomText: 'Add Garden', onclick: '/dashboard/gardendetails' },
        { icon: <ShoppingCartIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Buy', centerText: 'Get all your Needs here', bottomText: 'Buy', onclick: '/dashboard/buy' },
        { icon: <SellIcon style={{ width: "80px", height: "80px" }} />, headerText: 'Sell', centerText: 'Sell all your Goods here', bottomText: 'Sell', onclick: '/dashboard/sell' },
    ]

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
                            <FeedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Additional Details
                        </Typography>
                        <Box
                            noValidate
                            sx={{ mt: 3 }}
                        >
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <div style={{ flexDirection: 'row', display: 'flex', flex: '1', justifyContent: 'space-evenly', marginBottom: '15px' }}>
                {card1data.map((data, index) => <Cards data={data} />)}
            </div>
            <div style={{ flexDirection: 'row', display: 'flex', flex: '1', justifyContent: 'space-evenly' }}>
                {card2data.map((data, index) => <Cards data={data} />)}
            </div>
        </div>

    )
}

export default FarmerInfo