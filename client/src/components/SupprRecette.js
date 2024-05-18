// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/BoutonBoard.css";
import "../styles/SupprRecette.css";

// Autre
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";

function SupprRecette({ rct_id, setChangingDelete, myBoard, tailleTel }) {
  const [toDelete, setToDelete] = useState(false);

  async function deleteRecipe() {
    try {
      const response = await fetch("/recipe/deleteRecipe", {
        method: "Post",
        headers: {
          "content-type": "application/json",
          token: localStorage.token,
        },

        body: JSON.stringify({
          rct_id: rct_id,
        }),
      });

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
      className="menu_modif elements_centre"
      onSubmit={(e) => onSubmitValider(e)}
    >
      <div className="titre_modif texte_centre">
        Êtes-vous sûrs de vouloir supprimer cette recette ?
      </div>

      <div className="paquet_boutons">
        <div
          className={
            tailleTel
              ? "bouton_board_tel non_selectionnable"
              : "bouton_board non_selectionnable"
          }
          id="bouton_valider"
          onClick={(e) => onSubmitValider(e)}
        >
          Valider
        </div>
        <div
          className={
            tailleTel
              ? "bouton_board_tel non_selectionnable"
              : "bouton_board non_selectionnable"
          }
          id="bouton_annuler"
          onClick={(e) => annuler(e)}
        >
          Annuler
        </div>
      </div>
    </form>
  );
}

export default SupprRecette;
