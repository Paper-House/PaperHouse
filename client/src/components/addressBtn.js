import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Link } from "react-router-dom";

export const AddressBtn = ({ address }) => {
  if (address) {
    return (
      <Link to={`/profile?address=${address}`}>
        <button className="address-btn">
          <img src={makeBlockie(address)} alt="profile" />
          <div className="address-btn_add">{address}</div>
        </button>
      </Link>
    );
  } else return null;
};
