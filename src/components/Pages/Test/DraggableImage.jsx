import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DraggableImage = ({
  image,
  index,
  onRemove,
  onDescriptionChange,
  moveImage,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      cover={
        <img
          src={image.url}
          alt="preview"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <Button
          type="link"
          danger
          onClick={() => onRemove(image.id)}
          icon={<CloseOutlined />}
        />,
        <Button type="link" onClick={() => {}} icon={<CloseOutlined />} />,
      ]}
    >
      <Input
        variant="borderless"
        placeholder="Description"
        value={image.description}
        onChange={(e) => onDescriptionChange(image.id, e.target.value)}
        style={{ height: "120px", resize: "none" }}
      />
    </Card>
  );
};

export default DraggableImage;
