import React from "react";
import makeBlockie from "ethereum-blockies-base64";

export const AddressBtn = ({ address }) => {
  return (
    <a href={`/profile?address=${address}`}>
      <button className="address-btn">
        <img src={makeBlockie(address)} alt="profile" />
        <div className="address-btn_add">{address}</div>
      </button>
    </a>
  );
};
