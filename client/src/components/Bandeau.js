// CSS
import "../styles/BarreNavigation.css";
import "../styles/Bandeau.css";

// Data
import bandeau from "../datas/Bandeau.jpg";

// Autres
import React, { useState, useEffect } from "react";

function Bandeau({ mySize }) {
  const [myHeightImg, setMyHeightImg] = useState("");
  const [myTopDegrade, setMyTopDegrade] = useState("");
  const [myHeightDegrade, setMyHeightDegrade] = useState("");

  useEffect(() => {
    if (mySize === "small") {
      setMyHeightImg("150px");
      setMyTopDegrade("100px");
      setMyHeightDegrade("50px");
    } else if (mySize === "medium") {
      setMyHeightImg("350px");
      setMyTopDegrade("250px");
      setMyHeightDegrade("100px");
    } else if (mySize === "big") {
      setMyHeightImg("800px");
      setMyTopDegrade("450px");
      setMyHeightDegrade("350px");
    }
  }, []);

  return (
    <div className="non_selectionnable">
      <img
        alt="fond"
        className="img_bandeau non_selectionnable"
        src={bandeau}
        style={{ height: myHeightImg }}
      />
      <div
        className="degrade"
        style={{ height: myTopDegrade, top: myHeightDegrade }}
      ></div>
    </div>
  );
}

export default Bandeau;
