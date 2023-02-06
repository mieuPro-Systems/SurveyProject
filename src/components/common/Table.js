import { Table } from "antd";
import React from "react";

const CommonTable = (props) => {
  const { tableProps } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      if (props?.setSelectedValues) {
        props.setSelectedValues(selectedRows);
      }
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const rowSelectionOption = tableProps.rowSelection
    ? {
        type: props?.selectionType === "checkbox" ? "checkbox" : "radio",
        ...rowSelection,
      }
    : false;
  return (
    <div>
      <Table
        rowSelection={rowSelectionOption}
        columns={props.columns}
        dataSource={props.data}
        scroll={{
          y: 250,
        }}
      />
    </div>
  );
};

export default CommonTable;
