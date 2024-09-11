// CSS
import "../styles/Bandeau.css";

// Data
import bandeau from "../datas/Bandeau.jpg";

// Autres
import React, { useState, useEffect } from "react";

function Bandeau({ mySize, dark }) {
  const [myHeightImg, setMyHeightImg] = useState("");
  const [myTopDegrade, setMyTopDegrade] = useState("");
  const [myHeightDegrade, setMyHeightDegrade] = useState("");

  useEffect(() => {
    if (mySize === "small") {
      setMyHeightImg("150px");
      setMyHeightDegrade("50px");
    } else if (mySize === "medium") {
      setMyHeightImg("700px");
      setMyHeightDegrade("450px");
    } else if (mySize === "big") {
      setMyHeightImg("800px");
      setMyHeightDegrade("350px");
    }
  }, []);

  return (
    <div className="non_selectionnable">
      <div
        alt="fond"
        className="div_bandeau non_selectionnable"
        style={{ height: myHeightImg }}
      >
        <div className="blur_bandeau" />
        <img className="img_bandeau non_selectionnable" src={bandeau} />
        <div
          className="degrade"
          style={{
            height: myHeightDegrade,
            background: dark
              ? "linear-gradient(rgb(30, 30, 30, 0.3), var(--blk))"
              : "linear-gradient(rgb(250, 250, 250, 0), var(--wht))",
            transition: "0.5s",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Bandeau;
