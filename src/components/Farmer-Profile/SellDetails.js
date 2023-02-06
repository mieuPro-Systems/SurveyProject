import React, { useState, useEffect } from "react";
import CommonTable from "../common/Table";

const columns = [
  {
    title: "Sl no.",
    dataIndex: "slNo",
    width: "10%",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Variety",
    dataIndex: "variety",
  },
  {
    title: "Organic",
    dataIndex: "organic",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Data",
    dataIndex: "date",
  },
];

const SellDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.sellDetails.length > 0) {
      let modalContent = [];
      props.sellDetails.map((detail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          productName: detail.productName,
          variety: detail.variety,
          organic: String(detail.organic),
          quantity: detail.quantity,
          price: detail.price,
          date: detail.date,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.sellDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default SellDetails;
