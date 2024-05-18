// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/BoutonBoard.css";
import "../styles/ModifNbPersonne.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifNbPersonne({
  rct_id,
  myRct,
  setMyRct,
  defaultValue_nb,
  defaultValue_type,
  setChangingNbPersonne,
  myBoard,
  tailleTel,
}) {
  const [myInfo, setMyInfo] = useState({
    rct_nb: defaultValue_nb,
    rct_nb_type: defaultValue_type,
  });

  // Fonctions onChange
  function myOnChange(e) {
    setMyInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setChangingNbPersonne(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    ouvertureModif(false);
    if (updateRecipeDb()) {
      setMyRct((prev) => ({
        ...prev,
        rct_nb: myInfo.rct_nb,
        rct_nb_type: myInfo.rct_nb_type,
      }));
    }
    setChangingNbPersonne(false);
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
          rct_name: myRct.rct_name,
          rct_nb: myInfo.rct_nb,
          rct_nb_type: myInfo.rct_nb_type,
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
      className={
        tailleTel
          ? "modif_recette_tel elements_centre colonne"
          : "modif_recette elements_centre colonne"
      }
      onSubmit={(e) => onSubmitValider(e)}
    >
      <div className="titre_modif texte_centre">
        Modification du nombre de personnes pour lesquelles les quantités sont
        indiquées
      </div>
      <div className="elements_centre">
        <input
          onChange={myOnChange}
          id="input_rct_nb"
          className="input_modif texte_centre"
          type="number"
          name="rct_nb"
          style={{ width: tailleTel ? "30px" : "50px" }}
          value={myInfo.rct_nb}
        ></input>
        <input
          onChange={myOnChange}
          id="input_rct_nb_type"
          className="input_modif"
          type="text"
          name="rct_nb_type"
          style={{ width: tailleTel ? "250px" : "600px" }}
          value={myInfo.rct_nb_type}
        ></input>
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
        <button
          onClick={(e) => onSubmitValider(e)}
          style={{ visibility: "hidden" }}
        ></button>
      </div>
    </form>
  );
}

export default ModifNbPersonne;
