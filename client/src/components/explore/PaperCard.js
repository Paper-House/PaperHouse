import React from "react";
import { AddressBtn } from "../addressBtn";
import thumb from "../assets/thumb.png";
export default function PaperCard({ data }) {
  return (
    <div className="paper_card">
      <div className="paper_card_img">
        <img src={thumb} alt="" />
      </div>
      <div className="paper_card_details">
        <div className="paper_card_title">
          <h3>{data.title}</h3>
        </div>
        <div className="paper_card_category">{data.category}</div>
        <div className="paper_card_date"><h3>published on {data.date}</h3></div>
        <div className="paper_card_author">
          <h3>{data.author}</h3>
          <AddressBtn address={data.publisher} />
        </div>
      </div>
    </div>
  );
}
