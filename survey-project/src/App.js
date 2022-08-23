import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import FarmerProfile from "./screens/FarmerProfile";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
          <Route path="viewprofile" element={<FarmerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
