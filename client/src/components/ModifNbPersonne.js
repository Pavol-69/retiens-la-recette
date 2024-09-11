// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifNbPersonne.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifNbPersonne({ nb, setNb, nbType, setNbType, tailleTel, dark }) {
  // Fonctions onChange
  function myOnChangeNb(e) {
    e.preventDefault();
    setNb(e.target.value);
  }
  function myOnChangeNbType(e) {
    e.preventDefault();
    setNbType(e.target.value);
  }

  return (
    <form className="grid_modif grid_modif_nb">
      <div
        className="titre_modif texte_centre"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Nombre de personnes pour lesquelles les quantités sont indiquées
      </div>
      <div
        className="elements_centre input_mdf"
        style={{ gap: "20px", paddingLeft: "34px" }}
      >
        <input
          onChange={myOnChangeNb}
          className="input"
          style={{
            color: `var(--${dark ? "wht" : "blk"})`,
            backgroundColor: `var(--${dark ? "blk" : "wht"})`,
            width: "70px",
            textAlign: "center",
            paddingLeft: "0px",
          }}
          type="number"
          name="rct_nb"
          placeholder="Personnes, portions, assiettes, ..."
          value={nb}
        ></input>
        <input
          onChange={myOnChangeNbType}
          id="input_rct_nb_type"
          type="text"
          name="rct_nb_type"
          className="input"
          style={{
            color: `var(--${dark ? "wht" : "blk"})`,
            backgroundColor: `var(--${dark ? "blk" : "wht"})`,
            width: tailleTel ? "250px" : "650px",
          }}
          value={nbType}
        ></input>
      </div>
      <div></div>
    </form>
  );
}

export default ModifNbPersonne;
