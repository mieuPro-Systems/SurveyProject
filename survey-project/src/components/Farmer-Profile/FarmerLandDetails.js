import React, { useState, useEffect } from "react";
import CommonTable from "../common/Table";

const columns = [
  {
    title: "Sl no.",
    dataIndex: "slNo",
    width: "10%",
  },
  {
    title: "Supervisor ID",
    dataIndex: "supervisorId",
  },
  {
    title: "Owner ID",
    dataIndex: "ownerId",
  },
  {
    title: "Land ID",
    dataIndex: "landId",
  },
  {
    title: "Category",
    dataIndex: "category",
    width: "20%",
  },
  {
    title: "Area (acres)",
    dataIndex: "area",
  },
  {
    title: "Add ons",
    dataIndex: "addons",
  },
];

const FarmerLandDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.landDetails.length > 1) {
      let modalContent = [];
      props.landDetails.map((landDetail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          supervisorId:
            landDetail.supervisorId.length > 1 ? landDetail.supervisorId : "NA",
          ownerId: landDetail.ownerId.length > 1 ? landDetail.ownerId : "NA",
          landId: landDetail.landId,
          category: landDetail.category,
          area: landDetail.area,
          addons: landDetail.addons === "None" ? "NA" : landDetail.addons,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.landDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default FarmerLandDetails;
