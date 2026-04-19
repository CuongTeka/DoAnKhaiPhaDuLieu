import React, { useState } from "react";
import "../universal.css";
import { Button, Modal, Form, Input, Select } from "antd";
import { Plus } from "lucide-react";

const Ships = () => {
  const [form] = Form.useForm();
  const [modalCreate, setModalCreate] = useState(false);
  return (
    <div className="container">
      <h1 className="align-center main-title">SHIPS</h1>
      <Button
        style={{ width: "50px", height: "50px", borderRadius: "1rem" }}
        onClick={() => setModalCreate(true)}
      >
        <Plus />
      </Button>
      <Modal
        title="Add ship"
        open={modalCreate}
        onCancel={() => setModalCreate(false)}
        okText="Add"
        destroyOnClose={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={() => {}}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="Ship name"
            name="name"
            hasFeedback
            rules={[{ required: true, message: "Ship name is needed!" }]}
          >
            <Input placeholder="Aurora" />
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Danh mục"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="653c5f91eee1ad0711267a15">Bánh mì</Option>
              <Option value="653c5f91eee1ad0711267a16">Thức uống</Option>
              <Option value="653c5f91eee1ad0711267a17">Món ăn vặt</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chi tiết" name="detail">
            <Input.TextArea
              showCount
              maxLength={600}
              placeholder="Chi tiết về sản phẩm..."
            />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="price"
            hasFeedback
            rules={[
              { required: true, message: "Đơn giá không được để trống!" },
              {
                pattern: /^[0-9]+(\.[0-9]{1,2})?/,
                message: "Vui lòng nhập giá hợp lý",
              },
            ]}
          >
            <Input placeholder="vd: 20000" />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            name="discount"
            hasFeedback
            rules={[
              { required: true, message: "Giảm giá không được để trống!" },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                max: 100,
                message: "Không thể giảm giá quá 100%",
              },
              {
                transform: (value) => Number(value), // Convert the value to a number
                type: "number",
                min: 0,
                message: "Không thể nhập số âm",
              },
              {
                transform: (value) => Number(value),
                type: "number",
                message: "Vui lòng nhập số!",
              },
            ]}
          >
            <Input placeholder="vd: 10" />
          </Form.Item>
          {/* <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Vui lòng cho hình ảnh vào!" }]}
          >
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
              customRequest={customRequest}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                maxCount: 1,
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}
          <Form.Item name="is_active" label="Hiển thị">
            <Select placeholder="Chọn hiển thị" defaultValue="true">
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Ships;
