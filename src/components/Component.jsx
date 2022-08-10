import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "../utils/constants";
import showID from "./ShowIdModal";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: COMPONENT,
    item: { id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const component = components[data.id];

  return (
    <div
      ref={dragRef}
      style={{ ...style, opacity }}
      className="component draggable"
      onClick={(e) => showID(e, data.id)}
    >
      <div>{data.id}</div>
      <div>{component?.content}</div>
    </div>
  );
};
export default Component;
