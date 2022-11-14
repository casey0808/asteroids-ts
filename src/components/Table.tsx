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
  MinerStatus,
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

  if (colKey === EMColKey.MINERS) {
    dataSource = dataSource?.map((each: IMinerData) => {
      const { x, y, status, planet } = each;
      return {
        ...each,
        planet: planet.name ?? getPlanetName(each?.planet, allData?.planets),
        position: `(${x ? Math.floor(x) : x}, ${y ? Math.floor(y) : y})`,
        status: MinerStatus.find((s) => s.value === status)?.name,
      };
    });
  }

  if (colKey === EMColKey.ASTEROIDS) {
    dataSource = dataSource?.map((each: IAsteroidData) => {
      if (each?.currentMiner) {
        const { x, y } = each.position;
        return {
          ...each,
          currentMiner: getCurrentMiner(each?.currentMiner, allData?.miners),
          position: `(${x ? Math.floor(x) : x}, ${y ? Math.floor(y) : y})`,
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
      scroll={{ y: "65vh" }}
    />
  );
};
export default TableSection;
