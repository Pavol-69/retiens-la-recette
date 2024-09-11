// CCS
import "../styles/CSSGeneral.css";
import "../styles/MenuAjoutRecette.css";

//Autre
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function MenuAjoutRecette({ dark, toShow, setToShow, pseudo, tailleTel }) {
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

      if (parseRes.rows) {
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
      style={{
        left: myBoardPosition,
        backgroundColor: `rgb(${dark ? "30, 30, 30" : "250, 250, 250"}, 0.5)`,
      }}
    >
      {toShow ? (
        <form
          className="grid_new_rct elements_centre"
          onSubmit={(e) => onSubmitValider(e)}
          style={{ width: tailleTel ? "400px" : "800px" }}
        >
          <div
            className="texte_taille_4 gras texte_centre"
            style={{ color: `var(--${dark ? "wht" : "blk"})` }}
          >
            Veuillez donner un nom à votre nouvelle recette
          </div>
          <input
            onChange={myOnChange}
            className="input"
            type="text"
            name="rct_name"
            placeholder="Nom de votre nouvelle recette..."
            value={myName}
            style={{
              left: "8px",
              width: tailleTel ? "350px" : "800px",
              backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              color: `var(--${dark ? "wht" : "blk"})`,
            }}
          ></input>
          <div className="pqt_boutons elements_centre">
            <div
              className="button non_selectionnable"
              onClick={(e) => onSubmitValider(e)}
              style={{ color: `var(--${dark ? "wht" : "blk"})` }}
            >
              Valider
            </div>
            <div
              className="button non_selectionnable"
              onClick={(e) => annuler(e)}
              style={{ color: `var(--${dark ? "wht" : "blk"})` }}
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
