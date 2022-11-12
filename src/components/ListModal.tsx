import { createRef, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  ConfigProvider,
  Select,
  InputNumber,
  Table,
} from "antd";
import closeIcon from "../assets/icons/close.svg";
import { FormInstance } from "antd/es/form/Form";
import {
  EMMinerStatus,
  IFormData,
  IMinerData,
  IPlanetData,
  MinerStatus,
} from "../constants/typing";
import React from "react";
import "../styles/modal.scss";
import { columns } from "../constants/const";
import { useMount, useRequest } from "ahooks";
import { getMinerByPlanet } from "../apis";

const ListModal = ({
  onVisible,
  onCancel,
  curPlanet,
}: {
  onVisible: boolean;
  // onCancel: () => void;
  onCancel: () => any;
  curPlanet: IPlanetData;
}) => {
  console.log("onvisible", onVisible);

  const { data } = useRequest(
    async () => await getMinerByPlanet(curPlanet?._id),
    {
      refreshDeps: [curPlanet],
    }
  );

  const formRef = createRef<FormInstance>();

  const handleCancel = (e: React.SyntheticEvent) => {
    console.log("onCancel event", e);
    e.stopPropagation();
    onCancel();
  };

  const customColumns = columns.miners
    .filter((c: string) => c !== "Planet")
    .map((col: any, index: number) => {
      if (col === "Status") {
        return {
          title: col,
          dataIndex: col.toLowerCase(),
          key: col,
          width: "auto",
          align: "left",
          render: (_: any, record: IMinerData) => {
            const statusStr = MinerStatus.find(
              (status) => status.value === record.status
            )?.name;
            return <>{statusStr}</>;
          },
        };
      }

      return {
        title: col,
        dataIndex: /[A-Z]/.test(col.charAt(0)) ? col.toLowerCase() : col,
        key: col,
        width: "auto",
        align: "left",
      };
    });

  const customTable = () => {
    return (
      <div className="listTable">
        <p className="title">List of miners of {curPlanet.name}</p>
        <Table
          dataSource={data}
          columns={customColumns}
          id="table"
          key="name"
          pagination={false}
        />
      </div>
    );
  };

  return (
    <Modal
      title=""
      open={onVisible}
      footer={false}
      closable={false}
      // width={600}
      // centered
      destroyOnClose={true}
      className="modal"
      // getContainer={() => document.querySelector('.main') as HTMLElement}
    >
      <img src={closeIcon} className="closeIcon" onClick={handleCancel} />
      {customTable()}
    </Modal>
  );
};
export default React.memo(ListModal);
