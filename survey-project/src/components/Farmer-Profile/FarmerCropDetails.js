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
    title: "Area (acres)",
    dataIndex: "area",
  },
  {
    title: "Cropped at",
    dataIndex: "croppedAt",
  },
  {
    title: "Organic",
    dataIndex: "organic",
  },
  {
    title: "Seeding Type",
    dataIndex: "seedingType",
  },
  {
    title: "Harvest period",
    dataIndex: "harvestPeriod",
  },
];

const FarmerCropDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.cropDetails.length > 0) {
      let modalContent = [];
      props.cropDetails.map((cropDetail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          type: cropDetail.type,
          name: cropDetail.name,
          variety: cropDetail.variety,
          brand: cropDetail.brand,
          area: cropDetail.area,
          croppedAt: cropDetail.croppedAt,
          organic: String(cropDetail.organic),
          seedingType: cropDetail.seedingType,
          harvestPeriod: cropDetail.harvestPeriod,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.cropDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default FarmerCropDetails;
