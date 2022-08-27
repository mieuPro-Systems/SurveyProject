import React, { useEffect, useState } from "react";
import CommonTable from "../../components/common/Table";

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

const ModalLandDetailsContent = (props) => {
  const [data, setData] = useState([]);

  const tableProps = {
    rowSelection: true,
  };

  useEffect(() => {
    if (props.landDetailsForModal.length > 1) {
      let modalContent = [];
      let slNo = 1;
      props.landDetailsForModal.map((landDetail, index) => {
        if (landDetail.category === "availableForLease") {
          modalContent.push({
            key: slNo,
            slNo: slNo,
            supervisorId:
              landDetail.supervisorId.length > 1
                ? landDetail.supervisorId
                : "NA",
            ownerId: landDetail.ownerId.length > 1 ? landDetail.ownerId : "NA",
            landId: landDetail.landId,
            category: "Available for Lease",
            area: landDetail.area,
            addons: landDetail.addons === "None" ? "NA" : landDetail.addons,
          });
          slNo += 1;
        }
      });
      setData(modalContent);
    } else {
      setData([]);
    }
  }, [props.landDetailsForModal]);

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        tableProps={tableProps}
        selectionType="checkbox"
        setSelectedValues={props.setSelectedLandDetails}
      />
      <p className="text-muted" style={{ marginTop: "-45px" }}>
        NA - Not Available
      </p>
    </div>
  );
};

export default ModalLandDetailsContent;
