import React, { useState, useEffect } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { Button, Typography, Dropdown, notification, Avatar } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useAuth } from "../authContext";
import ess from "../assets/essegs.png";
import { handleGetUserApi } from "../apis/userApi";
import Cookie from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    // setLoading(true);
    try {
      const { data } = await handleGetUserApi(Cookie.get("id"));
      setUser(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onLogout = async () => {
    logout();
    navigate("/login");
  };

  const items = [
    {
      key: "changepass",
      label: (
        <p
          onClick={() => {
            console.log("changepass");
          }}
        >
          <SettingOutlined /> Change password
        </p>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      danger: true,
      label: (
        <>
          <p onClick={onLogout}>
            <LogoutOutlined /> Logout
          </p>
        </>
      ), // Logout action
    },
  ];

  return (
    <>
      <div
        style={{
          textAlign: "end",
        }}
      >
        {/* <Button
          size="large"
          color="default"
          shape="circle"
          variant="filled"
          onClick={() => {
            navigate("/login");
          }}
          icon={<UserOutlined className="icon-lg" />}
          className="header-icon"
        />
        <Button
          size="large"
          color="default"
          shape="circle"
          variant="filled"
          onClick={() => {
            navigate("/register");
          }}
          icon={<UserOutlined className="icon-lg" />}
          className="header-icon"
        /> */}
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            size="large"
            type="text"
            shape="round"
            className="header-icon"
            icon={<Avatar src={user.avatar} />}
          >
            {user.username || "Guest"}{" "}
            {/* {isAdmin ? (
              <SafetyCertificateOutlined style={{ color: "green" }} />
            ) : (
              ""
            )} */}
          </Button>
        </Dropdown>
        {/* <Typography.Text>
          Welcome: {localStorage.getItem("name")}
        </Typography.Text> */}
      </div>
    </>
  );
};

export default Header;
