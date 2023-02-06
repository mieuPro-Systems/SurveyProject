import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import validateEmployeeUsernameInput from "../Validation/EmployeeSignup";
import PasswordChange from "../components/common/PasswordChange";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        FAFACO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function EmployeeSignUp() {
  const [error, setError] = React.useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employeeDetail = {
      userName: data.get("userName"),
    };
    console.log({
      userName: data.get("userName"),
    });
    const { errors, isValid } = validateEmployeeUsernameInput(employeeDetail);
    // console.log("errors", errors);
    setError(errors);
    console.log(errors, isValid);
    if (isValid) {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      axiosInstance
        .post("/employee/check", {
          userName: employeeDetail.userName,
        })
        .then((res) => {
          console.log("response", res);
          dispatch({
            type: SET_LOADING_FALSE,
          });
          if (res.status === 200) {
            if (res.data.userName === "valid") {
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: "Username valid Change Password",
                  snackBarColor: "success",
                },
              });
              setUserName(employeeDetail.userName);
            } else {
              setUserName(null);
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: SET_LOADING_FALSE,
          });
          setUserName(null);
          console.log("error res", err.response.data);
          if (err.response.data) {
            setError({
              userName: err.response.data?.userName || undefined,
            });
          }
        });
    }
  };

  const GetEmployeeUserName = () => (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        color="success"
        onClick={() => navigate(-1)}
        className="m-3"
      >
        Back
      </Button>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <p className="text-primary mt-3 fw-bold">Employee</p>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoFocus
              color="success"
              error={error?.userName !== undefined}
              helperText={error.userName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
            >
              Next
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <div>
      {userName === null && <GetEmployeeUserName />}
      {userName !== null && <PasswordChange userName={userName} />}
    </div>
  );
}
