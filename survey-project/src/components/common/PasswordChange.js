import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { validateEmployeePasswordInput } from "../../Validation/EmployeeSignup";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../../actions/types";

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

const PasswordChange = (props) => {
  const navigate = useNavigate();
  const theme = createTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = {
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    // console.log("password", password);
    const { errors, isValid } = validateEmployeePasswordInput(password);
    setError(errors);
    // console.log(errors, isValid);
    if (isValid) {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      axiosInstance
        .post("/employee/signup", {
          userName: props.userName,
          password: password.password,
        })
        .then((res) => {
          // console.log("response", res);
          dispatch({
            type: SET_LOADING_FALSE,
          });
          if (res.status === 201) {
            if (res.data.userName.length > 0) {
              dispatch({
                type: SET_SHOW_SNACKBAR_TRUE,
                payload: {
                  snackBarMessage: "Sign up Successful, Login to Continue",
                  snackBarColor: "success",
                },
              });
              navigate("/");
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: SET_LOADING_FALSE,
          });
          console.error("Error occured while updating employee password", err);
          if (err?.response?.data) {
            setError({
              userName: err.response.data?.userName || undefined,
            });
            dispatch({
              type: SET_SHOW_SNACKBAR_TRUE,
              payload: {
                snackBarMessage: err.response.data?.userName,
                snackBarColor: "warning",
              },
            });
          }
        });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          color="success"
          onClick={() => navigate("/")}
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
              Change Password
            </Typography>
            <p className="text-primary mt-3 fw-bold">{props.userName}</p>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
                color="success"
                error={error?.password !== undefined}
                helperText={error.password}
                type={showPassword ? "text" : "password"}
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                color="success"
                error={error?.confirmPassword !== undefined}
                helperText={error.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setConfirmShowPassword((pass) => !pass)}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
                Change Password
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default PasswordChange;
