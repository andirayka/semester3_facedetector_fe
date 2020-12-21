import React, { useState } from "react";
import "./ImageLinkForm.css";

// https://docs.clarifai.com/api-guide/predict/images
// Nanti pake base64
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const [inputType, setInputType] = useState("url");

  return (
    <div>
      <input type="file" id="gambar" name="gambar" className="dn" />

      <div className="pa4">
        <button
          className={"w-25 f4 pv2 dib white bg-purple"}
          onClick={() => setInputType("url")}
        >
          Input URL
        </button>
        <button
          className="w-25 f4 pv2 dib white bg-purple"
          onClick={() => setInputType("file")}
        >
          Input File
        </button>
      </div>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          {inputType == "url" ? (
            <>
              <input
                className="f4 pa2 w-70 center"
                type="text"
                onChange={onInputChange}
                placeholder="Masukkan URL gambar"
              />
              <button
                className="w-30 grow f4 link ph3 pv2 dib white bg-black"
                onClick={onButtonSubmit}
              >
                Deteksi URL
              </button>
            </>
          ) : (
            <button
              className="f4 pa2 w-100 center grow white bg-black"
              onClick={() => setInputType("file")}
            >
              Pilih File
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
