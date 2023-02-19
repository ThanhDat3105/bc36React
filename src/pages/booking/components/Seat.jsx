import React from "react";
import { useState } from "react";

export default function Seat(props) {
  const [isSelected, setIsSelected] = useState(false);

  const populateClassName = () => {
    if (props.ele.daDat) {
      return "btn-secondary";
    }

    if (isSelected) {
      return "btn-primary";
    }

    if (props.ele.loaiGhe === "Vip") {
      return "btn-warning";
    }

    return "btn-dark";
  };

  const handleSelectSeat = () => {
    setIsSelected(!isSelected);

    props.handleSelect(props.ele);
  };

  return (
    <button
      onClick={handleSelectSeat}
      disabled={props.ele.daDat}
      style={{ width: 50, height: 50, padding: 0 }}
      className={`mr-1 mb-1 btn ${populateClassName()}`}
    >
      {props.ele.tenGhe}
    </button>
  );
}
