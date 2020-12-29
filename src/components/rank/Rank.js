import React from "react";
// import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="black f2">
        {`${name}, Anda sudah menggunakan layanan deteksi sebanyak`}
      </div>
      <div className="black f1">{entries} kali</div>
    </div>
  );
};

export default Rank;
