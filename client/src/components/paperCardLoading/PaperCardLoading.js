import React from "react";
import Skeleton from "react-loading-skeleton";

export const PaperCardLoading = () => {
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
          {/* <h3>Sairaj Kapdi</h3> */}
          {/* <AddressBtn address={data.publisher} /> */}
          <Skeleton width={"40%"} height={"100%"} />
        </div>
        <div className="paper_card_update">
          <div className="paper_card_fundtoggle" style={{ display: "block" }}>
            {/* <h3>Allow Funding</h3> */}
            <Skeleton width={"100%"} height={"100%"} count={4} />
            {/* <input type="checkbox" checked={fundtoggle == true} /> */}
          </div>
          <div
            className={"paper_card_fundamount_input"}
            style={{ display: "block", textAlign: "start" }}
          >
            <Skeleton width={"40%"} height={"100%"} />
            {/* <input
                type="text"
                name="fundamount"
                id="fundamoundt"
                ref={fundInput}
                placeholder={currentAmount}
                disabled={fundtoggle == false}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
};