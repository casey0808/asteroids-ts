import {
  Modal,
  Table,
} from "antd";
import closeIcon from "../assets/icons/close.svg";
import {
  IMinerData,
  IPlanetData,
  MinerStatus,
} from "../constants/typing";
import React from "react";
import "../styles/modal.scss";
import { columns } from "../constants/const";
import { useRequest } from "ahooks";
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
  const { data, loading } = useRequest(
    async () => !!curPlanet?._id && (await getMinerByPlanet(curPlanet?._id)),
    {
      refreshDeps: [curPlanet],
    }
  );

  const handleCancel = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onCancel();
  };

  const modifiedData =
    !!data &&
    data?.map((each: IMinerData) => {
      const { x, y } = each;
      return {
        ...each,
        position: `(${x ? Math.floor(x) : ''}, ${y ? Math.floor(y) : ''})`,
      };
    });

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
        <>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Table
              dataSource={modifiedData}
              columns={customColumns}
              id="table"
              key="name"
              pagination={false}
            />
          )}
        </>
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
      <img src={closeIcon} className="closeIcon" onClick={handleCancel} alt="closeIcon" />
      {customTable()}
    </Modal>
  );
};
export default React.memo(ListModal);
