import React from "react";
import { useDrag } from "react-dnd";

const SideBarItem = ({ data }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: data,
    type: data.component.type,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className="sideBarItem" ref={dragRef} style={{ opacity }}>
      {data.component.type}
    </div>
  );
};
export default SideBarItem;
