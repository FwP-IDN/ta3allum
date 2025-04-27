import React from "react";
import "./Item.css";

const Item = (props) => {
  if (props.inv === undefined) {
    return (
      <div onClick={(_) => props.onclicklistener()} className="item-normal">
        {props.content}
      </div>
    );
  } else {
    return (
      <div
        onClick={(_) => props.onclicklistener()}
        className="item-invisible"
        style={{ fontSize: props.fontSize || "x-large" }}
      >
        {props.content}
      </div>
    );
  }
};

export default Item;
