import React, { useState } from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmitUrl, onSubmitBase64 }) => {
  const [inputType, setInputType] = useState("url");

  const getInputImage = async (e) => {
    const file = e.target.files[0];
    const base64Img = await convertBase64(file);
    onSubmitBase64(base64Img);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (err) => reject(err);
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="gambar"
        name="gambar"
        className="dn"
        onChange={getInputImage}
      />

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
                onChange={(event) => onInputChange(event.target.value)}
                placeholder="Masukkan URL gambar"
              />
              <button
                className="w-30 grow f4 link ph3 pv2 dib white bg-black"
                onClick={onSubmitUrl}
              >
                Deteksi URL
              </button>
            </>
          ) : (
            <button
              className="f4 pa2 w-100 center grow white bg-black"
              onClick={() => document.getElementById("gambar").click()}
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
