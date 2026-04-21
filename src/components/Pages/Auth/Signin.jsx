import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Card,
  notification,
  Alert,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { handleLoginApi } from "../../../services/userService";
import { useAuth } from "../../../authContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/109286012_p1.png";
import "./signin.css";
import LoadingPage from "../../Loading";
notification.config({
  placement: "top",
  stack: 1,
});

const Signin = () => {
  const { isLoggedIn, login, loading } = useAuth();
  const [isloading, setIsLoading] = useState(false);
  const [errMessage, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [isCooldown, setIsCooldown] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm(); //login
  console.log("login status: ", isLoggedIn);
  const onFinish = async (value) => {
    setMessage("");
    setIsLoading(true);
    try {
      let data = await handleLoginApi(value.username, value.pass);
      // console.log(data.message);
      // console.log("token in cookie: ", Cookies.get("token"));
      // console.log("data login response: ", data);
      if (data && data.errCode !== 0) {
        setMessage(data.message);
      }
      if (data && data.errCode === 0) {
        if (data.auth === 1) {
          // Cookies.set("token", data.token, { path: "/" });
          localStorage.setItem("id", data.id);
          login(true);
          navigate("/system/dashboard");
          // window.location.href = "/system/dashboard";
          // setTimeout(() => {
          // }, 3000);
          // console.log("token stored in cookie: ", Cookies.get("token"));
        } else {
          setMessage("Unauthorized access");
        }
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Login failed maybe because yo fat ass forget to start the server",
      );
    } finally {
      // setIsLoading(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // window.location.href = "/system/dashboard";
      navigate("/system/dashboard");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  if (isloading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="signin-bg" />
      <div className="signin-container">
        <Card style={{ width: 400 }} className="signin-card">
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Đăng nhập</h2>
          {errMessage && (
            <Alert
              description={<div style={{ color: "red" }}>{errMessage}</div>}
              type="error"
              showIcon
              style={{
                textAlign: "center",
                marginBottom: "16px",
                color: "red",
              }}
            />
          )}
          <Form
            form={form}
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Tên đăng nhập"
                allowClear
                autoComplete="off"
                autoCorrect="off"
                variant="filled"
              />
            </Form.Item>

            <Form.Item
              name="pass"
              rules={[{ required: true, message: "Nhập mật khẩu!" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                autoComplete="newpassword"
                allowClear
                variant="filled"
              />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item style={{ marginTop: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isloading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Signin;
