import React, { useRef, useState } from "react";
import { AddressBtn } from "../addressBtn";
import { Link } from "react-router-dom";

export default function PaperCard({
  data,
  page,
  callupdate,
  currentAmount,
  allowFunding,
  paperLink,
}) {
  const [fundtoggle, setfundtoggle] = useState(allowFunding);
  const [updating, setUpdating] = useState(false);

  const fundInput = useRef();
  return (
    <div className="paper_card">
      {paperLink ? (
        <Link to={paperLink}>
          <div className="paper_card_img">
            <img src={data.thumbnail} alt="" loading="lazy" />
          </div>
        </Link>
      ) : (
        <div className="paper_card_img">
          <img src={data.thumbnail} alt="" loading="lazy" />
        </div>
      )}
      <div className="paper_card_details">
        <div className="paper_card_title">
          {paperLink ? (
            <Link to={paperLink}>
              <h3>{data.title}</h3>
            </Link>
          ) : (
            <h3>{data.title}</h3>
          )}
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
              <label
                htmlFor=""
                className="switch"
                onClick={() => setfundtoggle(!fundtoggle)}
              >
                <input type="checkbox" checked={fundtoggle === true} />
              </label>
            </div>
            <div
              className={
                fundtoggle
                  ? "paper_card_fundamount_input"
                  : "paper_card_fundamount_input paper_card_fundamount_input_disabled"
              }
            >
              <h3>Funding Amount</h3>{" "}
              <input
                type="text"
                name="fundamount"
                id="fundamoundt"
                ref={fundInput}
                placeholder={currentAmount}
                disabled={fundtoggle === false}
              />
            </div>
            {!updating ? (
              <button
                onClick={() =>
                  callupdate(fundInput.current.value, fundtoggle, (prop) => {
                    setUpdating(prop);
                  })
                }
              >
                Update
              </button>
            ) : (
              <div className="Wallet_loader">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="css-1p66nw2"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 1.46.312 2.843.872 4.09a1 1 0 01-1.825.82A11.961 11.961 0 010 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12c-2.89 0-5.545-1.023-7.617-2.727a1 1 0 111.27-1.544A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
