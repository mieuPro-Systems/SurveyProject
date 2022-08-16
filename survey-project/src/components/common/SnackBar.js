import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = state;

  const showSnackMessage = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleSnackMessageClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button
        onClick={showSnackMessage({
          vertical: "top",
          horizontal: "right",
          message: "Employee Added",
        })}
      >
        Top-Right
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSnackMessageClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
}
