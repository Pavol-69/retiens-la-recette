// Component
import CatFiltre from "./CatFiltre";

// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifTitreRecette.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifCategorie({ cat, setCat, tailleTel, dark }) {
  return (
    <form
      className="grid_modif grid_modif_cat"
      style={{ width: `${tailleTel ? "400" : "1000"}px` }}
    >
      <div
        className="titre_mdf"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Catégories associées
      </div>
      <div className="pqt_cat_mdf elements_centre">
        {cat.length > 0
          ? cat.map((cat_line, index) => (
              <CatFiltre
                key={index}
                myFilterList={cat}
                setMyFilterList={setCat}
                i={index}
                dark={dark}
              />
            ))
          : null}
      </div>
      <div></div>
    </form>
  );
}

export default ModifCategorie;
