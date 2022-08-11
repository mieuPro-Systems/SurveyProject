import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginScreen from "./screens/Login";
<<<<<<< HEAD
import DrawerComponent from "./components/common/SideDrawer";
import AddEmployeeScreen from "./screens/AddEmployee";
import ViewEmployeesScreen from "./screens/ViewEmployee";
=======
import HomeScreen from "./screens/Home";
>>>>>>> e7fab319275dd7d86e2b3dc61ed379b6eb5d4468

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
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
=======
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
>>>>>>> e7fab319275dd7d86e2b3dc61ed379b6eb5d4468
  );
};

export default App;
