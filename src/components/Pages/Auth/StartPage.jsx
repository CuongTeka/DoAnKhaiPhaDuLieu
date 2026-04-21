import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { Button, Space, Alert, Typography, Card, Tag, Spin } from "antd";
import {
  MailOutlined,
  DiscordFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../authContext";
import LoadingPage from "../../Loading";

const { Title, Text } = Typography;

const StartPage = () => {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/system/dashboard");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {isLoggedIn ? (
        <LoadingPage />
      ) : (
        <div className="start-container">
          <div className="signin-bg" />
          <Card>
            <Space
              style={{ justifyContent: "center", width: "100%" }}
              direction="vertical"
            >
              {/* <Alert
                message={
                  <Space direction="vertical" size={0}>
                    <Title level={2} style={{ color: "#DC4446" }}>
                      WARNING !!
                    </Title>
                    <Title underline level={4}>
                      YOU'RE ABOUT TO ACCESS MY PERSONAL PROJECT
                    </Title>
                  </Space>
                }
                description={
                  <>
                    <Space direction="vertical">
                      <p>If you have permission, please proceed to login.</p>
                      <p>Otherwise, don't do anything stupid.</p>
                      <hr />
                      <Space direction="vertical" size={2}>
                        <p>Contact me if needed:</p>
                        <Tag icon={<MailOutlined />} color="#EB493B">
                          cuongteka2711@gmail.com
                        </Tag>
                        <Tag icon={<DiscordFilled />} color="#1676FC">
                          Teka#2506
                        </Tag>
                      </Space>
                    </Space>
                  </>
                }
                type="error"
                // showIcon
              /> */}
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Space>
          </Card>
        </div>
      )}
    </>
  );
};

export default StartPage;
