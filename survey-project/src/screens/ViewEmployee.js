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
  SET_ADDED_EMPLOYEES,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_SHOW_SNACKBAR_TRUE,
} from "../actions/types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/common/Modal";

const columns = [
  { id: "slNo", label: "Sl.no", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "userName",
    label: "Username",
    minWidth: 100,
  },
  { id: "email", label: "Email Id", minWidth: 100 },
  { id: "phoneNumber", label: "Phone number", minWidth: 100 },
  { id: "editIcon", label: "Edit", minWidth: 10 },
  { id: "deleteIcon", label: "Delete", minWidth: 10 },
];

export default function ViewEmployeesScreen() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const { addedEmployees } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const employeeData = [];
  const [deleteUser, setDeleteUser] = React.useState(null);

  const handledelete = (employee) => {
    console.log("Delete", employee);
    handleModalClickOpen();
    setDeleteUser(employee);
  };

  addedEmployees.map((employee) =>
    employeeData.push({
      slNo: employee.slNo,
      name: employee.firstName + " " + employee.lastName,
      userName: employee.userName,
      email: employee.email.length > 0 ? employee.email : "-",
      phoneNumber: employee.phoneNumber,
      editIcon: (
        <IconButton
          onClick={() =>
            navigate("/dashboard/updateemployee", { state: employee })
          }
        >
          <EditIcon />
        </IconButton>
      ),
      deleteIcon: (
        <IconButton onClick={() => handledelete(employee)}>
          <DeleteIcon />
        </IconButton>
      ),
    })
  );
  React.useEffect(() => {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    axiosInstance
      .get("/employee/all")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_ADDED_EMPLOYEES,
          payload: res.data,
        });
        dispatch({
          type: SET_LOADING_FALSE,
        });
      })
      .catch((err) => {
        console.log("Error in getting employee details", err);
        dispatch({
          type: SET_LOADING_FALSE,
        });
      });
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    dispatch({
      type: SET_LOADING_TRUE,
    });
    axiosInstance
      .delete(`/employee/${deleteUser.userName}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Deleted Successfully");
          console.log("Response", res.data);
          dispatch({
            type: SET_ADDED_EMPLOYEES,
            payload: res.data,
          });
          dispatch({
            type: SET_LOADING_FALSE,
          });
          dispatch({
            type: SET_SHOW_SNACKBAR_TRUE,
            payload: {
              snackBarMessage: "Employee Deleted Successfully",
              snackBarColor: "warning",
            },
          });
        }
      })
      .catch((err) => {
        console.log("Error while deleting and get response", err);
        dispatch({
          type: SET_LOADING_FALSE,
        });
      });
  };

  const tableContent =
    employeeData.length > 0 ? (
      <div>
        <p className="ml-3  fs-5">Added Employees</p>
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
                {employeeData
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
            count={employeeData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <AlertDialog
          modal={modal}
          handleModalClose={handleModalClose}
          handleModalClickOpen={handleModalClickOpen}
          modalMessage={
            "This cannot be undone, Are you sure want to Delete the Employee?"
          }
          modalTitle={"Delete Employee"}
          setConfirm={setConfirm}
        />
      </div>
    ) : (
      <p className="text-center fs-5">No Employees added...</p>
    );

  return <div>{tableContent}</div>;
}
