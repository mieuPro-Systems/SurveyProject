import React, { useState, useEffect } from "react";
import CommonTable from "../common/Table";

const columns = [
  {
    title: "Sl no.",
    dataIndex: "slNo",
    width: "10%",
  },
  {
    title: "Place",
    dataIndex: "place",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Breed",
    dataIndex: "breed",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Season",
    dataIndex: "season",
  },
];

const LivestockDetails = (props) => {
  const [data, setData] = useState([]);
  const tableProps = {
    rowSelection: false,
  };

  useEffect(() => {
    if (props.livestockDetails.length > 0) {
      let modalContent = [];
      props.livestockDetails.map((detail, index) => {
        modalContent.push({
          key: index + 1,
          slNo: index + 1,
          place: detail.place,
          type: detail.type,
          breed: detail.breed,
          name: detail.name,
          count: detail.count,
          season: detail.season,
        });
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.livestockDetails]);

  return (
    <div>
      <CommonTable columns={columns} data={data} tableProps={tableProps} />
    </div>
  );
};

export default LivestockDetails;
