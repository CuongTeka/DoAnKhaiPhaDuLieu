import React, { useState } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Space,
  Avatar,
  Tooltip,
  Typography,
  Modal,
  Card,
  Form,
  Input,
  Select,
  Drawer,
  Row,
  Col,
  DatePicker,
} from "antd";
import { Calendar, Rows2 } from "lucide-react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "../universal.css";
import "./calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
const localizer = dayjsLocalizer(dayjs);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const { Text } = Typography;

const calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const editOn = () => {
    setEditMode(true);
  };
  const editOff = () => {
    setEditMode(false);
  };
  const [eventss, setEventss] = useState([
    {
      title: "Fritz Rumey & Z-52 event",
      type: "major",
      start: new Date(2024, 11, 19),
      end: new Date(2025, 0, 2),
      description: "This is a major event happening in the evening.",
    },
    {
      title: "Yorktown II rerun & Kronstadt perma",
      // title: "event 2",
      type: "rerun",
      start: new Date(2025, 0, 9, 22, 0),
      end: new Date(2025, 0, 16, 14, 0),
      description: "Hvar lestgo.",
    },
  ]);
  const events = [
    {
      title: "Fritz Rumey & Z-52 event",
      // title: "event 1",
      type: "major",
      start: new Date(2024, 11, 19), // January 8, 2025
      end: new Date(2025, 0, 2), // January 16, 2025
      description: [
        "This is a major event happening in the evening.",
        {
          title: "Key Points:",
          listType: "ol",
          items: [
            "Introduction to the event",
            "Discussion of major topics",
            {
              title: "Details:",
              listType: "ul",
              items: [
                "Prepare documents",
                "Bring a laptop",
                "Contact organizer if needed",
              ],
            },
            "Q&A session",
          ],
        },
      ],
      // allDay: true,
    },
  ];
  const eventPropGetter = (event) => {
    if (event.type === "major") {
      return {
        style: {
          backgroundColor: "#ffeeba",
          color: "#856404",
          borderRadius: "5px",
          border: "1px solid #f5c06a",
        },
      };
    }
    if (event.type === "mini") {
      return {
        style: {
          backgroundColor: "#f8d7da", // Light red
          color: "#721c24", // Dark red
          border: "1px solid #f5c6cb",
          borderRadius: "5px",
        },
      };
    }
    if (event.type === "rerun") {
      return {
        style: {
          backgroundColor: "#005f73", // Teal
          color: "#e3f2fd", // Pale blue
          border: "1px solid #004c5e",
          borderRadius: "5px",
        },
      };
    }
    return {
      style: {
        backgroundColor: "#d9edf7",
        color: "#31708f",
        borderRadius: "5px",
        border: "1px solidrgb(0, 198, 237)",
      },
    };
  };
  const EventComponent = ({ event }) => {
    return (
      <div
        style={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        <Tooltip title={event.title} color="green">
          <strong>{event.title}</strong>
        </Tooltip>
      </div>
    );
  };
  const messages = {
    today: "Hôm nay",
    previous: "<",
    next: ">",
    month: "Tháng",
    week: "Tuần",
    day: "Ngày",
    agenda: "Lịch trình",
    noEventsInRange: "Không có sự kiện",
    date: "Ngày",
    time: "Thời gian",
    event: "Sự kiện",
    allDay: "Cả ngày",
  };

  const CustomToolbar = (toolbar) => {
    // Format the date in "DD/MM/YYYY"
    const formattedDate = dayjs(toolbar.date).format("LL");
    const goToView = (view) => {
      toolbar.onView(view); // Change the view
    };

    return (
      <Space
        // className="space"
        direction="horizontal"
        size={12}
        wrap
        style={{ justifyContent: "space-evenly" }}
      >
        <Space size={12}>
          <Button
            onClick={() => toolbar.onNavigate("PREV")}
            type="text"
            size="small"
          >
            <CaretLeftOutlined />
          </Button>
          <Button onClick={() => toolbar.onNavigate("TODAY")} type="primary">
            Hôm nay
          </Button>
          <Button
            onClick={() => toolbar.onNavigate("NEXT")}
            type="text"
            size="small"
          >
            <CaretRightOutlined />
          </Button>
        </Space>
        <span className="rbc-toolbar-label bold-white">{formattedDate}</span>
        <Space size={20}>
          <Tooltip title="Tháng">
            <Button
              className={toolbar.view === "month" ? "active-view" : ""}
              onClick={() => goToView("month")}
              shape="circle"
              type="text"
            >
              <Calendar size={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Lịch trình">
            <Button
              className={toolbar.view === "agenda" ? "active-view" : ""}
              onClick={() => goToView("agenda")}
              shape="circle"
              type="text"
            >
              <Rows2 size={20} />
            </Button>
          </Tooltip>
        </Space>
      </Space>
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the clicked event
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Clear the selected event
    setIsModalOpen(false); // Close the modal
  };

  const renderDescription = (description) => {
    return description.map((item, index) => {
      if (typeof item === "string") {
        return <p key={index}>{item}</p>;
      } else if (item.items) {
        const ListTag = item.listType === "ol" ? "ol" : "ul";
        return (
          <div key={index}>
            {item.title && <strong>{item.title}</strong>}
            <ListTag className="list">
              {item.items.map((subItem, subIndex) =>
                typeof subItem === "string" ? (
                  <li key={subIndex}>{subItem}</li>
                ) : (
                  renderDescription([subItem])
                )
              )}
            </ListTag>
          </div>
        );
      }
      return null;
    });
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvents = eventss.map((existingEvent) =>
      existingEvent === event ? { ...event, start, end } : existingEvent
    );
    setEventss(updatedEvents);
  };

  const resizeEvent = ({ event, start, end }) => {
    const updatedEvents = eventss.map((existingEvent) =>
      existingEvent === event ? { ...event, start, end } : existingEvent
    );
    setEventss(updatedEvents);
  };
  return (
    <>
      <div className="container techbg" style={{ display: "flex" }}>
        <Space className="justify-center space">
          <Space direction="vertical">
            <Space>
              <Button
                type="primary"
                onClick={showDrawer}
                icon={<PlusOutlined />}
              >
                New account
              </Button>
              <Button
                color="primary"
                variant={isEditMode ? "solid" : "outlined"}
                onClick={isEditMode ? editOff : editOn}
                icon={<EditOutlined />}
              />
            </Space>
            {isEditMode ? (
              <div
                style={{
                  height: isMobile ? "50vh" : "80vh",
                  width: isMobile ? "50vh" : "80vh",
                }}
              >
                <DragAndDropCalendar
                  localizer={localizer}
                  events={eventss}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                  views={["month", "agenda"]}
                  resizable
                  draggableAccessor={() => true}
                  style={{ height: "80vh" }}
                  popup
                  messages={messages}
                  eventPropGetter={eventPropGetter}
                  // onSelectEvent={handleEventClick}
                  components={{
                    // event: EventComponent,
                    toolbar: CustomToolbar,
                  }}
                  onEventDrop={moveEvent}
                  onEventResize={resizeEvent}
                />
              </div>
            ) : (
              <div
                style={{
                  height: isMobile ? "50vh" : "80vh",
                  width: isMobile ? "50vh" : "80vh",
                }}
              >
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                  // views={["month", "week", "day", "agenda"]}
                  views={["month", "agenda"]}
                  resizable
                  style={{ height: "80vh" }}
                  // className="calendar-height"
                  popup // Enable popup for overlapping events
                  eventPropGetter={eventPropGetter}
                  components={{
                    event: EventComponent, // Use custom event renderer
                    toolbar: CustomToolbar,
                  }}
                  messages={messages}
                  tooltipAccessor={null}
                  onSelectEvent={handleEventClick}
                />
              </div>
            )}
          </Space>
        </Space>
      </div>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: "Please choose the approver",
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  locale={localizer}
                  showTime
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Modal
        title={selectedEvent?.title}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
      >
        <p>
          <strong>Type:</strong> {selectedEvent?.type}
        </p>
        <p>
          <strong>Start:</strong>{" "}
          {dayjs(selectedEvent?.start).format("DD/MM/YYYY HH:mm")}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {dayjs(selectedEvent?.end).format("DD/MM/YYYY HH:mm")}
        </p>
        <div>
          <strong>Description:</strong>
          {selectedEvent?.description &&
            renderDescription(selectedEvent.description)}
        </div>
      </Modal>
    </>
  );
};

export default calendar;
