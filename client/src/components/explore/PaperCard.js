import React, { useRef, useState } from "react";
import { AddressBtn } from "../addressBtn";
import thumb from "../assets/thumb.png";

export default function PaperCard({ data, page, callupdate, currentAmount }) {
  const [fundtoggle, setfundtoggle] = useState(false);
  const fundInput = useRef();
  return (
    <div className="paper_card">
      <div className="paper_card_img">
        <img src={thumb} alt="" />
      </div>
      <div className="paper_card_details">
        <div className="paper_card_title">
          <h3>{data.title}</h3>
        </div>
        <div className="paper_card_category">{data.category.toUpperCase()}</div>
        <div className="paper_card_date">
          <h3>Published on {data.date}</h3>
        </div>
        <div className="paper_card_author">
          <h3>{data.author}</h3>
          <AddressBtn address={data.publisher} />
        </div>
        {page === "mypapers" ? (
          <div className="paper_card_update">
            <div className="paper_card_fundtoggle">
              <h3>Allow Funding</h3>
              <label htmlFor="" className="switch">
                <input type="checkbox" />
              </label>
            </div>
            <div className="paper_card_fundamount_input">
              <h3>Funding Amount</h3>{" "}
              <input
                type="text"
                name="fundamount"
                id="fundamoundt"
                ref={fundInput}
                placeholder={currentAmount}
              />
            </div>
            <button onClick={() => callupdate(fundInput, fundtoggle)}>
              Update
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
