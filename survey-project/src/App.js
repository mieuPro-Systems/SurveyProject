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

import DrawerComponent from "./components/common/SideDrawer";
import AddEmployeeScreen from "./screens/AddEmployee";
import ViewEmployeesScreen from "./screens/ViewEmployee";

import HomeScreen from "./screens/Home";

>>>>>>> 5e473fd33d5d2c89fa4c0c748add8e0bdab9975a

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
<<<<<<< HEAD
=======

>>>>>>> 5e473fd33d5d2c89fa4c0c748add8e0bdab9975a
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
        </Route>
      </Routes>
    </BrowserRouter>
<<<<<<< HEAD
=======

>>>>>>> 5e473fd33d5d2c89fa4c0c748add8e0bdab9975a
  );
};

export default App;
