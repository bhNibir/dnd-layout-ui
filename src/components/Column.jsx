import { Resizable } from "re-resizable";
import React from "react";
import { useDrag } from "react-dnd";
import Component from "./Component";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";

const style = {};
const Column = ({ data, components, handleDrop, path }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: COLUMN,
    item: {
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={dragRef}
      style={{ ...style, opacity }}
      className=" draggable column"
    >
      <Resizable
        style={{
          border: "solid 1px #ddd",
          padding: "10px",
        }}
      >
        {data.id}
        {data.children.map((component, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={component.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
              />
              {renderComponent(component, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          isLast
        />
      </Resizable>
    </div>
  );
};
export default Column;
