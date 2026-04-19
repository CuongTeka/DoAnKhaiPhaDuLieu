import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Button,
  Space,
  Card,
  notification,
  Avatar,
} from "antd";
import {
  InboxOutlined,
  CloseCircleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { handleUploadApi } from "../../../../apis/imageApi";
import { FileUploader } from "react-drag-drop-files";
// const { Dragger } = Upload;
import "../../universal.css";
import { CSSTransition } from "react-transition-group";
import su47 from "../../../../assets/47.png";

const CreateModal = ({ onOpen, onCancel }) => {
  const [form] = Form.useForm();
  // const [fileList, setFileList] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  // const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [tags, setTags] = useState("");

  const handleFileChange = (file) => {
    setFile(file);
    form.setFieldsValue({ image: file });
  };

  const resetForm = () => {
    form.resetFields();
    setFile(null);
    setTags("");
  };

  const handleFinish = async (values) => {
    if (!file) {
      // messageApi.error("Please upload an image");
      api.info({
        message: `Please upload an image`,
        description: "You are missing the image",
        placement: "bottomRight",
      });
      return;
    }
    // console.log(values.image.file.name);
    // console.log(file.name);
    // const imageFile = values.image.file; // Safely access the file object
    // const imageFile = values.image.file.originFileObj;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", values.name);
    formData.append("tags", values.tags);
    formData.append("folder", values.folder);
    formData.append("is_active", values.is_active);
    setIsUpload(true);

    try {
      const response = await handleUploadApi(formData);
      // console.log(formData);
      if (response.errCode === 0) {
        // messageApi.success(`Image ${file.name} uploaded successfully`);
        api.success({
          message: `Uploaded successfully`,
          description: `Image ${file.name} has been uploaded`,
          placement: "bottomRight",
        });
        // console.log("done");
        form.resetFields();
        setFile(null);
      } else {
        // messageApi.error("Failed to upload image");
        api.error({
          message: `Failed to upload image`,
          description: response.message,
          placement: "bottomRight",
        });
        console.log(response.message);
      }
    } catch (error) {
      // console.error(error);
      // messageApi.error("An error occurred");
      api.error({
        message: `An error occurred`,
        description: error.message,
        placement: "bottomRight",
      });
    } finally {
      setIsUpload(false);
    }
  };

  const definedTags = ["Gear", "Ship", "Resource", "Other"];
  const nationTags = [
    "Eagle Union",
    "Royal Navy",
    "Iron Blood",
    "Iris Libre",
    "Sakura Empire",
    "Dragon Empery",
    "Sardegna Empire",
    "Northern Parliament",
    "Universal",
    "USS",
    "HMS",
    "KMS",
    "IJN",
    "Collab",
    "Atelier Ryza",
    "Hololive",
    "Idolmaster",
    "Iris Orthodoxy",
    "Kizuna AI",
    "Senran Kagura",
    "SSSS",
    "To LoveRu",
    "Venus Vacation",
    "Tempesta",
  ];
  const testTags = [
    {
      name: (
        <Avatar
          src={su47}
          style={{
            filter: "invert(1)",
          }}
        />
      ),
      value: "Eagle Union",
    },
    {
      name: <Avatar src={su47} />,
      value: "Royal Navy",
    },
  ];
  const typeTags = [
    "DD",
    "CL",
    "CA",
    "BB",
    "CV",
    "CVL",
    "BBV",
    "BC",
    "SS",
    "SSV",
    "Torp",
    "SubTorp",
    "Fighter",
    "Dive Bomber",
    "Torp Bomber",
    "Seaplane",
    "AA",
    "AA TF",
    "AUX",
    "ASW",
    "Cargo",
    "Augment",
  ];

  const handleTagClick = (tag) => {
    const currentTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== ""); // Remove empty strings

    if (currentTags.includes(tag)) {
      // If tag is already present, remove it
      const updatedTags = currentTags.filter((t) => t !== tag).join(", ");
      setTags(updatedTags);
      form.setFieldsValue({ tags: updatedTags });
    } else {
      // If tag is not present, add it
      const updatedTags = [...currentTags, tag].join(", ");
      setTags(updatedTags);
      form.setFieldsValue({ tags: updatedTags });
    }
  };

  const isTagActive = (tag) => {
    const currentTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== ""); // Remove empty strings
    return currentTags.includes(tag);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Upload image"
        open={onOpen}
        onCancel={onCancel}
        // onOk={handleFinish}
        // okText="Upload"
        footer={null}
        destroyOnClose={true}
        width={600}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          onFinish={handleFinish}
          autoComplete="off"
          preserve={false}
          initialValues={{ tags }}
        >
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Image is needed!" }]}
          >
            {/* <Dragger
              beforeUpload={() => false}
              accept="image/*"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
                form.setFieldsValue({ image: { file: newFileList[0] } });
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Dragger> */}
            <FileUploader
              handleChange={handleFileChange}
              name="image"
              types={["JPG", "PNG", "JPEG"]}
            >
              <>
                <CSSTransition
                  in={!!file}
                  timeout={300}
                  classNames="file-preview"
                  unmountOnExit
                >
                  <Card className="modal-image-card">
                    <p>File: {file?.name}</p>
                    {file?.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="image"
                      />
                    )}
                  </Card>
                </CSSTransition>

                {!file && (
                  <div className="custom-uploader">
                    <p>
                      <InboxOutlined className="ant-icon" />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                    {/* <p>Support for a single or bulk upload.</p> */}
                    <p>Support single upload only.</p>
                  </div>
                )}
              </>
            </FileUploader>
            {file && (
              <Button
                className="remove-btn"
                type="link"
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                icon={<CloseCircleOutlined />}
              />
            )}
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Input.TextArea
              placeholder="Ship, KMS, CL, Torpboat, ..."
              style={{ resize: "none" }}
            />
          </Form.Item>
          <div>Type:</div>
          <Space.Compact>
            {definedTags.map((tag) => (
              <Button
                key={tag}
                type={isTagActive(tag) ? "primary" : "default"}
                onClick={() => handleTagClick(tag)}
                // style={{ marginRight: 8, marginBottom: 8 }}
              >
                {tag}
              </Button>
            ))}
          </Space.Compact>
          <div>Nation:</div>
          <Space wrap size={0}>
            {nationTags.map((tag) => (
              <Button
                key={tag}
                type={isTagActive(tag) ? "primary" : "default"}
                onClick={() => handleTagClick(tag)}
                style={{ marginRight: 8, marginBottom: 8 }}
              >
                {tag}
              </Button>
            ))}
          </Space>
          <div>Ship/Gear type:</div>
          <Space wrap size={0}>
            {typeTags.map((tag) => (
              <Button
                key={tag}
                type={isTagActive(tag) ? "primary" : "default"}
                onClick={() => handleTagClick(tag)}
                style={{ marginRight: 8, marginBottom: 8 }}
              >
                {tag}
              </Button>
            ))}
          </Space>
          {/* <div>test:</div> */}
          {/* <Space wrap size={0}>
            {testTags.map((tag) => (
              <Button
                key={tag}
                type={isTagActive(tag.value) ? "primary" : "default"}
                onClick={() => handleTagClick(tag.value)}
                style={{ marginRight: 8, marginBottom: 8 }}
              >
                {tag.name}
              </Button>
            ))}
          </Space> */}
          <Form.Item label="Folder" name="folder" initialValue={"gear/cargo"}>
            <Input placeholder="main-folder/sub-folder" />
          </Form.Item>
          <Form.Item name="is_active" label="Is Active" initialValue={true}>
            <Select placeholder="Choose Active">
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit" loading={isUpload}>
                Upload
              </Button>
              <Button variant="outlined" danger onClick={resetForm}>
                Reset Form
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
