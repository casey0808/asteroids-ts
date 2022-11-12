import React, { useState } from "react";
import { Table } from "antd";
import addIcon from "../assets/icons/add.svg";
import { columns } from "../constants/const";
// import closeIcon from '../assets/icons/close.svg';
import { IPlanetData } from "../constants/typing";
import "../styles/table.scss";

const TableSection = ({
  data,
  colKey,
  handleClick,
}: {
  data: IPlanetData[];
  colKey: string;
  handleClick: (record: IPlanetData, id?: string) => void;
}) => {
  console.log("data:", data);
  console.log(colKey);

  const customColumns = columns[colKey].map((col: any, index: number) => {
    if (col === "Action") {
      return {
        title: "",
        key: "action",
        width: "10%",
        render: (_: any, record: IPlanetData) => (
          <span
            className="action"
            onClick={(e) => {
              console.log("event", e);
              handleClick(record);
              // e.stopPropagation()
            }}
          >
            <img src={addIcon} /> Create a miner
          </span>
        ),
      };
    }
    if (col === "Name" && colKey === "planets") {
      return {
        title: col,
        dataIndex: col.toLowerCase(),
        key: col,
        width: "5%",
        align: "left",
        render: (_: any, record: IPlanetData) => (
          <span
            onClick={(e) => handleClick(record, record._id)}
            className="planet"
          >
            {record?.name}
          </span>
        ),
      };
    }
    return {
      title: col,
      dataIndex: col.toLowerCase(),
      key: col,
      width: "5%",
      align: "left",
    };
  });
  console.log(customColumns);

  return (
    <Table
      dataSource={data}
      columns={customColumns}
      className="table"
      pagination={{ hideOnSinglePage: true }}
      id="table"
      bordered={false}
      rowKey="_id"
      // loading
    />
  );
};
export default TableSection;
