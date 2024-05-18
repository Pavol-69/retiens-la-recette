// CCS
import "../styles/CSSGeneral.css";
import "../styles/MenuAjoutRecette.css";

//Autre
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function MenuAjoutRecette({ toShow, setToShow, pseudo, tailleTel }) {
  const [myBoardPosition, setMyBoardPosition] = useState("100vw");
  const [myName, setMyName] = useState("");
  const [path, setPath] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (toShow) {
      setMyBoardPosition("0px");
    } else {
      setMyBoardPosition("100vw");
    }
  }, [toShow]);

  const myLeft = { left: myBoardPosition };

  // Fonctions fetch
  async function addRecipe() {
    try {
      const response = await fetch("/recipe/addRecipe", {
        method: "Post",
        headers: {
          "content-type": "application/json",
          token: localStorage.token,
        },

        body: JSON.stringify({
          rct_name: myName,
          user_pseudo: pseudo,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.rows[0].rct_id) {
        toast.success("Recette créée");
        setPath("/recette/" + parseRes.rows[0].rct_id);
        setIsLoaded(true);
        return true;
      } else {
        toast.error(parseRes);
        setPath("");
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  // Fonctions
  function myOnChange(e) {
    setMyName(e.target.value);
  }

  const annuler = (e) => {
    e.preventDefault();
    setToShow(false);
    setMyName("");
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    setToShow(false);
    setMyName("");
    addRecipe();
  };

  return path === "" && !isLoaded ? (
    <div
      id="boardAjoutRecette"
      className="board_menu_suppl elements_centre"
      style={myLeft}
    >
      {toShow ? (
        <form
          className="elements_centre colonne"
          onSubmit={(e) => onSubmitValider(e)}
          style={{ width: tailleTel ? "400px" : "800px" }}
        >
          <div className="texte_taille_4 gras texte_centre">
            Veuillez donner un nom à votre nouvelle recette
          </div>
          <input
            onChange={myOnChange}
            className={
              tailleTel ? "input_ajout_recette_tel" : "input_ajout_recette"
            }
            type="text"
            name="rct_name"
            placeholder="Nom de votre nouvelle recette"
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
      ) : null}
    </div>
  ) : (
    <Navigate to={path} />
  );
}

export default MenuAjoutRecette;
