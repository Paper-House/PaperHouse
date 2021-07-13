import React from "react";
import pf from "./assets/pf.png";
export const AddressBtn = ({ address }) => {
  return (
    <button className="address-btn">
      <img src={pf} alt="" srcset="" />
      <div className="address-btn_add">{address}</div>
    </button>
  );
};
