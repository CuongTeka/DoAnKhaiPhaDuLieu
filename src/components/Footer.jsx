import React from "react";
import { Space } from "antd";

const Footer = () => {
  return (
    <div className="footer-title">
      <Space wrap style={{ justifyContent: "end", width: "100%" }}>
        <p>
          © 2024 PROJECT <a>ARTEMIS ADMINISTRATION</a>.
        </p>
        <p>
          CODED BY <a>TEKA</a>.
        </p>
      </Space>
    </div>
  );
};

export default Footer;
