import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import CropDetailsScreen from "./screens/CropDetails";
import GardenDetailsScreen from "./screens/GardenDetails copy";
import SearchFarmerScreen from "./screens/LandSub/SearchFarmers";
import FarmerProfile from "./screens/FarmerProfile";
import { SET_CURRENT_USER } from "./actions/types";
import LoadingBackdrop from "./components/common/Backdrop";
import MessageSnackBar from "./components/common/SnackBar";
import NoRouteFound from "./components/common/NoRouteFound";
import BuyScreen from "./screens/Buy";
import SellScreen from "./screens/Sell";
import EmployeeSignUp from "./screens/EmployeeSignup";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetail = async () => {
      let storedUserDetail = await localStorage.getItem("faFaCoUserDetail");
      return JSON.parse(storedUserDetail);
    };
    getUserDetail().then((res) => {
      // console.log(res, "ls");
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
        <Route path="/employeesignup" element={<EmployeeSignUp />} />
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
          <Route path="cropdetails" element={<CropDetailsScreen />} />
          <Route path="gardendetails" element={<GardenDetailsScreen />} />
          <Route path="searchfarmer" element={<SearchFarmerScreen />} />
          <Route path="viewprofile" element={<FarmerProfile />} />
          <Route path="buy" element={<BuyScreen />} />
          <Route path="sell" element={<SellScreen />} />
        </Route>
        <Route path="*" exact={true} element={<NoRouteFound />} />
      </Routes>
      <LoadingBackdrop />
      <MessageSnackBar />
    </BrowserRouter>
  );
};

export default App;
