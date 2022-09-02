import "antd/dist/antd.min.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  SET_ALL_FARMERS,
  SET_LAND_DETAILS,
  SET_LAND_DETAILS_ARRAY,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from "../../actions/types";
import ModalLandDetailsContent from "./ModalLandDetailsContent";
import { Link } from "react-router-dom";

const SearchFarmers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [farmersData, setFarmersData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addedFarmers, farmers } = useSelector((state) => state.farmer);
  const [selectedRow, setSelectedRow] = useState([]);
  const location = useLocation();
  const { state } = location;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [landDetailsForModal, setLandDetailsForModal] = useState([]);
  const [selectedLandDetail, setSelectedLandDetails] = useState([]);

  console.log("location state", location.state)

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
      title: "Land Details",
      dataIndex: "landDetails",
      key: "landDetails",
      width: "10%",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("land details selected", selectedLandDetail);
    console.log("TakenleaseProps", location.state);
    const data = location.state;
    const landdataarray = selectedLandDetail;

    landdataarray.forEach((land) => {
      delete land.slNo;
      delete land.key;
      land["farmerId"] = data["farmerId"];
      land["supervisorId"] = data["farmerId"];
      land["category"] = data["category"];
    });
    console.log("landdataarray", landdataarray);
    const postData = {
      rentLandDetails: landdataarray,
    };
    dispatch({
      type: SET_LOADING_TRUE,
    });

    axiosInstance
      .post("/land/rent", postData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Land details uploaded successfully", res.data);
          dispatch({
            type: SET_LAND_DETAILS_ARRAY,
            payload: landdataarray,
          });
          dispatch({
            type: SET_LOADING_FALSE,
          });
          navigate("/dashboard/landdetails", { state: { update: state.update } });
        }
        if (res.status === 400) {
          console.log("Error while uploading land details", res.data);
          dispatch({
            type: SET_LOADING_FALSE,
          });
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: SET_LOADING_FALSE,
        });
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIndividualFarmerLandDetailsClick = (farmerData) => {
    // console.log("land Details", farmerData.landDetails);
    setLandDetailsForModal(farmerData.landDetails);
    showModal();
  };

  const setFarmersDataToRender = (datas) => {
    let temp = [];
    datas.map((data, index) => {
      if (data.farmerDetails.farmerId !== farmers?.farmerDetails?.farmerId) {
        temp.push({
          key: index + 1,
          slNo: index + 1,
          farmerId: data.farmerDetails.farmerId,
          farmerName: data.farmerDetails.farmerName,
          fatherName: data.farmerDetails.fatherName,
          age: data.farmerDetails.age,
          gender: data.farmerDetails.gender,
          phoneNumber: data.farmerDetails.phoneNumber,
          village: data.farmerDetails.village,
          landDetails: (
            <IconButton
              onClick={() => {
                // console.log(data.farmerDetails.id);
                handleIndividualFarmerLandDetailsClick(data);
                return true;
              }}
            >
              <VisibilityIcon />
            </IconButton>
          ),
        });
      }
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFarmersDataToRender(addedFarmers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedFarmers]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
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
    console.log("selectedFarmersId", selectedFarmersId);
    addedFarmers.map((farmerDetail) => {
      console.log(farmerDetail);
      if (selectedFarmersId.includes(farmerDetail.farmerDetails.farmerId)) {
        console.log("propscheck", location.state);
        const data = location.state;
        data.supervisorId = farmerDetail.farmerDetails.farmerId;
        console.log("Updateprops", data);
        const dataarray = [];
        dataarray.push(data);
        const postData = {
          landDetails: dataarray,
        };
        console.log("postData", postData);
        dispatch({
          type: SET_LOADING_TRUE,
        });
        axiosInstance.post("/land/create", postData).then((res) => {
          if (res.status === 200) {
            console.log("Land Id created Successfully", res.data);
            data["landId"] = res.data.landId;
            console.log("afterpost", data);
            dispatch({
              type: SET_LAND_DETAILS,
              payload: data,
            });
            dispatch({
              type: SET_LOADING_FALSE,
            });
          }
          if (res.status === 400) {
            dispatch({
              type: SET_LOADING_FALSE,
            });
            console.log("Error while Getting Land ID", res.data)
          }
        }).catch(err => {
          console.log("Error while getting Land ID", err)
          dispatch({
            type: SET_LOADING_FALSE,
          });
        });
        navigate("/dashboard/landdetails", { state: { update: state.update } });
        return console.log("found match details", farmerDetail);
      } else {
        return null;
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
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-danger float-end mx-3"
      >
        Cancel
      </button>
      <p className="text-muted ms-3">
        Note: If couldn't find farmer you are searching{" "}
        <span
          className="text-primary"
          role="button"
          onClick={() =>
            navigate("/dashboard/addfarmer", {
              state: { update: false },
            })
          }
        >
          Click here
        </span>{" "}
        to add new farmer
      </p>
      <Modal
        title="Land Details"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Add"
        onCancel={handleCancel}
        width={1000}
        centered
      >
        <ModalLandDetailsContent
          landDetailsForModal={landDetailsForModal}
          setSelectedLandDetails={setSelectedLandDetails}
        />
      </Modal>
    </>
  );
};

export default SearchFarmers;
