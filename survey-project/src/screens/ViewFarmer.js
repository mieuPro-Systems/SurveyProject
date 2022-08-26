import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ALL_FARMERS,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/common/Modal";

const columns = [
  { id: "slNo", label: "Sl.no", minWidth: 10 },
  { id: "farmerId", label: "Farmer ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "fatherName",
    label: "Father Name",
    minWidth: 100,
  },
  { id: "age", label: "Age", minWidth: 100 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "phoneNumber", label: "Phone number", minWidth: 100 },
  { id: "profileIcon", label: "Profile", minWidth: 10 },
  { id: "deleteIcon", label: "Delete", minWidth: 10 },
];

export default function ViewFarmerScreen() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const { addedFarmers } = useSelector((state) => state.farmer);
  //   console.log("added farmer", addedFarmers);

  const dispatch = useDispatch();
  const farmerData = [];
  const [deleteFarmerId, setDeleteFarmmerId] = React.useState(null);

  const handledelete = (farmerId) => {
    console.log("Delete", farmerId);
    handleModalClickOpen();
    setDeleteFarmmerId(farmerId);
  };

  addedFarmers.map((farmer, index) => {
    // console.log("farmer", farmer);
    return farmerData.push({
      slNo: index + 1,
      farmerId: farmer.farmerDetails.id,
      name: farmer.farmerDetails.farmerName,
      fatherName: farmer.farmerDetails.fatherName,
      age: farmer.farmerDetails.age,
      gender: farmer.farmerDetails.gender,
      phoneNumber: farmer.farmerDetails.phoneNumber,
      profileIcon: (
        <IconButton
          onClick={() => {
            handleIndividualFarmerClick(farmer.farmerDetails.id);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
      deleteIcon: (
        <IconButton
          onClick={() => {
            handledelete(farmer.farmerDetails.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    });
  });

  React.useEffect(() => {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    axiosInstance
      .get("/farmer/all")
      .then((res) => {
        dispatch({
          type: SET_ALL_FARMERS,
          payload: res.data,
        });
        dispatch({
          type: SET_LOADING_FALSE,
        });
      })
      .catch((err) => {
        console.log("Error in getting all farmer details", err);
        dispatch({
          type: SET_LOADING_FALSE,
        });
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleIndividualFarmerClick = (farmerId) => {
    // console.log("indFarmerDetail", farmerId);
    let individualFarmerChoosen = addedFarmers.filter(
      (farmerDetail) => farmerDetail.farmerDetails.id === farmerId
    );
    // console.log("farmer choosen", individualFarmerChoosen.length);
    if (individualFarmerChoosen.length > 0) {
      navigate("/dashboard/viewprofile", {
        state: individualFarmerChoosen[0],
      });
    } else {
      console.error("Error in finding match for individual farmer");
    }
  };

  // modal
  const [modal, setModal] = React.useState(false);

  const handleModalClickOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const setConfirm = () => {
    axiosInstance
      .delete(`/farmer/delete/${deleteFarmerId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Farmer Deleted Successfully");
          console.log("Response", res.data.data);
          dispatch({
            type: SET_ALL_FARMERS,
            payload: res.data.data,
          });
          dispatch({
            type: SET_SHOW_SNACKBAR_TRUE,
            payload: {
              snackBarMessage: "Farmer Deleted Successfully",
              snackBarColor: "warning",
            },
          });
        }
      })
      .catch((err) =>
        console.log("Error while deleting farmer and get response", err)
      );
  };

  const tableContent =
    farmerData.length > 0 ? (
      <div>
        <p className="ml-3  fs-5">Added Farmers</p>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.slNo}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {farmerData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            style={{
              textAlign: "center",
              align: "center",
              alignItems: "center",
            }}
            count={farmerData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    ) : (
      <p className="text-center fs-5">No Farmers added...</p>
    );

  return (
    <div>
      {tableContent}
      <AlertDialog
        modal={modal}
        handleModalClose={handleModalClose}
        handleModalClickOpen={handleModalClickOpen}
        modalMessage={
          "This cannot be undone, Are you sure want to Delete the Farmer?"
        }
        modalTitle={"Delete Farmer"}
        setConfirm={setConfirm}
      />
    </div>
  );
}
