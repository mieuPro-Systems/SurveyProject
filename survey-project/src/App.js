import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginScreen from "./screens/Login";
<<<<<<< HEAD

import DrawerComponent from "./components/common/SideDrawer";
import AddEmployeeScreen from "./screens/AddEmployee";
import ViewEmployeesScreen from "./screens/ViewEmployee";
import HomeScreen from "./screens/Home";
=======
import AddEmployeeScreen from "./screens/AddEmployee";
import ViewEmployeesScreen from "./screens/ViewEmployee";
import HomeScreen from "./screens/Home";
import DrawerComponent from "./components/common/SideDrawer";
import AddFarmerScreen from "./screens/AddFarmer";
import ViewFarmerScreen from "./screens/ViewFarmer";
import StepperForm from "./components/stepperform";

>>>>>>> 044e0cdf13a5e07ad8d656208e7c45110954d62f

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
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 044e0cdf13a5e07ad8d656208e7c45110954d62f
};

export default App;
