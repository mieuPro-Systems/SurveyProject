import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector } from "react-redux";

export default function LoadingBackdrop() {
  const { loading } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();

  //   const handleClose = () => {
  //     dispatch({ type: SET_LOADING_FALSE });
  //   };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
