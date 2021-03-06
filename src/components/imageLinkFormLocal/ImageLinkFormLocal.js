import React from "react";
import "./ImageLinkFormLocal.css";

const ImageLinkFormLocal = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        Web ini cerdas. Dia bisa mendeteksi wajah di gambar Anda!
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-black"
            onClick={onButtonSubmit}
          >
            Deteksi URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkFormLocal;
