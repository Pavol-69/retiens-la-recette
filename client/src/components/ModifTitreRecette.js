// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifTitreRecette.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifTitreRecette({ title, setTitle, tailleTel, dark }) {
  // Fonctions onChange
  function myOnChange(e) {
    setTitle(e.target.value);
  }

  return (
    <form
      id="menu_modif_titre_recette"
      className="grid_modif grid_modif_titre_rct"
      style={{ width: `${tailleTel ? "400" : "1000"}px` }}
    >
      <div
        className="titre_mdf"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Titre de la recette
      </div>
      <input
        onChange={myOnChange}
        className="input input_mdf"
        style={{
          color: `var(--${dark ? "wht" : "blk"})`,
          backgroundColor: `var(--${dark ? "blk" : "wht"})`,
          width: tailleTel ? "350px" : "800px",
        }}
        type="text"
        name="rct_name"
        placeholder="Veuillez renseigner un titre pour cette recette"
        value={title}
      />
      <div></div>
    </form>
  );
}

export default ModifTitreRecette;
