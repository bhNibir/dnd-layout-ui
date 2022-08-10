import React from "react";
import { useDrag } from "react-dnd";
import { ROW } from "../utils/constants";
import Column from "./Column";
import DropZone from "./DropZone";
import showID from "./ShowIdModal";

const style = {};
const Row = ({ data, components, handleDrop, path }) => {
  // console.log("Row", data);
  const [{ isDragging }, dragRef] = useDrag({
    type: ROW,
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

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={dragRef}
      style={{ ...style, opacity }}
      className="base draggable row"
      onClick={(e) => showID(e, data.id)}
    >
      {data.id}

      <div className="columns">
        {data.children &&
          data.children.map((column, index) => {
            const currentPath = `${path}-${index}`;

            return (
              <React.Fragment key={column.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: data.children.length,
                  }}
                  onDrop={handleDrop}
                  className="horizontalDrag"
                />
                {renderColumn(column, currentPath)}
              </React.Fragment>
            );
          })}
        <DropZone
          data={{
            path: `${path}-${data?.children?.length}`,
            childrenCount: data?.children?.length,
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
