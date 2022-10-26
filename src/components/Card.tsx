import React, { useState } from "react";
import { Coordinates, ListItem } from "../types";

interface CardProps {
  item: ListItem;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  onDragEnd: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  setCoordinates: (data: Coordinates) => void;
}
const Card: React.FC<CardProps> = ({
  item,
  setIsUpdating,
  onDragEnd,
  onDragStart,
  setCoordinates,
  onDragEnter,
}) => {
  const [drag, setDrag] = useState({
    active: false,
    x: NaN,
    y: NaN,
  });

  const boxStyle = {
    width: `${item.x}px`,
    height: `${item.y}px`,
  };

  const startResize = (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsUpdating(true);
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e :React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(+x - e.clientX);
      const yDiff = Math.abs(+y - e.clientY);
      const newW: number = +x > e.clientX ? item.x - xDiff : item.x + xDiff;
      const newH: number = +y < e.clientY ? item.y + yDiff : item.y - yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setCoordinates({ w: newW, h: newH });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
    setIsUpdating(false);
  };

  return (
    <div onMouseMove={resizeFrame} onMouseUp={stopResize}>
      <div
        className="card"
        onDragStart={(e) => onDragStart(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={onDragEnd}
        draggable
      >
        <div className="box" style={boxStyle}>
          {item.label}
        </div>
      </div>
      <button className="dragger" onMouseDown={startResize}></button>
    </div>
  );
};

export default Card;
