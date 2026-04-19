import React from "react";
import st from "../../../assets/star/star.png";
// import bg from "../../../assets/star/star_bg.png";

const gearstar = ({ star = 1, classname = "star" }) => {
  const starsArray = Array.from({ length: star });
  return (
    <div className={classname}>
      {starsArray.map((_, index) => (
        <img
          src={st}
          alt="star"
          width={20}
          height={20}
          style={{
            position: "absolute",
            left: `${index * 10}px`,
            bottom: 0,
            zIndex: star + index,
          }}
        />
      ))}
    </div>
  );
};

export default gearstar;
