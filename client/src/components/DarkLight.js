// CSS
import "../styles/DarkLight.css";
import "../styles/CSSGeneral.css";

// Autre
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function DarkLight({ dark, setDark }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const rays_nb = [1, 2, 3, 4, 5, 6, 7, 8];

  async function onDarkChange(myDark) {
    try {
      const response = await fetch("/dashboard/userDark", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          dark: myDark,
        }),
      });

      const parseRes = await response.json();

      if (parseRes) {
        setDark(myDark);
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function darkLight(e) {
    e.preventDefault();
    if (dark) {
      onDarkChange(false);
    } else {
      onDarkChange(true);
    }

    if (!isLoaded) {
      setIsLoaded(true);
    }
  }
  return (
    <div className="dl_mega_ctn elements_centre" onClick={(e) => darkLight(e)}>
      <div className="dl_ctn elements_centre">
        <div
          className={`${
            isLoaded ? (dark ? "leve" : "couche") : null
          } sun_ctn elements_centre`}
          style={{
            bottom: !dark ? "-40px" : "1px",
          }}
        >
          <div className="sun_bdy" />
          {rays_nb.map((i) => (
            <div
              key={`ray${i}`}
              className="ray_ctn elements_centre"
              style={{ rotate: `${(i - 1) * 45}deg` }}
            >
              <div className="ray"></div>
            </div>
          ))}
        </div>
        <FontAwesomeIcon
          className={`${isLoaded ? (dark ? "couche" : "leve") : null}`}
          icon={faMoon}
          style={{
            color: "var(--wht)",
            position: "absolute",
            bottom: dark ? "-40px" : "1px",
          }}
          size="2xl"
        />
      </div>
    </div>
  );
}

export default DarkLight;
