import React from "react";
import Skeleton from "react-loading-skeleton";

export const PaperCardLoading = ({ page }) => {
  return (
    <div className="paper_card papercard_myprofile" style={{ height: "unset" }}>
      <div className="paper_card_img">
        {/* <img src={data.thumbnail} alt="" /> */}
        <Skeleton
          width={"100%"}
          height={"100%"}
          style={{ overflow: "hidden" }}
        />
      </div>
      <div className="paper_card_details">
        <div className="paper_card_title">
          <Skeleton
            width={"100%"}
            height={"100%"}
            style={{ overflow: "hidden" }}
          />
        </div>
        <div className="paper_card_date">
          {/* <h3>Published on {data.date}</h3> */}
          <Skeleton
            width={"80%"}
            height={"100%"}
            style={{ overflow: "hidden" }}
          />
          <Skeleton
            width={"50%"}
            height={"100%"}
            style={{ overflow: "hidden" }}
          />
        </div>
        <div
          className="paper_card_author"
          style={{ display: "block", textAlign: "start" }}
        >
          <Skeleton width={"40%"} height={"100%"} />
        </div>
        {page !== "/explore" ? (
          <div className="paper_card_update">
            <div className="paper_card_fundtoggle" style={{ display: "block" }}>
              <Skeleton width={"100%"} height={"100%"} count={4} />
            </div>
            <div
              className={"paper_card_fundamount_input"}
              style={{ display: "block", textAlign: "start" }}
            >
              <Skeleton width={"40%"} height={"100%"} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
