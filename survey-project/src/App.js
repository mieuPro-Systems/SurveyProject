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
import StepperForm from "./components/stepperform";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DrawerComponent /> : <Navigate to="/login" />
          }
        >
          <Route path="addemployee" element={<AddEmployeeScreen />} />
          <Route path="viewemployees" element={<ViewEmployeesScreen />} />
          <Route path="addfarmer" element={<StepperForm />} />
          <Route path="viewfarmer" element={<ViewFarmerScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
