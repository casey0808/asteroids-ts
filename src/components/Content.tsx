import '../styles/content.scss';
// import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Modal, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import RocketIcon from '../assets/icons/rocket.svg';
import AsteroidIcon from '../assets/icons/asteroid.svg';
import PlanetIcon from '../assets/icons/planet.svg';
import Table from './Table';
import { createWebSocket, closeWebSocket } from '../websocket.js';
// import fetch from "node-fetch";
import { columns } from '../constants/const';
import bg from '../assets/images/bg.png';
import { Form, Input, Button } from 'antd';
import closeIcon from '../assets/icons/close.svg';
import ModalSection from './ModalSection';
import { IFormData, IPlanetData } from '../constants/typing';
import { getMiners, getPlanets } from '../apis';
import { useRequest } from 'ahooks';

const Content = () => {
  const onTabChange = (key: string) => {
    console.log('key:', key);
    setColKey(key);
  };

  // useEffect(() => {
  //   let url = 'ws://asteroids.dev.mediasia.cn'; //服务端连接的url
  //   createWebSocket(url);
  //   //在组件卸载的时候，关闭连接
  //   return () => {
  //     closeWebSocket();
  //   };
  // });

  const tabs = [
    { label: 'Miners', key: 'miners', src: RocketIcon },
    { label: 'Asteroids', key: 'asteroids', src: AsteroidIcon },
    { label: 'Planet', key: 'planet', src: PlanetIcon },
  ];

  const [colKey, setColKey] = useState('planet');
  const [modal, setModal] = useState(false);
  // const [data, setData] = useState(planetData);

  // useEffect(() => {
  //   const res = getPlanets();
  //   console.log('get data', res);
  // }, [colKey]);

  const { data } = useRequest(async () => await getPlanets(), {
    refreshDeps: [colKey],
  });

  console.log('data', data)

  const onTableClick = (record: any) => {
    console.log(record);
    console.log('table click');
    setModal(true);
  };

  const handleSubmit = (values: IFormData) => {
    console.log('values:', values);
  };

  const handleCancel = () => {
    console.log('close modal');
    setModal(false);
    Modal.destroyAll();
  };

  return (
    <div className='content'>
      <div className='left'>
        <div className='tabPane'>
          {tabs.map((tab) => {
            return (
              <div
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className='tab'
              >
                <img src={tab.src} className='icon' />
                <p>{tab.label}</p>
              </div>
            );
          })}
        </div>
        <Table
          data={data}
          colKey={colKey}
          handleClick={(record: IPlanetData) => {
            onTableClick(record);
          }}
        />
      </div>
      <div className='right'>
        <p>250 YEARS</p>
        <img src={bg} className='img' />
      </div>
      <ModalSection
        onVisible={modal}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default React.memo(Content);
