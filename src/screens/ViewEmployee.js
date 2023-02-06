import "antd/dist/antd.min.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { SET_ADDED_EMPLOYEES, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import AlertDialog from "../components/common/Modal";

const ViewFarmers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [farmersData, setFarmersData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addedEmployees } = useSelector((state) => state.employee);
  const [deleteUser, setDeleteUser] = React.useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Sl.no",
      dataIndex: "slNo",
      key: "slNo",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      width: "20%",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
      ...getColumnSearchProps("phoneNumber"),
    },

    {
      title: "Edit",
      dataIndex: "editIcon",
      key: "editIcon",
      width: "10%",
    },
    {
      title: "Delete",
      dataIndex: "deleteIcon",
      key: "deleteIcon",
      width: "10%",
    },
  ];

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
      .delete(`/employee/${deleteUser.userName}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Employee Deleted Successfully");
          console.log("Response", res.data);
          dispatch({
            type: SET_ADDED_EMPLOYEES,
            payload: res.data,
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
      .catch((err) => {
        console.log("Error while deleting farmer and get response", err);
      });
  };

  const handledelete = (employeeData) => {
    console.log("Delete", employeeData);
    handleModalClickOpen();
    setDeleteUser(employeeData);
  };

  const setFarmersDataToRender = (datas) => {
    let temp = [];
    datas.map((data, index) =>
      temp.push({
        key: index + 1,
        slNo: index + 1,
        name: data.firstName + " " + data.lastName,
        userName: data.userName,
        email: data.email.length > 0 ? data.email : "-",
        phoneNumber: data.phoneNumber,
        editIcon: (
          <IconButton
            onClick={() =>
              navigate("/dashboard/updateemployee", { state: data })
            }
          >
            <EditIcon />
          </IconButton>
        ),
        deleteIcon: (
          <IconButton onClick={() => handledelete(data)}>
            <DeleteIcon />
          </IconButton>
        ),
      })
    );
    // console.log(temp, "temp");
    setFarmersData(temp);
  };

  useEffect(() => {
    const fetchUser = () => {
      axiosInstance
        .get("/employee/all")
        .then((res) => {
          // console.log("Response for getting farmers", res);
          dispatch({
            type: SET_ADDED_EMPLOYEES,
            payload: res.data,
          });
          setFarmersDataToRender(addedEmployees);
        })
        .catch((err) =>
          console.error("Error in getting farmer", err.response.data)
        );
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFarmersDataToRender(addedEmployees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedEmployees]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={farmersData}
        scroll={{
          y: 460,
        }}
      />
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
    </>
  );
};

export default ViewFarmers;
