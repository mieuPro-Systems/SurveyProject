import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  validateLoginInput,
  validateLoginInputEmployee,
} from "../Validation/login";

import {
  SET_CURRENT_USER,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";
import axiosInstance from "../utils/axiosInstance";

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
        Survey Project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
export default function SignIn() {
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  // console.log("state", state);

  const handleSubmit = (event) => {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userDetails = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (state.loggedInAs === "Admin") {
      const { errors, isValid } = validateLoginInput(userDetails);
      setError(errors);
      if (isValid) {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {
            userDetails,
            loggedInAs: state.loggedInAs,
            isAuthenticated: true,
          },
        });
        dispatch({
          type: SET_LOADING_FALSE,
        });
        dispatch({
          type: SET_SHOW_SNACKBAR_TRUE,
          payload: {
            snackBarMessage: "Logged in Successfully",
            snackBarColor: "success",
          },
        });
        navigate("/dashboard");
        localStorage.setItem(
          "faFaCoUserDetail",
          JSON.stringify({
            isLoggedIn: true,
            userName: userDetails.username,
          })
        );
      } else {
        dispatch({
          type: SET_LOADING_FALSE,
        });
      }
    } else if (state.loggedInAs === "Employee") {
      dispatch({
        type: SET_LOADING_FALSE,
      });
      const { errors, isValid } = validateLoginInputEmployee(userDetails);
      setError(errors);
      if (isValid) {
        dispatch({
          type: SET_LOADING_TRUE,
        });
        axiosInstance
          .post("/employee/login", {
            userName: userDetails.username,
            password: userDetails.password,
          })
          .then((res) => {
            // console.log("response for employee login", res);
            dispatch({
              type: SET_LOADING_FALSE,
            });

            if (res.data.login === true) {
              dispatch({
                type: SET_CURRENT_USER,
                payload: {
                  userDetails,
                  loggedInAs: state.loggedInAs,
                  isAuthenticated: true,
                },
              });
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: "Signed In Successfully",
                  snackBarColor: "success",
                },
              });
              navigate("/dashboard");
              localStorage.setItem(
                "faFaCoUserDetail",
                JSON.stringify({
                  isLoggedIn: true,
                  userName: userDetails.username,
                })
              );
            } else if (res.data.login === false) {
              console.error("login fail");
            }
          })
          .catch((err) => {
            dispatch({
              type: SET_LOADING_FALSE,
            });

            setError({
              username: err.response.data.userName || undefined,
              password: err.response.data.password || undefined,
            });

            console.error(
              "Error occured while updating employee password",
              err.response.data
            );
          });
      }
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div style={{ backgroundImage: "url(../assests/cow.jpg)" }}>
      <div style={{ padding: "10px" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          color="success"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </div>
      <ThemeProvider theme={theme}>
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
              Sign in
            </Typography>
            <p className="mt-3 text-primary fw-bold">{state.loggedInAs}</p>
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                color="success"
                error={error?.username !== undefined}
                helperText={error.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                color="success"
                error={error?.password !== undefined}
                helperText={error.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((pass) => !pass)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "green" }}
              >
                Sign In
              </Button>
              {state.loggedInAs === 'Employee' ? <div><p>Don't have an account?<Button onClick={() =>
                navigate("/employeesignup", {
                  state: { loggedInAs: "Employee", type: "signUp" },
                })}> Sign up</Button></p></div> : null}
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
