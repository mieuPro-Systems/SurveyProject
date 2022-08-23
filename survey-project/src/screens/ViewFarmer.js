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
import { SET_ADDED_EMPLOYEES, SET_ALL_FARMERS } from "../actions/types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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
  { id: "phoneNumber", label: "Phone number", minWidth: 10 },
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

  const handledelete = (employee) => {
    console.log("Delete", employee);
    axiosInstance
      .delete(`/employee/${employee.userName}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Deleted Successfully");
          console.log("Response", res.data);
          dispatch({
            type: SET_ADDED_EMPLOYEES,
            payload: res.data,
          });
        }
      })
      .catch((err) =>
        console.log("Error while deleting and get response", err)
      );
  };

  addedFarmers.map((farmer, index) => {
    // console.log("farmer", farmer);
    farmerData.push({
      slNo: index + 1,
      farmerId: farmer.farmerDetails.id,
      name: farmer.farmerDetails.farmerName,
      fatherName: farmer.farmerDetails.fatherName,
      age: farmer.farmerDetails.age,
      gender: farmer.farmerDetails.gender,
      phoneNumber: farmer.farmerDetails.phoneNumber,
      editIcon: (
        <IconButton
          onClick={() => {
            navigate("/dashboard/updatefarmer", { state: farmer });
          }}
        >
          <EditIcon />
        </IconButton>
      ),
      deleteIcon: (
        <IconButton onClick={() => handledelete(farmer)}>
          <DeleteIcon />
        </IconButton>
      ),
    });
  });

  React.useEffect(() => {
    axiosInstance
      .get("/farmer/all")
      .then((res) => {
        dispatch({
          type: SET_ALL_FARMERS,
          payload: res.data,
        });
      })
      .catch((err) => console.log("Error in getting all farmer details", err));
  }, [dispatch]);

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
                      key={column.id}
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
                        onClick={() => {
                          handleIndividualFarmerClick(row.farmerId);
                        }}
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

  return <div>{tableContent}</div>;
}
