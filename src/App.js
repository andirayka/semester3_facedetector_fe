import React, { useState } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import { api } from "../api";
import Navigation from "./components/navigation/Navigation";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({ apiKey: "5d994657e61c4776add8271588e0f8cf" });

const App = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [box, setBox] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignin, setIsSignin] = useState(false);
  const [userData, setUserData] = useState({ name: "", entries: 0 });

  const calculateLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const onSubmitUrl = () => {
    setImageSrc(inputUrl);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, inputUrl)
      .then(async (resp) => {
        api
          .put("image", {
            id: userData.id,
          })
          .then((newUserData) =>
            setUserData({ ...userData, entries: newUserData.data })
          );
        setBox(calculateLocation(resp));
      })
      .catch(console.log);
  };

  const onSubmitBase64 = (base64Img) => {
    setImageSrc(base64Img);
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: base64Img })
      .then(async (resp) => {
        api
          .put("image", {
            id: userData.id,
          })
          .then((newUserData) =>
            setUserData({ ...userData, entries: newUserData.data })
          );
        setBox(calculateLocation(resp));
      })
      .catch(console.log);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignin(false);
    } else if (route === "home") {
      setIsSignin(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation isSignin={isSignin} onRouteChange={onRouteChange} />
      {route == "home" ? (
        <>
          <Logo />
          <Rank name={userData.name} entries={userData.entries} />
          <ImageLinkForm
            onInputChange={setInputUrl}
            onSubmitUrl={onSubmitUrl}
            onSubmitBase64={onSubmitBase64}
          />
          <FaceRecognition box={box} imageSrc={imageSrc} />
        </>
      ) : route == "signin" ? (
        <Signin onSignin={setUserData} onRouteChange={onRouteChange} />
      ) : (
        <Register onRegister={setUserData} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
