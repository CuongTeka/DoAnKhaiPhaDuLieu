import React, { useState } from "react";
import "../universal.css";
import { Button, Tooltip, Space } from "antd";
import { Plus } from "lucide-react";

import CreateModal from "./Modal/CreateModal";
import ImageTable from "./Table/ImageTable";
import { InfoCircleOutlined } from "@ant-design/icons";

const ImagePage = () => {
  const [modalCreate, setModalCreate] = useState(false);
  return (
    <div className="container">
      <h1 className="text-center main-title">Images</h1>
      <Space className="space" align="center" wrap>
        <Button
          className="modal-btn"
          onClick={() => setModalCreate(true)}
          variant="outlined"
          color="primary"
        >
          <Plus />
        </Button>
      </Space>

      <ImageTable />

      <CreateModal
        onOpen={modalCreate}
        onCancel={() => setModalCreate(false)}
      />

      {/* <Modal
        title="Upload image"
        open={modalCreate}
        onCancel={() => setModalCreate(false)}
        okText="Upload"
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
            label="Image name"
            name="name"
            hasFeedback
            rules={[{ required: true, message: "Name is needed!" }]}
          >
            <Input placeholder="Aurora" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: true, message: "Image is needed!" }]}
          >
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image Url"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Public ID" name="public_id">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tags"
            hasFeedback
            rules={[{ required: true, message: "Tags is needed" }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label="Folder"
            name="folder"
            hasFeedback
            rules={[{ required: true, message: "Folder is needed!" }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="is_active" label="Hiển thị">
            <Select placeholder="Chọn hiển thị" defaultValue="true">
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default ImagePage;
