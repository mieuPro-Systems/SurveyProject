import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import validateEmployeeAddInput from "../Validation/EmployeeAdditionForm";

import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";
const theme = createTheme();

export default function AddEmployeeScreen() {
  const [error, setError] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employeeDetails = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      userName: data.get("userName"),
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
    };
    console.log("employeeDetails", employeeDetails);
    const { errors, isValid } = validateEmployeeAddInput(employeeDetails);

    if (isValid) {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      axiosInstance
        .post("/employee/create", {
          first_name: employeeDetails.firstName,
          last_name: employeeDetails.lastName,
          username: employeeDetails.userName,
          email: employeeDetails.email,
          contact_number: employeeDetails.phoneNumber,
        })
        .then((res) => {
          if (res.status === 201) {
            console.log("created");
            dispatch({
              type: SET_LOADING_FALSE,
            });
            navigate("/dashboard/viewemployees");
            dispatch({
              type: SET_SHOW_SNACKBAR_TRUE,
              payload: {
                snackBarMessage: "Employee added Successfully",
                snackBarColor: "success",
              },
            });
          }
        })
        .catch((err) => {
          console.log("error res", err.response.data);
          if (err.response.data) {
            if (err.response.data) {
              setError({
                email: err.response.data?.email || undefined,
                userName: err.response.data?.username || undefined,
                phoneNumber: err.response.data?.contact_number || undefined,
              });
            }
          }
          console.log(err.response.data || err);
          dispatch({
            type: SET_LOADING_FALSE,
          });
        });
    }
    setError(errors);
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Employee
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="success"
                  error={error?.firstName !== undefined}
                  helperText={error.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="success"
                  error={error?.lastName !== undefined}
                  helperText={error.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userName"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  color="success"
                  error={error?.userName !== undefined}
                  helperText={error.userName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  color="success"
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 11);
                  }}
                  error={error?.phoneNumber !== undefined}
                  helperText={error.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="success"
                  error={error?.email !== undefined}
                  helperText={error.email}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
            >
              Add
            </Button>
          </Box>
        </Box>
        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={state.message}
          key={vertical + horizontal}
        /> */}
      </Container>
    </ThemeProvider>
  );
}
