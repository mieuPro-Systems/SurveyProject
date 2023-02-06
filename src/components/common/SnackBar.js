import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_SNACKBAR_FALSE } from "../../actions/types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageSnackBar() {
  const { showSnackBar, snackBarContent } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: SET_SHOW_SNACKBAR_FALSE,
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarContent.color}
          sx={{ width: "100%" }}
        >
          {snackBarContent.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
