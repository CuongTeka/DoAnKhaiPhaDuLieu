import React, { useState, useEffect } from "react";
import {
  Table,
  Switch,
  Space,
  Popconfirm,
  Button,
  Typography,
  Tag,
  Modal,
  message,
  Input,
  Select,
  Avatar,
} from "antd";
import { Cloudinary } from "@cloudinary/url-gen";
import { Trash2, PenSquare } from "lucide-react";
import Highlighter from "react-highlight-words";
import {
  ExportOutlined,
  TagOutlined,
  CalendarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
// import moment from "moment";
// import "moment/dist/locale/vi";
// moment.locale("vi");
import dayjs from "dayjs";
import {
  handleDeleteImageApi,
  handleGetImageLimitApi,
  changeActive,
  handleGetImageByNameApi,
} from "../../../../apis/imageApi";
import "../../universal.css";

const { Text } = Typography;
const { Search } = Input;

const ImageTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [imageData, setImageData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  // const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const limit = 10;
  const [modalTag, setModalTag] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "alvnguide",
    },
    url: {
      secure: true,
    },
  });

  useEffect(() => {
    fetchImageData();
  }, [page, folders]);

  const fetchImageData = async () => {
    setLoading(true);
    try {
      // const imgs = await handleGetImageApi();
      const imgs = await handleGetImageLimitApi(folders, page, limit);
      if (imgs && imgs.errCode === 0) {
        setImageData(imgs.data);
        setTotal(imgs.total);
        let totalStorageBytes = imgs.storage.reduce((sum, image) => {
          return sum + parseInt(image.bytes, 10);
        }, 0);
        // Convert bytes to gigabytes
        setTotalStorage(totalStorageBytes / (1024 * 1024 * 1024));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchImage = async (name) => {
    setOnSearch(true);
    setIsSearch(true);
    setSearchText(name);
    if (!name) {
      setIsSearch(false);
    }
    try {
      const imgs = await handleGetImageByNameApi(name);
      if (imgs && imgs.errCode === 0) {
        // setImageData(imgs.data);
        setSearchData(imgs.data);
      } else {
        setImageData([]);
        setSearchData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setOnSearch(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
  };

  const handleSwitchChange = async (id, checked) => {
    try {
      const data = { is_active: checked };
      const active = await changeActive(id, data);
      if (active && active.errCode === 0) {
        messageApi.success("Đổi hiển thị thành công");
      } else {
        messageApi.error("Đổi hiển thị thất bại:" + active.message);
      }
    } catch (error) {
      messageApi.error(error);
      console.error("Lỗi:", error);
    }
  };

  const deleteImage = async (id) => {
    setDeleting(true);
    try {
      await handleDeleteImageApi(id);
      // messageApi.success("successed");
    } catch (err) {
      messageApi.error(err);
    } finally {
      setDeleting(false);
      fetchImageData();
    }
  };

  const folderOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "ship",
      label: "Ship",
    },
    {
      value: "gear",
      label: "Gear",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Image URL",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => (
        <>
          <Space size={12} key={text}>
            <Text
              key={`${text}-text`}
              copyable={{ text: text, tooltips: [text, "copied"] }}
            />
            <a
              key={`${text}-link`}
              target="_blank"
              rel="noopener noreferrer"
              href={text}
            >
              <ExportOutlined />
            </a>
          </Space>
        </>
      ),
      sorter: (a, b) => a.imageUrl.localeCompare(b.imageUrl),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Public ID",
      dataIndex: "public_id",
      key: "public_id",
      render: (text) => (
        <Space key={text}>
          <Text
            key={`${text}-publicIdText`}
            copyable={{
              text: text,
              tooltips: [text, "copied"],
            }}
          />
          {/* <img
            src={cld.image(text).toURL()}
            alt="dsaad"
            width={80}
            height={80}
          /> */}
          <Avatar
            src={cld.image(text).toURL()}
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
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (text, record) => (
        <>
          <Button
            className="modal-btn"
            onClick={() => {
              setSelectedTags(record.tags);
              setModalTag(true);
            }}
            type="text"
            icon={<TagOutlined />}
          />
        </>
      ),
      sorter: (a, b) => a.tags - b.tags,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Folder",
      dataIndex: "folder",
      key: "folder",
      sorter: (a, b) => a.folder - b.folder,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Dates",
      key: "dates",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedDates({
              dateCreated: record.createdAt,
              dateUpdated: record.updatedAt,
            });
            setModalVisible(true);
          }}
          type="primary"
          icon={<CalendarOutlined />}
        >
          View Dates
        </Button>
      ),
    },
    //#region
    // {
    //   title: "Date Created",
    //   dataIndex: "date_created",
    //   key: "date_created",
    //   render: (text) =>
    //     new Date(text).toLocaleDateString("en-GB", {
    //       day: "2-digit",
    //       month: "2-digit",
    //       year: "numeric",
    //     }),
    //   sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   title: "Date Updated",
    //   dataIndex: "date_updated",
    //   key: "date_updated",
    //   render: (text) =>
    //     new Date(text).toLocaleDateString("en-GB", {
    //       day: "2-digit",
    //       month: "2-digit",
    //       year: "numeric",
    //     }),
    //   sorter: (a, b) => new Date(a.date_updated) - new Date(b.date_updated),
    //   sortDirections: ["descend", "ascend"],
    // },
    //#endregion
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      // render: (isActive) => (
      //   <span style={{ color: isActive ? "green" : "red" }}>
      //     {isActive ? "True" : "False"}
      //   </span>
      // ),
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleSwitchChange(record._id, checked)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space.Compact key={record._id}>
          <Popconfirm
            title="Xóa"
            description="Bạn có chắc muốn xóa ?"
            placement="right"
            onConfirm={() => deleteImage(record._id)}
            // onCancel={() => message.info("Đã hủy")}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              key={`${record._id}-delete`}
              // disabled={isDeleting}
              type="text"
              style={{ color: "red" }}
            >
              <Trash2 size={20} />
            </Button>
          </Popconfirm>
          {/* <Button
            // onClick={() => handleUpdateProductForForm(record._id)}
            type="text"
          >
            <PenSquare size={20} />
          </Button> */}
        </Space.Compact>
      ),
      width: 100,
    },
  ];

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setFolders(value);
    setPage(1);
  };

  return (
    <>
      {contextHolder}
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        wrap
      >
        <Space>
          <Search
            placeholder="Search by name"
            className="ant-search-btn"
            enterButton
            size="large"
            variant="filled"
            allowClear
            onSearch={searchImage}
            onClear={() => {
              fetchImageData();
              setSearchText("");
              setIsSearch(false);
              setSearchData([]);
            }}
            loading={onSearch}
          />
          <Select
            defaultValue="all"
            placeholder="Filter folder"
            style={{
              width: 120,
            }}
            size="large"
            variant="filled"
            options={folderOptions}
            onChange={handleChange}
          />
        </Space>
        <Space>
          <Button type="text" shape="round" variant="filled" color="default">
            Total images: {total}
          </Button>
          <Button type="text" shape="round" variant="filled" color="default">
            Storage: {totalStorage.toFixed(3)} GB / 10 GB
          </Button>
          <Button
            icon={<ReloadOutlined />}
            shape="circle"
            onClick={fetchImageData}
          />
        </Space>
      </Space>
      <br />
      <br />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={isSearch ? searchData : imageData}
        // scroll={{ x: "max-content", y: 600 }}
        pagination={
          isSearch
            ? null
            : {
                current: page,
                pageSize: limit,
                total: total,
                showSizeChanger: false,
              }
        }
        onChange={handleTableChange}
        rowClassName={(record, index) => (index % 2 === 0 ? "" : "row-dark")}
        style={{
          fontSize: "14px",
        }}
        loading={loading}
      />
      <Modal
        title="Tags"
        open={modalTag}
        onCancel={() => setModalTag(false)}
        footer={null}
        destroyOnClose={true}
      >
        {selectedTags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </Modal>
      <Modal
        title="Dates Information"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <p>
          <strong>Date Created: </strong>
          {/* {new Date(selectedDates.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} */}
          {dayjs(selectedDates.dateCreated).format("LLLL")}
        </p>
        <p>
          <strong>Date Updated: </strong>
          {/* {new Date(selectedDates.updatedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} */}
          {dayjs(selectedDates.dateUpdated).format("LLLL")}
        </p>
      </Modal>
    </>
  );
};

export default ImageTable;
