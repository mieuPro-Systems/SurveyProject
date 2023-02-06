import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Variety",
    dataIndex: "variety",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Area",
    dataIndex: "area",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Organic",
    dataIndex: "organic",
  },
  {
    title: "Selling Period",
    dataIndex: "sellingPeriod",
  },
];

const GardenDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.gardenDetails.length > 0) {
      let modalContent = [];
      props.gardenDetails.map((detail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          type: detail.type,
          name: detail.name,
          variety: detail.variety,
          brand: detail.brand,
          area: detail.area,
          age: detail.age,
          count: detail.count,
          organic: String(detail.organic),
          sellingPeriod: detail.sellingPeriod,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.gardenDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default GardenDetails;
