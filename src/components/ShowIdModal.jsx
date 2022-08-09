import { Modal } from "antd";
import React from "react";

const showID = (event, id) => {
  event.stopPropagation();
  Modal.info({
    title: "Element ID",
    content: (
      <div>
        <p>ID: {id}</p>
      </div>
    ),

    onOk() {},
  });
};

export default showID;
