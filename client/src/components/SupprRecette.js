// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/SupprRecette.css";

// Autre
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";

function SupprRecette({ rct_id, setChangingDelete, myBoard, dark }) {
  const [toDelete, setToDelete] = useState(false);

  async function deleteRecipe() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/deleteRecipe",
        {
          method: "Post",
          headers: {
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_id: rct_id,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        toast.success("Recette supprimée.");
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setChangingDelete(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    if (deleteRecipe()) {
      setToDelete(true);
    }
  };

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  return toDelete ? (
    <Navigate to="/" />
  ) : (
    <form
      id="menu_modif_categorie"
      className="elements_centre"
      onSubmit={(e) => onSubmitValider(e)}
    >
      <div></div>
      <div
        className="titre_modif texte_centre"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Êtes-vous sûrs de vouloir supprimer cette recette ?
      </div>

      <div className="paquet_boutons elements_centre">
        <div
          className="button non_selectionnable"
          id="bouton_valider"
          onClick={(e) => onSubmitValider(e)}
          style={{ color: `var(--${dark ? "wht" : "blk"})` }}
        >
          Valider
        </div>
        <div
          className="button non_selectionnable"
          id="bouton_annuler"
          onClick={(e) => annuler(e)}
          style={{ color: `var(--${dark ? "wht" : "blk"})` }}
        >
          Annuler
        </div>
      </div>
    </form>
  );
}

export default SupprRecette;
