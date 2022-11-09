import React, { useState } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';
import addIcon from '../assets/icons/add.svg';
import { columns } from '../constants/const';
import closeIcon from '../assets/icons/close.svg';
import { IPlanetData } from '../constants/typing';

const TableSection = ({
  data,
  colKey,
  onClick,
}: {
  data: IPlanetData[];
  colKey: string;
  onClick: (record: IPlanetData) => void;
}) => {
  console.log('data:', data);
  console.log(colKey);

  // const [modal, setModalOpen] = useState(true);

  // const onClick = (record) => {
  //   console.log(record);
  //   setModalOpen(true);
  // };

  const customColumns = columns[colKey].map((col: any, index: number) => {
    if (col === 'Action') {
      return {
        title: '',
        key: 'action',
        width: '10%',
        render: (_: any, record: IPlanetData) => (
          <span className='action' onClick={() => onClick(record)}>
            <img src={addIcon} /> Create a miner
          </span>
        ),
      };
    }
    return {
      title: col,
      dataIndex: col.toLowerCase(),
      key: col,
      width: '5%',
      align: 'left',
    };
  });
  console.log(customColumns);

  const handleSubmit = () => {
    console.log('submit');
  };

  const closeModal = () => {
    console.log('close modal');
  };

  return (
    <>
      {/* <Modal
        title=''
        open={modal}
        footer={false}
        closable={false}
        width={447}
        onCancel={() => setModalOpen(false)}
        maskStyle={{ backgroundColor: '#ff0000' }}
      >
        <Form
          name='basic'
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <img src={closeIcon} className='closeIcon' onClick={closeModal} />
          <p className='ant-form-title'>Create a miner</p>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: "Please input miner's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Planet'
            name='planet'
            rules={[{ required: true, message: 'Please input planet' }]}
          >
            <Input />
          </Form.Item>
          <p className='ant-form-title'>Assign points</p>
          <div className='grid-row'>
            <Form.Item
              label='carryCapacity'
              name='carryCapacity'
              rules={[
                {
                  required: true,
                  message: "Please input miner's carryCapacity!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='travelSpeed'
              name='travelSpeed'
              rules={[
                {
                  required: true,
                  message: "Please input miner's travelSpeed!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='miningSpeed'
              name='miningSpeed'
              rules={[
                {
                  required: true,
                  message: "Please input miner's miningSpeed!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Button className='btn' onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Modal> */}
      <Table
        dataSource={data}
        columns={customColumns}
        className='table'
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};
export default TableSection;
