import React from "react";

const Navigation = ({ onRouteChange, isSignin }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isSignin ? (
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          Keluar
        </p>
      ) : (
        <>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Masuk
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer"
          >
            Daftar
          </p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
