import React, { createRef, useState } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';
import addIcon from '../assets/icons/add.svg';
import { columns } from '../constants/const.js';
import closeIcon from '../assets/icons/close.svg';
import { FormInstance } from 'antd/es/form/Form';
import { IFormData } from '../constants/typing';

const ModalSection = ({
  onVisible,
  onSubmit,
  onCancel,
}: {
  onVisible: boolean;
  onSubmit: (values: IFormData) => void
  onCancel: () => void;
}) => {
  console.log('onvisible', onVisible);

  const formRef = createRef<FormInstance>();

  const handleSubmit = () => {
    console.log('submit');
    console.log('values: ', formRef.current?.getFieldsValue());
    const values = formRef.current?.getFieldsValue();
    onSubmit(values);
  };

  const customForm = () => {
    return (
      <Form
        name='basic'
        // form={form}
        ref={formRef}
        autoComplete='off'
      >
        <img src={closeIcon} className='closeIcon' onClick={onCancel} />
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
    );
  };

  return (
    <Modal
      title=''
      open={onVisible}
      footer={false}
      closable={false}
      width={447}
      maskStyle={{ backgroundColor: '#ff0000' }}
    >
      {customForm()}
    </Modal>
  );
};
export default ModalSection;
