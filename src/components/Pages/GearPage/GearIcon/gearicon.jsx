import React from "react";
import gear from "../../../../assets/50620.png";
import Gearstar from "../../../utilities/StarRenderer/gearstar";
import { Avatar, Typography } from "antd";

const gearicon = ({
  star = 1,
  name = "untitled",
  gearSize = 80,
  bg = "bg-common",
  onClick = () => {},
  starClassName = "star",
  gearIcon = gear,
}) => {
  const { Text } = Typography;
  return (
    <div className="gear-container">
      <div onClick={onClick} className={`${bg} gear-container-inner`}>
        <div className="gear-container-inner-inner">
          <Avatar
            src={gearIcon}
            size={gearSize}
            className="scale-down avt"
            shape="square"
          />
        </div>
        <Gearstar star={star} classname={starClassName} />
      </div>
      <Text className="text-break gear-text">{name}</Text>
    </div>
  );
};

export default gearicon;
