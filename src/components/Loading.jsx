import React, { useEffect } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "../App.css";

const Loading = ({ redirectPath = "/", timeout = 4000 }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectPath);
    }, timeout);
    return () => clearTimeout(timer);
  }, [redirectPath, timeout]);

  return (
    <div className="loading">
      <Spin
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    </div>
  );
};

export default Loading;
