import "antd/dist/antd.min.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { SET_ALL_FARMERS, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import AlertDialog from "../components/common/Modal";

const ViewFarmers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [farmersData, setFarmersData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addedFarmers } = useSelector((state) => state.farmer);
  const [deleteFarmerId, setDeleteFarmmerId] = React.useState(null);

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
      title: "Farmer ID",
      dataIndex: "farmerId",
      key: "farmerId",
      width: "10%",
      ...getColumnSearchProps("farmerId"),

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "farmerName",
      key: "farmerName",
      width: "20%",
      sorter: (a, b) => a.farmerName.length - b.farmerName.length,
      ...getColumnSearchProps("farmerName"),
    },
    {
      title: "Father name",
      dataIndex: "fatherName",
      key: "fatherName",
      width: "20%",
      ...getColumnSearchProps("fatherName"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "10%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "10%",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      width: "10%",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "10%",
    },
  ];

  const handleIndividualFarmerClick = (farmerId) => {
    // console.log("indFarmerDetail", farmerId);
    // console.log(addedFarmers);
    let individualFarmerChoosen = addedFarmers.filter(
      (farmerDetail) => farmerDetail.farmerDetails.id === farmerId
    );
    // console.log("farmer choosen", individualFarmerChoosen);
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
      .delete(`/farmer/id/${deleteFarmerId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Farmer Deleted Successfully");
          console.log("Response", res.data);
          dispatch({
            type: SET_ALL_FARMERS,
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

  const handledelete = (farmerId) => {
    console.log("Delete", farmerId);
    handleModalClickOpen();
    setDeleteFarmmerId(farmerId);
  };

  const setFarmersDataToRender = (datas) => {
    let temp = [];
    datas.map((data, index) =>
      temp.push({
        key: index + 1,
        slNo: index + 1,
        farmerId: data.farmerDetails.id,
        farmerName: data.farmerDetails.farmerName,
        fatherName: data.farmerDetails.fatherName,
        age: data.farmerDetails.age,
        gender: data.farmerDetails.gender,
        phoneNumber: data.farmerDetails.phoneNumber,
        profile: (
          <IconButton
            onClick={() => {
              // console.log(data.farmerDetails.id);
              handleIndividualFarmerClick(data.farmerDetails.id);
              return true;
            }}
          >
            <VisibilityIcon />
          </IconButton>
        ),
        delete: (
          <IconButton
            onClick={() => {
              handledelete(data.farmerDetails.id);
              return true;
            }}
          >
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
        .get("/farmer/all")
        .then((res) => {
          console.log("Response for getting farmers", res);
          dispatch({
            type: SET_ALL_FARMERS,
            payload: res.data,
          });
          setFarmersDataToRender(addedFarmers);
        })
        .catch((err) =>
          console.error("Error in getting farmer", err.response.data)
        );
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setFarmersDataToRender(addedFarmers);
  }, [addedFarmers]);

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
