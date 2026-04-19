import React, { useState, useEffect } from "react";
import "../universal.css";
import "./test.css";
import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  List,
  Card,
  Image,
  Avatar,
  Typography,
  Tag,
  Tooltip,
  Dropdown,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  InboxOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { createPostApi, fetchPostsApi } from "../../../apis/postApi";
import dayjs from "dayjs";
import PostList from "./PostList";
import CreatePostModal from "./CreatePostModal";
import TiptapEditor from "./TiptapEditor";

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const Test = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(posts);

  useEffect(() => {
    const loadPosts = async () => {
      // setLoading(true);
      try {
        const { data } = await fetchPostsApi();
        setPosts(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // const handleAddImage = () => {
  //   setImages([...images, { url: "", description: "" }]);
  // };

  // const handleRemoveImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  // const handleImageChange = (index, field, value) => {
  //   const updatedImages = [...images];
  //   updatedImages[index][field] = value;
  //   setImages(updatedImages);
  // };

  // const handleSubmit = async (values) => {
  //   const postData = { ...values, images };
  //   await createPostApi(postData);
  //   form.resetFields();
  //   setImages([]);
  // };

  const handleAddImage = (file) => {
    const newImage = {
      uid: file.uid,
      url: URL.createObjectURL(file),
      file,
      description: "",
    };
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (uid) => {
    setImages(images.filter((image) => image.uid !== uid));
  };

  const handleImageDescriptionChange = (uid, description) => {
    const updatedImages = images.map((image) =>
      image.uid === uid ? { ...image, description } : image
    );
    setImages(updatedImages);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", values.caption);
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file);
        formData.append(`descriptions[${index}]`, image.description);
      });

      await axios.post("/api/createPost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Post created successfully!");
      form.resetFields();
      setImages([]);
      onCancel();
    } catch (error) {
      message.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-container">
      <h1 className="align-center main-title">Test page</h1>
      <h2 className="align-center">posting feature test</h2>
      <div style={{ backgroundColor: "", padding: 10 }}>
        <Button
          // shape="round"
          variant="outlined"
          color="default"
          className="test-btn"
          // loading
          // disabled
        >
          Click Me
        </Button>
      </div>

      <div>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Create Post
        </Button>
        <CreatePostModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
        />
      </div>
      <br />
      <br />
      {/* <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card className="post-card">
              <div className="title justify-between">
                <Space className="space">
                  <Avatar size="large" src={ess} />
                  <Space direction="vertical" size={1}>
                    <h4>Teka</h4>
                    <Text type="secondary">
                      <Tag color="red">Admin</Tag>·{" "}
                      <Tooltip
                        title={moment(post.createdAt).format("LLLL")}
                        className="cursor"
                      >
                        {moment(post.createdAt).fromNow()}
                      </Tooltip>
                    </Text>
                  </Space>
                </Space>
              </div>
              <div className="caption">{post.caption}</div>
              <div className="image-grid-container">
                <Image.PreviewGroup>
                  {post.images.map((image, index) => (
                    <div key={index} className="grid">
                      <Image
                        src={image.url}
                        alt={image.description}
                        className="image-grid"
                      />
                      <p>{image.description}</p>
                    </div>
                  ))}
                </Image.PreviewGroup>
              </div>
            </Card>
          </List.Item>
        )}
      /> */}
      {/* <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card className="post-card">
              <div className="title justify-between">
                <Space className="space">
                  <div>
                    <Avatar size="large" src={post.postBy.avatar} />
                  </div>
                  <Space direction="vertical" size={1}>
                    <h4>{post.postBy.username}</h4>
                    <Text type="secondary">
                      {renderRole(post.postBy.role)} ·{" "}
                      <Tooltip
                        title={moment(post.createdAt).format("LLLL")}
                        className="cursor"
                      >
                        {moment(post.createdAt).fromNow()}
                      </Tooltip>
                    </Text>
                  </Space>
                </Space>
              </div>
              <Paragraph
                ellipsis={{
                  rows,
                  expandable: "collapsible",
                  expanded,
                  onExpand: (_, info) => setExpanded(info.expanded),
                }}
                className="caption"
              >
                {post.caption}
              </Paragraph> */}
      {/* {post.images.length == 2 ? (
                <div
                  className="two-image-container mg-bt"
                  onClick={() => handleOpenModal(post)}
                >
                  <div className="image-container">
                    <Image
                      src={post.images[0].url}
                      alt={post.images[0].description || "Image"}
                      preview={false}
                      className="stacked-image"
                      // style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    />
                  </div>
                  <div className="image-container">
                    <Image
                      src={post.images[1].url}
                      alt={post.images[1].description || "Image"}
                      preview={false}
                      className="stacked-image"
                      // style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ) :  */}
      {/* {post.images.length > 1 ? (
                <div className="image-grid mg-bt">
                  {post.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="image-container"
                      onClick={() => handleOpenModal(post)}
                    >
                      <Image
                        src={image.url}
                        alt={image.description || `Image ${index + 1}`}
                        preview={false}
                        style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                      />
                      {index === 3 && post.images.length > 4 && (
                        <div className="more-overlay">
                          +{post.images.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="single-image-container mg-bt"
                  // onClick={() => handleOpenModal(post)}
                >
                  <Image
                    src={post.images[0].url}
                    alt={post.images[0].description || "Image"}
                    preview={true}
                  />
                </div>
              )}
              <p>{post.description}</p>
            </Card>
          </List.Item>
        )}
      /> */}
      <div id="postlist-container">
        <PostList allPosts={posts} />
      </div>
      {/* <Modal
        open={!!selectedPost}
        title={selectedPost?.caption}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        {selectedPost && (
          <>
            {selectedPost.images.map((image, index) => (
              <div key={index} className="modal-image-container">
                <Image
                  src={image.url}
                  alt={image.description || `Image ${index + 1}`}
                  preview={true}
                />
                <p>{image.description}</p>
              </div>
            ))}
            <p>{selectedPost.description}</p>
          </>
        )}
      </Modal> */}
    </div>
  );
};

export default Test;
