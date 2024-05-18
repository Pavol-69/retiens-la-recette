// Components
import BarreNavigation from "../components/BarreNavigation";
import PiedDePage from "../components/PiedDePage";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import ModifCat from "../components/ModifCat";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/GestionCategorie.css";
import Bandeau from "../components/Bandeau";

// Autre
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function PageGestionCategorie({
  isAuth,
  setIsAuth,
  pseudo,
  role,
  toShow,
  setToShow,
  nbNotif,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
}) {
  const [myName, setMyName] = useState("");
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");
  const [catList, setCatList] = useState([]);
  const boardModificationName = "board_modification";
  const myBoard = document.getElementById(boardModificationName);

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  async function AddCategories() {
    try {
      const response = await fetch("/recipe/addCategory", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cat_name: myName,
        }),
      });

      const parseRes = await response.json();

      if (Array.isArray(parseRes)) {
        toast.success("Catégorie ajoutée");
        setCatList(parseRes);
        setMyName("");
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getAllCategories() {
    try {
      const response = await fetch("/recipe/getAllCategories", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setCatList(parseRes.sort());
    } catch (err) {
      console.error(err.message);
    }
  }

  async function DeleteCategories(cat_name) {
    try {
      const response = await fetch("/recipe/deleteCategory", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cat_name: cat_name,
        }),
      });

      const parseRes = await response.json();

      if (Array.isArray(parseRes)) {
        toast.success("Catégorie supprimée");
        setCatList(parseRes);
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  function onSubmitAjouter(e) {
    e.preventDefault();
    AddCategories();
  }

  function SupprCat(e) {
    e.preventDefault();
    DeleteCategories(e.target.id);
  }

  function myOnChange(e) {
    setMyName(e.target.value);
  }

  function changeCatName(e) {
    setOldName(e.target.innerHTML);
    setNewName(e.target.innerHTML);
    ouvertureModif(true);
  }

  return (
    <div className="relatif">
      <BarreNavigation
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        pseudo={pseudo}
        role={role}
        toShow={toShow}
        setToShow={setToShow}
        nbNotif={nbNotif}
        tailleOrdi={tailleOrdi}
        tailleTel={tailleTel}
        tailleInt1={tailleInt1}
        tailleInt2={tailleInt2}
      />
      <Bandeau mySize="medium" />
      <div className="board">
        <form
          className="form_categorie elements_centre colonne couleur_texte"
          onSubmit={(e) => onSubmitAjouter(e)}
        >
          <div className="titre_modif texte_centre">Gestion des Catégories</div>
          <div
            className={
              tailleTel || (tailleInt2 && !tailleInt1 && !tailleOrdi)
                ? "colonne ligne_info_cat elements_centre"
                : "ligne ligne_info_cat"
            }
          >
            <input
              onChange={(e) => myOnChange(e)}
              className={tailleTel ? "input_modif_tel" : "input_modif"}
              style={{ marginBottom: "25px" }}
              type="text"
              name="cat_name"
              placeholder={
                tailleTel
                  ? "Nouvelle catégorie..."
                  : "Veuillez renseigner le nom d'une nouvelle catégorie"
              }
              value={myName}
            ></input>
            <div
              className={
                tailleTel
                  ? "bouton_board_tel non_selectionnable"
                  : "bouton_board non_selectionnable"
              }
              id="bouton_valider"
              onClick={(e) => onSubmitAjouter(e)}
            >
              Ajouter
            </div>
          </div>
          <div className="paquet_cat elements_centre">
            {catList.length > 0
              ? catList.map((cat, index) => (
                  <div key={index} className="categorie elements_centre gras">
                    <div
                      className="categorie_nom_admin"
                      onClick={(e) => changeCatName(e)}
                    >
                      {cat}
                    </div>
                    <div
                      id={cat}
                      className="cat_fermer"
                      onClick={(e) => SupprCat(e)}
                    >
                      x
                    </div>
                  </div>
                ))
              : null}
          </div>
        </form>
      </div>
      <div
        id={boardModificationName}
        className="board_menu_suppl elements_centre"
      >
        <ModifCat
          oldName={oldName}
          setOldName={setOldName}
          setNewName={setNewName}
          newName={newName}
          myBoard={myBoard}
          setCatList={setCatList}
          tailleTel={tailleTel}
        />
      </div>
      <MenuAjoutRecette toShow={toShow} setToShow={setToShow} pseudo={pseudo} />
      <PiedDePage />
    </div>
  );
}

export default PageGestionCategorie;
