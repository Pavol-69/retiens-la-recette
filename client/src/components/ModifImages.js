// Components
import UploadImage from "./UploadImage";

// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifImages.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";

function ModifImages({ img, setImg, tailleTel, dark }) {
  return (
    <div className="grid_modif grid_modif_img">
      <div
        className="titre_mdf"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Images recette (5 max.)
      </div>
      <div className="ligne elements_centre">
        {img.map((imgUrl, index) =>
          img[index - 1] !== "" ? (
            <UploadImage
              key={imgUrl + index}
              imgList={img}
              setImgList={setImg}
              i={index}
              tailleTel={tailleTel}
            />
          ) : null
        )}
      </div>
      <div></div>
    </div>
  );
}

export default ModifImages;
