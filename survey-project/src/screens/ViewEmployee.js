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
import { SET_ADDED_EMPLOYEES } from "../actions/types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const { addedEmployees } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const employeeData = [];
  addedEmployees.map((employee) =>
    employeeData.push({
      slNo: employee.slNo,
      name: employee.name,
      userName: employee.userName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      editIcon: (
        <IconButton>
          <EditIcon />
        </IconButton>
      ),
      deleteIcon: (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ),
    })
  );
  React.useEffect(() => {
    axiosInstance
      .get("/employee/all")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_ADDED_EMPLOYEES,
          payload: res.data,
        });
      })
      .catch((err) => console.log("Error in getting employee details", err));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      </div>
    ) : (
      <p className="text-center fs-5">No Employees added...</p>
    );

  return <div>{tableContent}</div>;
}
