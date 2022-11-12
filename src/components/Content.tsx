import "../styles/content.scss";
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { message, Modal, Tabs } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Table from "./Table";
import { columns, customTabs } from "../constants/const";
import bg from "../assets/images/bg.png";
import { Form, Input, Button } from "antd";
import closeIcon from "../assets/icons/close.svg";
import ModalSection from "./ModalSection";
import {
  EMMinerStatus,
  IColumnData,
  IFormData,
  IMinerData,
  IPlanetData,
} from "../constants/typing";
import { addMiners, baseUrl, getPlanetList } from "../apis";
import { useRequest } from "ahooks";
// import { socket } from '../socket';
import { io } from "socket.io-client";
import { planetData } from "../apis/mockData";
import ListModal from "./ListModal";

const Content = () => {
  const [colKey, setColKey] = useState("planets");
  const [modal, setModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  // const [data, setData] = useState({}) as any;
  const socket = useRef() as any;
  const [curPlanet, setCurPlanet] = useState<IPlanetData>({} as IPlanetData)

  const onTabChange = (key: string) => {
    console.log("key:", key);
    setColKey(key);
  };

  // useEffect(() => {
  //   socket.current = io(baseUrl);
  //   if (socket.current.connected) {
  //     try {
  //       socket.current.on("tick", (data: IColumnData) => {
  //         const { miners, planets, asteroids } = data;
  //         setData({
  //           miners,
  //           planets,
  //           asteroids,
  //         });
  //       });
  //     } catch (e) {
  //       console.log("error", e);
  //     }

  //     setTimeout(() => {
  //       socket.current.disconnect();
  //     }, 10000);
  //   }
  // }, []);

  // useEffect(() => {
  //   socket.on('tick', (res: any) => {
  //     // data = res;
  //     // console.log('tick====>', res);
  //     if (res.currentTick % 100 === 0) {
  //       setData(res);
  //     }
  //   });
  // }, []);
  // console.log("socket data: ", data);

  // const [data, setData] = useState(planetData);

  // useEffect(() => {
  //   const res = getPlanets();
  //   console.log('get data', res);
  // }, [colKey]);

  const { data } = useRequest(async () => await getPlanetList(), {
    refreshDeps: [colKey],
  });

  // console.log('data', data)
  const onTableClick = (record: IPlanetData, id?: string) => {
    console.log("record", record);
    console.log("table click");
    console.log('id', id)
    if (!!id) {
      setListModal(true);
    } else {
      setModal(true);
    }
    setCurPlanet(record);
  };

  const handleSubmit = async (values: IFormData) => {
    console.log("values:", values);
    const planet = planetData.find((planet) => planet._id === values.planet);
    const res = await addMiners({
      ...values,
      x: planet?.position?.x,
      y: planet?.position.y,
      angle: 0,
      status: EMMinerStatus.IDLE,
      minerals: 1,
    });
    console.log("res", res);
    if (!res.message) {
      message.success("The miner was successfully created");
      setModal(false);
    } else {
      message.error({
        // content: res.message.split(".,").map((each: any, i: number) => <div key={i}>{each}</div>),
        content: res._message,
        // duration: 0,
        style: {
          width: "max-content",
          margin: "100px auto",
        },
      });
    }
  };

  const handleCancel = () => {
    console.log("close modal");
    setModal(false);
    setListModal(false);
    Modal.destroyAll();
  };

  return (
    <div className="content">
      <div className="left">
        <div className="tabPane">
          {customTabs.map((tab) => {
            return (
              <div
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className="tab"
              >
                <img src={tab.src} className="icon" />
                <p>{tab.label}</p>
              </div>
            );
          })}
        </div>
        <Table
          data={data || planetData}
          // data={[]}
          colKey={colKey}
          handleClick={(record: IPlanetData, id?: string) => {
            onTableClick(record, id);
          }}
        />
      </div>
      <div className="right">
        <p>250 YEARS</p>
        <img src={bg} className="img" />
      </div>
      <ModalSection
        onVisible={modal}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        planetData={planetData}
        curPlanet={curPlanet}
        key="1"
      />
      <ListModal
        onVisible={listModal}
        onCancel={handleCancel}
        curPlanet={curPlanet}
        key="2"
      />
    </div>
  );
};

export default React.memo(Content);
