class ViewSDKClient {
  constructor() {
    this.readyPromise = new Promise((resolve) => {
      if (window.AdobeDC) {
        resolve();
      } else {
        document.addEventListener("adobe_dc_view_sdk.ready", () => {
          resolve();
        });
      }
    });
    this.adobeDCView = undefined;
  }

  ready() {
    return this.readyPromise;
  }

  previewFile(divId, viewerConfig, fileURL, fileName, setloading) {
    const config = {
      clientId: "b0b125077da244a4aca8805632114cb0",
    };
    if (divId) {
      config.divId = divId;
    }
    this.adobeDCView = new window.AdobeDC.View(config);

    const previewFilePromise = this.adobeDCView.previewFile(
      {
        content: {
          location: {
            url: fileURL,
          },
        },
        metaData: {
          fileName: fileName,
        },
      },
      viewerConfig
    );
    setloading();

    return previewFilePromise;
  }
}

export default ViewSDKClient;
