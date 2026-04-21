import React from "react";
import { Space } from "antd";

const Footer = () => {
  return (
    <div className="footer-title">
      <Space wrap style={{ justifyContent: "end", width: "100%" }}>
        <p>
          © {new Date().getFullYear()} PROJECT <a>DATA MINING</a>.
        </p>
        <p>
          CODED BY <a>SOMEBODY I USED TO KNOW</a>.
        </p>
      </Space>
    </div>
  );
};

export default Footer;
