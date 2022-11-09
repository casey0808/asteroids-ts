import { createRef, useState } from 'react';
import { Modal, Form, Input, Button, ConfigProvider } from 'antd';
import closeIcon from '../assets/icons/close.svg';
import { FormInstance } from 'antd/es/form/Form';
import { IFormData } from '../constants/typing';
import React from 'react';
import '../styles/modal.scss'

const ModalSection = ({
  onVisible,
  onSubmit,
  onCancel,
}: {
  onVisible: boolean;
  onSubmit: (values: IFormData) => void;
  // onCancel: () => void;
  onCancel: () => any
}) => {
  console.log('onvisible', onVisible);

  const formRef = createRef<FormInstance>();

  const handleSubmit = () => {
    console.log('submit');
    console.log('values: ', formRef.current?.getFieldsValue());
    const values = formRef.current?.getFieldsValue();
    onSubmit(values);
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    console.log('onCancel event', e);
    e.stopPropagation()
    onCancel();
  }

  const customForm = () => {
    return (
      <Form name='basic' ref={formRef} autoComplete='off' preserve={false}>
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
      // centered
      destroyOnClose={true}
      className="modal"
      // getContainer={() => document.querySelector('.main') as HTMLElement}
    >
      <img src={closeIcon} className='closeIcon' onClick={handleCancel} />
      {customForm()}
    </Modal>
  );
};
export default React.memo(ModalSection);
