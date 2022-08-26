import "antd/dist/antd.min.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { SET_ALL_FARMERS } from "../../actions/types";

const SearchFarmers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [farmersData, setFarmersData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addedFarmers } = useSelector((state) => state.farmer);
  const [selectedRow, setSelectedRow] = useState([]);
  const location = useLocation()

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
      title: "Village",
      dataIndex: "village",
      key: "village",
      width: "20%",
      ...getColumnSearchProps("village"),
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
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
        village: data.farmerDetails.village,
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
          // console.log("Response for getting farmers", res);
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRow(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleAddClick = () => {
    let selectedFarmersId = selectedRow.map((entry) => entry.farmerId);
    // console.log("selectedFarmersId", selectedFarmersId);
    addedFarmers.map((farmerDetail) => {
      // console.log(farmerDetail);
      if (selectedFarmersId.includes(farmerDetail.farmerDetails.id)) {
        return console.log("found match details", farmerDetail);
      } else {
        return;
      }
    });
  };

  return (
    <>
      <p className="fw-bold ">Search Farmers</p>
      <Table
        columns={columns}
        dataSource={farmersData}
        scroll={{
          y: 400,
        }}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
      />
      <button
        onClick={handleAddClick}
        className="btn btn-sm btn-primary float-end mx-3"
      >
        Add
      </button>
    </>
  );
};

export default SearchFarmers;
