import "../styles/content.scss";
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { message, Modal, Tabs } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Table from "./Table";
import { columns, customTabs } from "../constants/const";
import bg from "../assets/images/bg.png";
import gridBg from "../assets/images/gridBg.svg";
import { Form, Input, Button } from "antd";
import closeIcon from "../assets/icons/close.svg";
import ModalSection from "./ModalSection";
import {
  EMColKey,
  EMMinerStatus,
  IAsteroidData,
  IColumnData,
  IFormData,
  IMinerData,
  IPlanetData,
} from "../constants/typing";
import {
  addMiners,
  baseUrl,
  getAsteroidList,
  getMinerList,
  getPlanetList,
} from "../apis";
import { useMount, useRequest } from "ahooks";
// import { socket } from '../socket';
import { io } from "socket.io-client";
import { planetData } from "../apis/mockData";
import ListModal from "./ListModal";
import Chart from "./Chart";
import loaderIcon from "../assets/icons/loader.svg";
import { getCustomTabs } from "../utils";

const Content = () => {
  const [colKey, setColKey] = useState("planets");
  const [modal, setModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [data, setData] = useState({}) as any;
  const socket = useRef() as any;
  const [curPlanet, setCurPlanet] = useState<IPlanetData>({} as IPlanetData);

  const onTabChange = (key: string) => {
    console.log("key:", key);
    setColKey(key);
  };

  useEffect(() => {
    socket.current = io(baseUrl);
    if (socket.current.connected) {
      try {
        socket.current.on("tick", (data: IColumnData) => {
          console.log("socket data", data);
          const { miners, asteroids, planets } = data;
          setData({
            ...data,
            [EMColKey.PLANETS]: planets,
            [EMColKey.MINERS]: miners,
            [EMColKey.ASTEROIDS]: asteroids,
          });
        });
      } catch (e) {
        console.log("error", e);
      }
    }
  }, []);

  useMount(async () => {
    const planetRes = await getPlanetList();
    const minerRes = await getMinerList();
    const asteroidsRes = await getAsteroidList();
    setData({
      ...data,
      [EMColKey.PLANETS]: planetRes,
      [EMColKey.MINERS]: minerRes,
      [EMColKey.ASTEROIDS]: asteroidsRes,
    });
  });

  const { loading } = useRequest(
    async () => {
      switch (colKey) {
        case EMColKey.PLANETS:
          const planetRes = await getPlanetList();
          setData({ ...data, [EMColKey.PLANETS]: planetRes });
          break;
        case EMColKey.MINERS:
          const minerRes = await getMinerList();
          setData({ ...data, [EMColKey.MINERS]: minerRes });
          break;
        case EMColKey.ASTEROIDS:
          const asteroidsRes = await getAsteroidList();
          setData({ ...data, [EMColKey.ASTEROIDS]: asteroidsRes });
          break;
      }
    },
    {
      refreshDeps: [colKey],
    }
  );

  const onTableClick = (record: IPlanetData, id?: string) => {
    if (!!id) {
      setListModal(true);
    } else {
      setModal(true);
    }
    setCurPlanet(record);
  };

  const handleSubmit = async (values: IFormData) => {
    const planet = planetData.find((planet) => planet._id === values.planet);
    const res = await addMiners({
      ...values,
      x: planet?.position?.x,
      y: planet?.position.y,
      angle: 0,
      status: EMMinerStatus.IDLE,
      minerals: 1,
    });
    if (!res.message) {
      message.success("The miner was successfully created");
      setModal(false);
    } else {
      message.error({
        content: res._message,
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
          {getCustomTabs(colKey).map((tab) => {
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
        <div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Table
              dataSource={data?.[colKey]}
              allData={data}
              colKey={colKey}
              handleClick={(record: any, id?: string) => {
                onTableClick(record, id);
              }}
            />
          )}
        </div>
      </div>
      <div className="right">
        <p>250 YEARS</p>
        {/* <img src={gridBg} className="img" /> */}
        <Chart data={data} />
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
