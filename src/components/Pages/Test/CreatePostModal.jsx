import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Card,
  Row,
  Col,
  message,
  Space,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  InboxOutlined,
  CloseOutlined,
  UploadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { MantineProvider } from "@mantine/core";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import DraggableImage from "./DraggableImage";
import { v4 as uuidv4 } from "uuid";
import SparkMD5 from "spark-md5";
import TiptapEditor from "./TiptapEditor";

const DraggableImage = ({
  image,
  index,
  onRemove,
  onDescriptionChange,
  moveImage,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // Only proceed if the item is being dragged
      if (monitor.isOver({ shallow: true })) {
        moveImage(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className="image-card"
      cover={
        <img
          src={image.url}
          alt="preview"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      }
      actions={[
        <Button
          type="text"
          danger
          onClick={() => onRemove(image.id)}
          icon={<CloseOutlined />}
        />,
      ]}
    >
      <Input.TextArea
        placeholder="Description"
        variant="filled"
        value={image.description}
        onChange={(e) => onDescriptionChange(image.id, e.target.value)}
        style={{ height: "80px", resize: "none" }}
      />
    </Card>
  );
};

const { TextArea } = Input;
const { Dragger } = Upload;

const CreatePostModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFileHashes, setUploadedFileHashes] = useState(new Set());
  const [uploadedFileUids, setUploadedFileUids] = useState(new Set());
  const [mode, setMode] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleAddImages = (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: uuidv4(), // Generate a unique ID for each image
      url: URL.createObjectURL(file), // Generate a preview URL
      file, // Store the file object for later upload
      description: "", // Add a description field
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      const newImage = {
        id: uuidv4(), // Generate a unique ID for the image
        url: imageUrl, // Use the provided URL
        file: null, // No file object for URL-based images
        description: "", // Add a description field
      };
      setImages((prevImages) => [...prevImages, newImage]);
      setImageUrl(""); // Clear the input field
    }
  };

  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleImageDescriptionChange = (id, description) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, description } : image
    );
    setImages(updatedImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      console.log("Caption", caption);

      formData.append("caption", caption);

      images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        } else {
          formData.append(`imageUrls[${index}]`, image.url);
        }
        formData.append(`descriptions[${index}]`, image.description);
      });
      console.log("form", formData);
      // await axios.post("/api/createPost", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // message.success("Post created successfully!");
      form.resetFields();
      setCaption("");
      setImages([]);
      onCancel();
    } catch (error) {
      message.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  // Log images to the console
  useEffect(() => {
    // console.log("Images:", images);
    console.log("Caption", caption);
  }, [images, caption]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <Modal
      title={
        <div className="title justify-between">
          <Space className="space">
            <Avatar size="large" />
            <Space size={1}>
              <h4>Teka</h4>
            </Space>
          </Space>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      destroyOnClose
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          // label="Caption"
          name="caption"
          // rules={[{ required: true, message: "Please enter a caption!" }]}
        >
          <TiptapEditor value={caption} onChange={setCaption} />
        </Form.Item>

        <Form.Item label="Images">
          <Button
            type={mode === "upload" ? "primary" : "default"}
            icon={<UploadOutlined />}
            onClick={() => setMode("upload")}
            style={{ marginRight: 8 }}
          >
            Upload Image
          </Button>
          <Button
            type={mode === "url" ? "primary" : "default"}
            icon={<LinkOutlined />}
            onClick={() => setMode("url")}
          >
            Use Image URL
          </Button>
          {mode === "upload" ? (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleAddImages(e.target.files)}
                style={{ display: "none" }} // Hide the default file input
                ref={fileInputRef} // Add a ref to the file input
              />
              <Button
                type="dashed"
                icon={<InboxOutlined />}
                style={{ width: "100%", marginTop: 16 }}
                onClick={() => fileInputRef.current.click()} // Trigger the file input on button click
              >
                Click or drag images to upload
              </Button>
            </>
          ) : (
            <Input
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ marginTop: 16 }}
              addonAfter={
                <Button type="primary" onClick={handleAddImageUrl}>
                  Add
                </Button>
              }
            />
          )}

          <DndProvider backend={HTML5Backend}>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              {images.map((image, index) => (
                <Col key={image.id} xs={24} sm={12} md={8} lg={8}>
                  <DraggableImage
                    image={image}
                    index={index}
                    onRemove={handleRemoveImage}
                    onDescriptionChange={handleImageDescriptionChange}
                    moveImage={moveImage}
                  />
                </Col>
              ))}
            </Row>
          </DndProvider>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
