import React from "react";
import { Flex, Menu, Avatar, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import essg from "../assets/essegs.png";
import su47 from "../assets/16_su-47.jpg";

import {
  FileImageOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DiscordOutlined,
  HomeOutlined,
  BulbOutlined,
  PushpinOutlined,
  CodeOutlined,
  ApiOutlined,
  CalendarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Ship, House, Anchor, Plane } from "lucide-react";

const item = [
  {
    key: "/system/dashboard",
    label: (
      <Link style={{ textDecoration: "none" }} to="/system/dashboard">
        Dashboard
      </Link>
    ),
    icon: <HomeOutlined size={16} />,
  },
  {
    key: "/system/books",
    label: <Link to="/system/books">Books</Link>,
    icon: <BookOutlined />,
  },
  // {
  //   key: "/system/images",
  //   label: <Link to="/system/images">Images</Link>,
  //   icon: <FileImageOutlined />,
  // },
  // {
  //   key: "/system/ships",
  //   label: <Link to="/system/ships">Ships</Link>,
  //   icon: <Ship size={16} />,
  // },
  // {
  //   key: "/system/gears",
  //   label: <Link to="/system/gears">Gears</Link>,
  //   icon: <Plane size={16} />,
  // },
  // {
  //   key: "/system/test",
  //   label: <Link to="/system/test">Test</Link>,
  //   icon: <CodeOutlined />,
  // },
  // {
  //   key: "/system/api",
  //   label: <Link to="/system/api">API</Link>,
  //   icon: <ApiOutlined />,
  // },
  // {
  //   key: "/system/calendar",
  //   label: <Link to="/system/calendar">Calendar</Link>,
  //   icon: <CalendarOutlined />,
  // },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo" align="center">
          <Avatar size={50} src={su47} className="" />
        </div>
      </Flex>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className="menu-bar"
        items={item}
      />
    </>
  );
};

export default Sidebar;
