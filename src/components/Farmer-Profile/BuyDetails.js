import React, { useState, useEffect } from "react";
import CommonTable from "../common/Table";

const columns = [
  {
    title: "Sl no.",
    dataIndex: "slNo",
    width: "10%",
  },
  {
    title: "Requirement",
    dataIndex: "requirement",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand / Variety",
    dataIndex: "brandOrVariety",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Data",
    dataIndex: "date",
  },
];

const BuyDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.buyDetails.length > 0) {
      let modalContent = [];
      props.buyDetails.map((detail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          requirement: detail.requirement,
          name: detail.name,
          brandOrVariety: detail.brandOrVariety,
          quantity: detail.quantity,
          date: detail.date,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.buyDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default BuyDetails;
