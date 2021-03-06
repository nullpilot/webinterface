import React from "react";
import { Line } from "rc-progress";

import Slide from "components/shared/slide";
import Spinner from "components/shared/spinner";
import ICON_UPLOAD from "assets/images/icon_upload.png";

const UploadStartedSlide = ({ uploadProgress }) => (
  <Slide title="Upload Started" image={ICON_UPLOAD}>
    <p className="transaction-confirmed-instructions">
      {uploadProgress === 0
        ? "Sending chunks to brokers..."
        : "Transaction Confirmed. Your file is now being uploaded to the Tangle."}
      <Spinner isActive={uploadProgress === 0} className="download-spinner" />
    </p>
    <div>
      <Line
        percent={uploadProgress}
        trailWidth="4"
        strokeWidth="4"
        strokeColor="#4B80FC"
        trailColor="#afcbfe"
        strokeLinecap="square"
        className="upload-progress-bar"
      />
      <p>
        {Math.floor(Math.min(100, uploadProgress))}% - File is being broken into
        chunks and each chunk encrypted…
      </p>
    </div>
  </Slide>
);

export default UploadStartedSlide;
