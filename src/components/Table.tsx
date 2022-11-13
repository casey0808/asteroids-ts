import React, { useState } from "react";
import { Table } from "antd";
import addIcon from "../assets/icons/add.svg";
import { columns } from "../constants/const";
// import closeIcon from '../assets/icons/close.svg';
import {
  EMColKey,
  IAsteroidData,
  IMinerData,
  IPlanetData,
} from "../constants/typing";
import "../styles/table.scss";
import { getCurrentMiner, getPlanetName } from "../utils";

const TableSection = ({
  dataSource,
  colKey,
  handleClick,
  allData,
}: {
  dataSource: any;
  colKey: string;
  handleClick: (
    record: IPlanetData | IMinerData | IAsteroidData,
    id?: string
  ) => void;
  allData: any;
}) => {
  console.log("colkey:", colKey);

  const customColumns = columns[colKey].map((col: any, index: number) => {
    if (col === "Action") {
      return {
        title: "",
        key: "action",
        width: "auto",
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
    if (col === "Miners" && colKey === "planets") {
      return {
        title: col,
        dataIndex: col.toLowerCase(),
        key: col,
        width: "auto",
        align: "left",
        render: (_: any, record: IPlanetData) => (
          <span
            onClick={(e) => handleClick(record, record._id)}
            className="miners"
          >
            {record?.minerals}
          </span>
        ),
      };
    }
    return {
      title: col,
      dataIndex: /[A-Z]/.test(col.charAt(0)) ? col.toLowerCase() : col,
      key: col,
      width: "max-content",
      align: "left",
    };
  });
  console.log(customColumns);

  if (colKey === EMColKey.MINERS) {
    dataSource = dataSource?.map((each: IMinerData) => {
      return { ...each, planet: getPlanetName(each?.planet, allData?.planets) };
    });
  }

  if (colKey === EMColKey.ASTEROIDS) {
    dataSource = dataSource?.map((each: IAsteroidData) => {
      if (each?.currentMiner) {
        return {
          ...each,
          currentMiner: getCurrentMiner(each?.currentMiner, allData?.miners),
        };
      }
      return each;
    });
  }
  return (
    <Table
      dataSource={dataSource}
      columns={customColumns}
      className="table"
      pagination={false}
      id="table"
      bordered={false}
      rowKey="_id"
      scroll={{ y: "70vh" }}
    />
  );
};
export default TableSection;
