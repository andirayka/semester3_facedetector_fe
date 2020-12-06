import React, { useState } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/navigation/Navigation";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({ apiKey: "cc0013dd5e2c4148b941e8a364705f40" });

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      (resp) => {
        console.log(resp.outputs[0].data.regions[0].region_info.bounding_box);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
};

export default App;
