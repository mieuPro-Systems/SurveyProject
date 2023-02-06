import React, { useState, useEffect } from "react";
import CommonTable from "../common/Table";

const columns = [
  {
    title: "Sl no.",
    dataIndex: "slNo",
    width: "10%",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Sub Type",
    dataIndex: "subType",
  },
  {
    title: "Attachments",
    dataIndex: "attachments",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Rental Basis",
    dataIndex: "rentalBasis",
  },
  {
    title: "Rent (in Rs)",
    dataIndex: "rent",
  },
];

const MachineDetails = (props) => {
  //   console.log("machineDetails1", props.machineDetails);
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.machineDetails.length > 0) {
      let modalContent = [];
      props.machineDetails.map((landDetail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          type: landDetail.type,
          subType: landDetail.subType,
          attachments: landDetail.attachments,
          brand: landDetail.brand,
          count: landDetail.count,
          rentalBasis: landDetail.rentalBasis,
          rent: landDetail.rent,
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

export default MachineDetails;
