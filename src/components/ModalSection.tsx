import { createRef, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  ConfigProvider,
  Select,
  InputNumber,
} from "antd";
import closeIcon from "../assets/icons/close.svg";
import { FormInstance } from "antd/es/form/Form";
import { IFormData, IPlanetData } from "../constants/typing";
import React from "react";
import "../styles/modal.scss";

const ModalSection = ({
  onVisible,
  onSubmit,
  onCancel,
  planetData,
  curPlanet,
}: {
  onVisible: boolean;
  onSubmit: (values: IFormData) => void;
  // onCancel: () => void;
  onCancel: () => any;
  planetData: IPlanetData[];
  curPlanet: IPlanetData;
}) => {
  console.log("onvisible", onVisible);

  const formRef = createRef<FormInstance>();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log("submit");
    e.preventDefault();
    const validate = formRef.current?.validateFields();
    if (validate) {
      const values = formRef.current?.getFieldsValue();
      onSubmit(values);
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onCancel();
  };

  const customForm = () => {
    return (
      <Form
        name="basic"
        ref={formRef}
        autoComplete="off"
        preserve={false}
        initialValues={{ planet: curPlanet._id }}
      >
        <p className="ant-form-title">Create a miner</p>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Planet"
          name="planet"
          rules={[{ required: true, message: "Planet is required" }]}
        >
          <Select
            options={planetData}
            fieldNames={{ label: "name", value: "_id" }}
          />
        </Form.Item>
        <p className="ant-form-title">Assign points</p>
        <div className="grid-row">
          <Form.Item
            label="carryCapacity"
            name="carryCapacity"
            rules={[
              {
                required: true,
                message: "carryCapacity is required",
              },
            ]}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>
          <Form.Item
            label="travelSpeed"
            name="travelSpeed"
            rules={[
              {
                required: true,
                message: "travelSpeed is required",
              },
            ]}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>

          <Form.Item
            label="miningSpeed"
            name="miningSpeed"
            rules={[
              {
                required: true,
                message: "miningSpeed is required",
              },
            ]}
          >
            <InputNumber min={1} max={200} />
          </Form.Item>
        </div>
        <div className="desc">{curPlanet?.minerals}</div>
        <Button className="btn" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    );
  };

  return (
    <Modal
      title=""
      open={onVisible}
      footer={false}
      closable={false}
      width={447}
      // centered
      destroyOnClose={true}
      className="modal"
      // getContainer={() => document.querySelector('.main') as HTMLElement}
    >
      <img src={closeIcon} className="closeIcon" onClick={handleCancel} />
      {customForm()}
    </Modal>
  );
};
export default React.memo(ModalSection);
