import React, { useState, useEffect } from "react";
import "../universal.css";
import { Button, Tooltip, Space, Table, Avatar, Typography } from "antd";
import { Plus } from "lucide-react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { handleGetAllBookApi } from "../../../apis/bookApi";
import Highlighter from "react-highlight-words";

const { Text } = Typography;

const Book = () => {
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    fetchBookData();
  }, []);
  const fetchBookData = async () => {
    setLoading(true);
    try {
      // const imgs = await handleGetImageApi();
      const boks = await handleGetAllBookApi();
      if (boks && boks.errCode === 0) {
        setBookData(boks.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ISBN",
      dataIndex: "ISBN",
      key: "ISBN",
      render: (record) => (
        <Text
          key={record._id}
          copyable={{ text: record._id, tooltips: [record._id, "copied"] }}
        />
      ),
      sorter: (a, b) => a._id.localeCompare(b._id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Book-Title",
      dataIndex: "Book-Title",
      key: "Book-Title",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Book-Author",
      dataIndex: "Book-Author",
      key: "Book-Author",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Year-Of-Publication",
      dataIndex: "Year-Of-Publication",
      key: "Year-Of-Publication",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Publisher",
      dataIndex: "Publisher",
      key: "Publisher",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Image-URL-M",
      dataIndex: "Image-URL-M",
      key: "Image-URL-M",
      render: (text) => (
        <Space key={text}>
          {/* <img
            src={cld.image(text).toURL()}
            alt="dsaad"
            width={80}
            height={80}
          /> */}
          <Avatar
            src={text}
            alt={text}
            shape="square"
            size={64}
            className="scale-down"
          />
        </Space>
      ),
      sorter: (a, b) => a.public_id.localeCompare(b.public_id),
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div className="container">
      <h1 className="text-center main-title">Books</h1>
      <Space className="space" align="center" wrap>
        <Button
          className="modal-btn"
          onClick={() => {}}
          variant="outlined"
          color="primary"
        >
          <Plus />
        </Button>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        wrap
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={bookData}
          // scroll={{ x: "max-content", y: 600 }}
          // pagination={
          //   isSearch
          //     ? null
          //     : {
          //         current: page,
          //         pageSize: limit,
          //         total: total,
          //         showSizeChanger: false,
          //       }
          // }
          // onChange={handleTableChange}
          rowClassName={(record, index) => (index % 2 === 0 ? "" : "row-dark")}
          style={{
            fontSize: "14px",
          }}
          loading={loading}
        />
      </Space>
    </div>
  );
};

export default Book;
