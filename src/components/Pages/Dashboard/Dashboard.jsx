import React, { useState } from "react";
import { Button, Modal, Avatar, Space, Typography } from "antd";
// import { useAuth } from "../../../authContext";
import { useNavigate } from "react-router-dom";
import "../universal.css";
import "./dash.css";
import bg from "../../../assets/gearbg/equipment_bg_6.png";
import gear from "../../../assets/50620.png";
import Gearstar from "../../utilities/StarRenderer/gearstar";
import tech from "../../../assets/number/number";
import gearcate from "../../../assets/gearct/aa.png";
import GearIcon from "../GearPage/GearIcon/gearicon";

const Dashboard = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gearArray = Array.from({ length: 6 });
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="container techbg">
        <Space wrap size={16} className="justify-center">
          {gearArray.map((item, index) => (
            <GearIcon
              star={5}
              name="Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount"
              bg="bg-ur"
              onClick={() => setIsModalOpen(true)}
              starClassName="gear-star"
            />
          ))}
          {gearArray.map((item, index) => (
            <GearIcon
              star={4}
              name="Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount"
              bg="bg-ssr"
              onClick={() => setIsModalOpen(true)}
              starClassName="gear-star"
            />
          ))}
          {gearArray.map((item, index) => (
            <GearIcon
              star={3}
              name="Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount"
              bg="bg-sr"
              onClick={() => setIsModalOpen(true)}
              starClassName="gear-star"
            />
          ))}
          {gearArray.map((item, index) => (
            <GearIcon
              star={2}
              name="Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount"
              bg="bg-rare"
              onClick={() => setIsModalOpen(true)}
              starClassName="gear-star"
            />
          ))}
          {gearArray.map((item, index) => (
            <GearIcon
              star={1}
              name="Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount"
              bg="bg-common"
              onClick={() => setIsModalOpen(true)}
              starClassName="gear-star"
            />
          ))}
        </Space>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        height={1000}
        title={
          <>
            <div className="text-center">
              Twin 57mm/L60 Bofors Mle 1951 AA Gun Mount
            </div>
          </>
        }
      >
        <div className="div">
          <img src={bg} alt="bg" style={{ width: "100%", height: "100%" }} />
          <Avatar
            src={gear}
            size={100}
            className="scale-down avt"
            shape="square"
          />

          <div style={{ position: "absolute", bottom: 25, left: 0 }}>
            <img src={gearcate} style={{ width: "65%", height: "65%" }} />
          </div>
          <div className="gear-trail">Short Range</div>

          <div className="slv">
            <Text className="text">+10</Text>
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 0,
            }}
          >
            <img
              src={tech[0]}
              alt="tier"
              style={{ width: "65%", height: "65%" }}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#545355",
          }}
          className="div"
        >
          <Space direction="vertical" size={4} className="space">
            <div className="stat-box">
              <div className="tag">DMG</div>
              <div className="value">132 x 2</div>
            </div>
            <div className="stat-box">
              <div className="tag">FR</div>
              <div className="value">0.78s/wave</div>
            </div>
            <div className="stat-box">
              <div className="tag">AA</div>
              <div className="value">65</div>
            </div>
            <div className="stat-box">
              <div className="tag">Eff. Range</div>
              <div className="value">30</div>
            </div>
            <div className="stat-box">
              <div className="tag">Firing Angle</div>
              <div className="value">360</div>
            </div>
            <div className="stat-box">
              <div className="tag">Faction</div>
              <div className="value">Iris Libre</div>
            </div>
            <div className="stat-box">
              <div className="tag">Damage Modifier</div>
              <div className="value">100%</div>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
