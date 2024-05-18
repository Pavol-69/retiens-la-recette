// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/BoutonBoard.css";
import "../styles/ModifTitreRecette.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifTitreRecette({
  rct_id,
  defaultValue,
  myRct,
  setMyRct,
  setChangingName,
  myBoard,
  tailleTel,
}) {
  const [myName, setMyName] = useState(defaultValue);

  // Fonctions onChange
  function myOnChange(e) {
    setMyName(e.target.value);
  }

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setChangingName(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();

    if (updateRecipeDb()) {
      ouvertureModif(false);
      setChangingName(false);
      setMyRct((prev) => ({ ...prev, rct_name: myName }));
    }
  };

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  async function updateRecipeDb() {
    try {
      const response = await fetch("/recipe/updateRecipeInfos", {
        method: "Post",
        headers: {
          rct_id: rct_id,
          "content-type": "application/json",
          token: localStorage.token,
        },

        body: JSON.stringify({
          rct_id: rct_id,
          rct_name: myName,
          rct_nb: myRct.rct_nb,
          rct_nb_type: myRct.rct_nb_type,
        }),
      });

      const parseRes = await response.json();

      if (parseRes) {
        toast.success("Recette mise à jour avec succès");
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <form
      id="menu_modif_titre_recette"
      className={
        tailleTel
          ? "modif_recette_tel elements_centre colonne"
          : "modif_recette elements_centre colonne"
      }
      onSubmit={(e) => onSubmitValider(e)}
    >
      <div className="titre_modif texte_centre">
        Modification du titre de cette recette
      </div>
      <input
        onChange={myOnChange}
        className={tailleTel ? "input_modif_tel" : "input_modif"}
        type="text"
        name="rct_name"
        placeholder="Veuillez renseigner un titre pour cette recette"
        value={myName}
      ></input>
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

export default ModifTitreRecette;
