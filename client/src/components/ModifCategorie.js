// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/BoutonBoard.css";
import "../styles/ModifCategorie.css";

// Autre
import { toast } from "react-toastify";
import React, { useState } from "react";

function ModifCategorie({
  rct_id,
  setMyRct,
  defaultValue,
  setChangingCat,
  myBoard,
  tailleTel,
}) {
  const [myInfo, setMyInfo] = useState(defaultValue);

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setChangingCat(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();

    if (updateRecipeCat()) {
      ouvertureModif(false);
      setMyRct((prev) => ({
        ...prev,
        rct_cat: myInfo,
      }));
      setChangingCat(false);
    }
  };

  const catSelect = (e) => {
    e.preventDefault();

    let myBool = false;

    if (e.target.className.indexOf("selected") === 0) {
      e.target.className = e.target.className.replace(
        "selected",
        "non_selected"
      );
      myBool = false;
    } else if (e.target.className.indexOf("non_selected") === 0) {
      e.target.className = e.target.className.replace(
        "non_selected",
        "selected"
      );
      myBool = true;
    }

    let myList = [...myInfo];

    for (let i = 0; i < myList.length; i++) {
      if (myList[i][0] === e.target.innerHTML) {
        myList[i][1] = myBool;
      }
    }

    setMyInfo(myList);
  };

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  async function updateRecipeCat() {
    try {
      const response = await fetch("/recipe/updateRecipeCategories", {
        method: "Post",
        headers: {
          rct_id: rct_id,
          "content-type": "application/json",
          token: localStorage.token,
        },

        body: JSON.stringify({
          rct_cat: myInfo,
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
      id="menu_modif_categorie"
      className={
        tailleTel
          ? "modif_recette_tel elements_centre colonne"
          : "modif_recette elements_centre colonne"
      }
      onSubmit={(e) => onSubmitValider(e)}
    >
      <div className="titre_modif texte_centre">
        Choisissez les catégories associées à votre recette
      </div>
      <div className="paquet_modif_cat elements_centre">
        {myInfo.length > 0
          ? myInfo.map((cat, index) =>
              cat[1] ? (
                <div
                  key={"cat2" + index}
                  onClick={(e) => catSelect(e)}
                  className="selected elements_centre gras"
                >
                  {cat}
                </div>
              ) : (
                <div
                  key={"cat22" + index}
                  onClick={(e) => catSelect(e)}
                  className="non_selected elements_centre gras"
                >
                  {cat}
                </div>
              )
            )
          : null}
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

export default ModifCategorie;
