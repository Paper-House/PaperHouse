import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { NFTStorage, File } from "nft.storage";
import "./Publish.css";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAwZjA4NWQ0OEYzZjVFMDIwQjExNDM3YkI3NjQ5QzEzMzRkQjYyRUEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjg4NjYxMzY0MywibmFtZSI6IlBhcGVySG91c2UifQ.WQed-WCw9v-GhNGhbzfOaf3PwfCIiZAa44f0oc9SgGo",
});
export const toastStyles = {
  default: {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
  error: {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
};
export const Publish = () => {
  const [categoryOptions, setCategoryOptions] = useState([
    { value: "Science", label: "⚛️ Science" },
    { value: "ML/AI", label: "🤖️ ML/AI" },
    { value: "Space", label: "🚀️ Space" },
    { value: "Medical", label: "⚕️ Medical" },
    { value: "Economics", label: "📊 Economics" },
    { value: "WhitePapers", label: "📃 WhitePapers" },
    { value: "Other", label: "Other" },
  ]);

  const [funding, setfunding] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [publishing, setpublishing] = useState(false);
  const [imageType, setImageType] = useState(null);
  const [categories, setCategories] = useState({
    value: "Science",
    label: "⚛️ Science",
  });
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [thumbPreviewUrl, setThumbPreviewUrl] = useState(null);
  const { connected, address, correctNetwork } = useSelector(
    (state) => state.paper.wallet
  );
  const contract = useSelector((state) => state.paper.contract);

  const title = useRef(null);
  const author = useRef(null);
  const description = useRef(null);
  const fundingAmount = useRef(undefined);

  const IPFSupload = async (name, des, author, category) => {
    if (
      pdf &&
      thumbnail &&
      name &&
      des &&
      author &&
      category &&
      imageType !== "image/svg+xml" &&
      imageType !== "image/svg"
    ) {
      toast("🦄 Uploading to IPFS!", toastStyles.default);

      let date = new Date().toString().split(" ");

      const metadata = await client.store({
        name: name,
        description: des,
        author: author,
        publishDate: date[2] + " " + date[1] + " " + date[3],
        category: category,
        image: new File([thumbnail], `${thumbnail.name}`, {
          type: imageType,
        }),
        pdf: new File([pdf], `${pdf.name}`, { type: "application/pdf" }),
      });
      return metadata.url;
    } else if (!pdf || !thumbnail || !name || !des || !author) {
      toast.error("😢️ All inputs are required!!", toastStyles.error);
    }
  };

  const PublishPaper = () => {
    if (connected && correctNetwork) {
      setpublishing(true);
      IPFSupload(
        title.current.value,
        description.current.value,
        author.current.value,
        categories.value
      )
        .then((tokenURI) => {
          if (tokenURI) {
            toast("🦄 Uploaded to IPFS!", toastStyles.default);
            let fund = "0";
            if (funding) {
              if (fundingAmount.current) {
                if (Number(fundingAmount.current.value) !== 0) {
                  if (fundingAmount.current.value < 0) {
                    fund = String(fundingAmount.current.value * -1);
                  } else {
                    fund = String(fundingAmount.current.value);
                  }
                }
              }
            }
            contract.methods
              .publish(
                tokenURI,
                author.current.value,
                funding,
                Web3.utils.toWei(fund, "ether")
              )
              .send({ from: address })
              .then(() => {
                toast("🚀️ Research Paper Published!", toastStyles.default);
                setpublishing(false);
                resetValues();
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              })
              .catch((err) => {
                toast.error("❗Transaction Failed", toastStyles.error);
                setpublishing(false);
                // resetValues();
                console.log(err);
              });
          } else {
            setpublishing(false);
            // resetValues();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("❗ Error Uploading to IPFS", toastStyles.error);
          setpublishing(false);
        });
    }
  };

  const publishHandleInputChange = (object) => {
    setCategories(object);
  };

  const pdfAdded = (event) => {
    if (event.target.files[0].size > 100000000) {
      toast.error("😢️ PDF size should be less than 100MB!", toastStyles.error);
    } else {
      setPdf(event.target.files[0]);
      setPdfPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const thumbnailAdded = (event) => {
    if (event.target.files[0].size > 5000000) {
      toast.error(
        "😢️ Thumbnail size should be less than 100MB!",
        toastStyles.error
      );
    } else {
      setThumbnail(event.target.files[0]);
      setThumbPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    thumbnail ? setImageType(thumbnail.type) : setImageType(null);
  }, [thumbnail]);

  const resetValues = () => {
    setPdf(null);
    setfunding(false);
    setThumbnail(null);
    setPdfPreviewUrl(null);
    setThumbPreviewUrl(null);
    title.current.value = null;
    author.current.value = null;
    description.current.value = null;
    if (fundingAmount.current) {
      fundingAmount.current.value = null;
    }
  };

  return (
    <>
      <ToastContainer
        className="toast-margin"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container Publish__container">
        <div
          className="Publish__form-circle-red circle1-red"
          id="pCircle"
        ></div>
        <div
          className="Publish__form-circle-violet circle1-violet"
          id="pCircle"
        ></div>
        <div
          className="Publish__form-circle-red circle2-red"
          id="pCircle"
        ></div>
        <div
          className="Publish__form-circle-violet circle2-violet"
          id="pCircle"
        ></div>
        <div className="Publish__form-backdrop">
          <h1 id="publish-heading">Publish a Research Paper</h1>
          {/* <form> */}
          <div className="Publish__form">
            {" "}
            {/* flex */}
            <div className="Publish__form--upload">
              {" "}
              {/* flex item 1 */}
              <div
                className="Publish__form--upload-pdf"
                id="Publish__file--upload"
              >
                <h2>Upload PDF</h2>
                <p>Supports .pdf max 100MB</p>
                <div className="Publish__form--upload-chooseFile">
                  <input
                    type="file"
                    name="upload"
                    id="upload-pdf"
                    accept="application/pdf"
                    hidden
                    onChange={pdfAdded}
                    required
                  />
                  <p>
                    <label for="upload-pdf">Choose File</label>
                  </p>
                </div>
              </div>
              <div
                className="Publish__form--upload-thumbnail"
                id="Publish__file--upload"
              >
                <h2>Upload thumbnail</h2>
                <p>Supports .png .jpg .jpeg max 5MB</p>
                <div className="Publish__form--upload-chooseFile">
                  <input
                    type="file"
                    id="upload-img"
                    accept="image/*"
                    hidden
                    onChange={thumbnailAdded}
                    required
                  />
                  <p>
                    <label for="upload-img">Choose File</label>
                  </p>
                </div>
              </div>
              {thumbPreviewUrl && pdfPreviewUrl && (
                <div className="Publish__form--upload-preview">
                  <div className="Publish__form--upload-preview-content">
                    {thumbPreviewUrl ? (
                      <img src={thumbPreviewUrl} />
                    ) : (
                      <Skeleton width={100} height={90} />
                    )}
                    <div className="preview-info">
                      <p title="Computing_interaction_effects_and_standard_errors_in_logit and_probit_models.pdf">
                        {pdf ? pdf.name : <Skeleton width={"100%"} count={2} />}
                      </p>
                      <div className="preview-info--ipfs-link">
                        <div id="ipfs-link-preview">
                          {pdfPreviewUrl ? (
                            <a href={pdfPreviewUrl} target="_blank">
                              Preview
                            </a>
                          ) : (
                            <Skeleton width={"60px"} />
                          )}
                        </div>
                        <p id="upload__extension">.PDF</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Publish__form--upload-preview-content"
                    id="Publish__form--upload-preview-thumbnail"
                  >
                    {thumbPreviewUrl ? (
                      <img src={thumbPreviewUrl} />
                    ) : (
                      <Skeleton width={100} height={90} />
                    )}
                    {/* <img src={thumb} /> */}
                    <div className="preview-info">
                      <p title="Computing_interaction_effects_and_standard_errors_in_logit and_probit_models.png">
                        {thumbnail ? (
                          thumbnail.name
                        ) : (
                          <Skeleton width={"100%"} count={2} />
                        )}
                        {/* Computing interaction effects and standard errors in logit
                    and probit models.png */}
                      </p>
                      <div className="preview-info--ipfs-link">
                        <div id="ipfs-link-preview">
                          {thumbPreviewUrl ? (
                            <a href={thumbPreviewUrl} target="_blank">
                              Preview
                            </a>
                          ) : (
                            <Skeleton width={"60px"} />
                          )}
                        </div>
                        {imageType ? (
                          <p id="upload__extension-png">{imageType.slice(6)}</p>
                        ) : (
                          <p id="upload__extension-png">.PNG</p>
                        )}
                        {/* <Skeleton width={"60px"} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* <img src={file} /> */}
            </div>
            <div className="Publish__form--input-boxes">
              {" "}
              {/* flex item 2 */}
              <div className="Publish__form--input-title">
                <h2>Title</h2>
                <input
                  type="text"
                  placeholder="Bitcoin: A Peer-to-Peer Electron..."
                  ref={title}
                  maxlength="100"
                  required
                />
              </div>
              <div className="Publish__form--input--author">
                <h2>Author</h2>
                <input
                  type="text"
                  placeholder="Satoshi Nakamoto"
                  ref={author}
                  maxlength="30"
                  required
                />
              </div>
              <div className="Publish__form--input--description">
                <h2>Description</h2>
                <textarea
                  type="text"
                  placeholder="A Peer-to-Peer Electronic Cash System..."
                  ref={description}
                  required
                />
              </div>
              <div className="Publish__form--input--category">
                <h2>Categories</h2>
                <Select
                  defaultValue={[categoryOptions[0]]}
                  // isMulti
                  name="Categories"
                  options={categoryOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={publishHandleInputChange}
                  // styles={customStyles}
                />
              </div>
              <div className="Publish__form--input--funding-toogle">
                <h2>Allow funding</h2>
                <label htmlFor="" className="switch">
                  <input
                    type="checkbox"
                    style={{ padding: "0px" }}
                    onChange={() => {
                      setfunding(!funding);
                    }}
                    checked={funding == true}
                  />
                </label>
              </div>
              {funding ? (
                <div className="Publish__form--input--funding-amount">
                  <h2>Funding Amount</h2>
                  <input
                    type="number"
                    placeholder="0 MATIC"
                    ref={fundingAmount}
                    required
                  />
                </div>
              ) : null}
              <div className="Publish__form--input--terms">
                <p id="Publish__form--input--terms--item1">
                  Once your NFT is minted on the Polygon blockchain, you will
                  not be able to edit or update any of its information.
                </p>
                <p id="Publish__form--input--terms--item2">
                  You agree that any information uploaded to the Paper House
                  will not contain material subject to copyright or other
                  proprietary rights, unless you have necessary permission or
                  are otherwise legally entitled to post the material.
                </p>
              </div>
              <button
                onClick={() => PublishPaper()}
                className="Publish__form--button"
                disabled={!connected || publishing}
              >
                {connected ? (
                  publishing ? (
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
                  ) : (
                    "Publish"
                  )
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};
