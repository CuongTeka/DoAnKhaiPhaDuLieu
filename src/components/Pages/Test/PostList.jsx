import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  List,
  Card,
  Image,
  Skeleton,
  Space,
  Avatar,
  Tag,
  Tooltip,
  Typography,
  Modal,
} from "antd";
import "../universal.css";
import "./test.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const renderRole = (role) => {
  if (role === "1") {
    return <Tag color="red">Admin</Tag>;
  } else {
    return <Tag color="green">User</Tag>;
  }
};

const { Text, Title, Paragraph } = Typography;

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        Do something
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        Do something 2
      </a>
    ),
  },
];

const PostList = ({ allPosts }) => {
  // console.log("allPosts in PostList:", allPosts);
  const [visiblePosts, setVisiblePosts] = useState([]); // Load 5 posts initially
  const [hasMore, setHasMore] = useState(true);
  const [rows, setRows] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, 10)); // Load initial posts
    setHasMore(allPosts.length > 10); // Set `hasMore` dynamically
  }, [allPosts]);

  const fetchMorePosts = () => {
    const remainingPosts = allPosts.slice(visiblePosts.length);
    if (remainingPosts.length === 0) {
      setHasMore(false);
      return;
    }
    const nextPosts = remainingPosts.slice(0, 10);
    setVisiblePosts((prevPosts) => [...prevPosts, ...nextPosts]);

    if (visiblePosts.length + nextPosts.length >= allPosts.length) {
      setHasMore(false);
    }
  };
  const handleOpenModal = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={visiblePosts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
        endMessage={
          <p style={{ textAlign: "center" }}>No more posts to show</p>
        }
        style={{ overflow: "hidden" }}
      >
        {visiblePosts.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={visiblePosts}
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
                            title={dayjs(post.createdAt).format("LLLL")}
                            className="cursor"
                          >
                            {dayjs(post.createdAt).fromNow()}
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
                  </Paragraph>
                  {post.images.length > 1 ? (
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
                            style={{
                              aspectRatio: "16 / 9",
                              objectFit: "cover",
                            }}
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
          />
        ) : (
          <Skeleton avatar paragraph={{ rows: 3 }} active />
        )}
      </InfiniteScroll>
      <Modal
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
                <Image.PreviewGroup>
                  <Image
                    src={image.url}
                    alt={image.description || `Image ${index + 1}`}
                    preview={true}
                  />
                </Image.PreviewGroup>
                <p>{image.description}</p>
              </div>
            ))}
            <p>{selectedPost.description}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default PostList;
