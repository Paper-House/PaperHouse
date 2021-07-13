import React, { useState,useref} from "react";

import Select from "react-select";

import "./Publish.css";

export const Publish = () => {
  const [categoryOptions, setCategoryOptions] = useState([
    { value: "⚛️ Science", label: "⚛️ Science" },
    { value: "🤖️ ML/AI", label: "🤖️ ML/AI" },
    { value: "🚀️ Space", label: "🚀️ Space" },
    { value: "⚕️ Medical", label: "⚕️ Medical" },
    { value: "Economics", label: "Economics" },
    { value: "Other", label: "Other" },
  ]);

  const [funding, setfunding] = useState(false);
  
  const publishHandleInputChange = (object) => {
    console.group("Input Changed");
    console.log(object);
    console.groupEnd();
  };

  console.log(`funding: ${funding}`);
  console.log(categoryOptions);

  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     borderBottom: "none",
  //     backgroundColor: "rgba(0, 151, 253, 1);",
  //   }),
  // };

  return (
    <div className="container Publish__container">
      <div className="Publish__form-circle-red circle1-red" id="pCircle"></div>
      <div
        className="Publish__form-circle-violet circle1-violet"
        id="pCircle"
      ></div>
      <div className="Publish__form-circle-red circle2-red" id="pCircle"></div>
      <div
        className="Publish__form-circle-violet circle2-violet"
        id="pCircle"
      ></div>
      <div className="Publish__form-backdrop">
        <h1 id="publish-heading">Publish a Research Paper</h1>
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
                  required
                  hidden
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
                  required
                  hidden
                />
                <p>
                  <label for="upload-img">Choose File</label>
                </p>
              </div>
            </div>
          </div>
          <div className="Publish__form--input-boxes">
            {" "}
            {/* flex item 2 */}
            <div className="Publish__form--input-title">
              <h2>Title</h2>
              <input
                type="text"
                placeholder="Bitcoin: A Peer-to-Peer Electron..."
                required
              />
            </div>
            <div className="Publish__form--input--author">
              <h2>Author</h2>
              <input type="text" placeholder="Satoshi Nakamoto" required />
            </div>
            <div className="Publish__form--input--description">
              <h2>Description</h2>
              <textarea
                type="text"
                placeholder="A Peer-to-Peer Electronic Cash System..."
                required
              />
            </div>
            <div className="Publish__form--input--category">
              <h2>Categories</h2>
              <Select
                defaultValue={[categoryOptions[0], categoryOptions[1]]}
                isMulti
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
              <input
                type="checkbox"
                onChange={() => setfunding(!funding)}
                required
              />
            </div>
            <div className="Publish__form--input--funding-amount">
              <h2>Funding Amount</h2>
              <input type="text" placeholder="0Eth" required />
            </div>
            <div className="Publish__form--input--terms">
              <p id="Publish__form--input--terms--item1">
                Once your NFT is minted on the Polygon blockchain, you will not
                be able to edit or update any of its information.
              </p>
              <p id="Publish__form--input--terms--item2">
                You agree that any information uploaded to the Paper House will
                not contain material subject to copyright or other proprietary
                rights, unless you have necessary permission or are otherwise
                legally entitled to post the material.
              </p>
            </div>
            <button className="Publish__form--button">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};
