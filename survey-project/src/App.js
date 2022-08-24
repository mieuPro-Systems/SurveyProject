<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
=======
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

>>>>>>> e87b86272489b14935af210e3d7f794f7098c8c1
import LoginScreen from "./screens/Login";

import DrawerComponent from "./components/common/SideDrawer";
import AddEmployeeScreen from "./screens/AddEmployee";
import ViewEmployeesScreen from "./screens/ViewEmployee";
import HomeScreen from "./screens/Home";

import AddFarmerScreen from "./screens/AddFarmer";
import ViewFarmerScreen from "./screens/ViewFarmer";
import UpdateEmployeeScreen from "./screens/UpdateEmployee";
import FarmerInfoScreen from "./screens/FarmerInfo";
import LandDetailScreen from "./screens/LandDetails";
import LiveStockScreen from "./screens/LiveStockDetails";
import MachineDetailsScreen from "./screens/MachineDetails";
import LabourDetailsScreen from "./screens/LabourDetails";
<<<<<<< HEAD
import CropDetailsScreen from "./screens/CropDetails";
import GardenDetailsScreen from "./screens/GardenDetails";
import OwnerDetailsScreen from "./screens/LandSub/OwnerDetails";

=======
import FarmerProfile from "./screens/FarmerProfile";
import { SET_CURRENT_USER } from "./actions/types";
>>>>>>> e87b86272489b14935af210e3d7f794f7098c8c1

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetail = async () => {
      let storedUserDetail = await localStorage.getItem("faFaCoUserDetail");
      return JSON.parse(storedUserDetail);
    };
    getUserDetail().then((res) => {
      if (res?.isLoggedIn) {
        dispatch({ type: SET_CURRENT_USER, payload: { res } });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DrawerComponent /> : <Navigate to="/" />}
        >
          <Route path="addemployee" element={<AddEmployeeScreen />} />
          <Route path="viewemployees" element={<ViewEmployeesScreen />} />
          <Route path="updateemployee" element={<UpdateEmployeeScreen />} />
          <Route path="addfarmer" element={<AddFarmerScreen />} />
          <Route path="farmerinfo" element={<FarmerInfoScreen />} />
          <Route path="landdetails" element={<LandDetailScreen />} />
          <Route path="livestocks" element={<LiveStockScreen />} />
          <Route path="machines" element={<MachineDetailsScreen />} />
          <Route path="labour" element={<LabourDetailsScreen />} />
          <Route path="viewfarmer" element={<ViewFarmerScreen />} />
<<<<<<< HEAD
          <Route path="cropdetails" element={<CropDetailsScreen />} />
          <Route path="gardendetails" element={<GardenDetailsScreen />} />
          <Route path="ownerdetails" element={<OwnerDetailsScreen />} />
=======
          <Route path="viewprofile" element={<FarmerProfile />} />
>>>>>>> e87b86272489b14935af210e3d7f794f7098c8c1
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
