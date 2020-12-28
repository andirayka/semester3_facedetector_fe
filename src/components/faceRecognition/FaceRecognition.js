import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageSrc, box }) => {
  const { leftCol, topRow, rightCol, bottomRow } = box;

  return (
    <div className="center">
      <div className="absolute mt2">
        {imageSrc && (
          <img
            id="inputimage"
            alt="Image Result"
            src={imageSrc}
            width="500px"
            height="auto"
          />
        )}
        <div
          className="bounding-box"
          style={{
            top: topRow,
            right: rightCol,
            bottom: bottomRow,
            left: leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
