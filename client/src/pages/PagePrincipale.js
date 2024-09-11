// Components
import BarreNavigation from "../components/BarreNavigation";
import PiedDePage from "../components/PiedDePage";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import VignetteRecette from "../components/VignetteRecette";
import Bandeau from "../components/Bandeau";
import Titre from "../components/Titre";
import CatFiltre from "../components/CatFiltre";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/PagePrincipale.css";

// Autre
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function PagePrincipale({
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
  dark,
  setDark,
}) {
  const [myRctList, setMyRctList] = useState([]);
  const [myFilterList, setMyFilterList] = useState([]);
  const [myFilterBool, setMyFilterBool] = useState(false);
  const [mySearch, setMySearch] = useState("");
  const [mySearchList, setMySearchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const boardModificationName = "board_modification";
  const myBoard = document.getElementById(boardModificationName);

  // fonctions fetch
  async function getRctList() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/getRecipesList",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      if (parseRes.myRecipeList) {
        setMyRctList(parseRes.myRecipeList);
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getAllCategories() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/getAllCategories",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      let myList = [];
      let myListAlpha = parseRes.sort();

      for (let i = 0; i < myListAlpha.length; i++) {
        myList[i] = [myListAlpha[i], false];
      }

      setMyFilterList(myList);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getRctList();
    getAllCategories();
  }, []);

  function rechercher(e) {
    e.preventDefault();

    let hasFilter = false;
    for (let i = 0; i < myFilterList.length; i++) {
      if (myFilterList[i][1]) {
        hasFilter = true;
      }
    }

    let myTab = [];

    for (let i = 0; i < myRctList.length; i++) {
      if (
        myRctList[i].rct_name.toLowerCase().indexOf(mySearch.toLowerCase()) > -1
      ) {
        myTab.push(myRctList[i]);
      }
    }

    if (hasFilter) {
      for (let i = 0; i < myFilterList.length; i++) {
        if (myFilterList[i][1]) {
          for (let j = myTab.length - 1; j > -1; j--) {
            let myBool = false;
            for (let k = 0; k < myTab[j].cat.length; k++) {
              if (myTab[j].cat[k] === myFilterList[i][0].toLowerCase()) {
                myBool = true;
              }
            }
            if (!myBool) {
              myTab.splice(j, 1);
            }
          }
        }
      }
    }

    if (myTab.length === 0) {
      toast.info("Aucune correspondance trouvée.");
    }

    setMySearchList(myTab);
  }

  function myOnChange(e) {
    setMySearch(e.target.value);
  }

  function reinitialisation(e) {
    e.preventDefault();

    let myTab = myFilterList;
    for (let i = 0; i < myTab.length; i++) {
      myTab[i][1] = false;
    }

    setMyFilterList(myTab);
    setMySearch("");
    setMySearchList([]);
  }

  return (
    <div className="relatif">
      <Bandeau mySize="medium" dark={dark} />

      <div className="grid_accueil board elements_centre">
        <div style={{ opacity: isSearching ? "0" : "1", transition: "0.3s" }}>
          <Titre
            tailleTel={tailleTel}
            tailleInt1={tailleInt1}
            tailleInt2={tailleInt2}
            tailleOrdi={tailleOrdi}
          />
        </div>

        {isSearching ? <div></div> : <div></div>}

        {isSearching ? (
          <div></div>
        ) : (
          <div className="pqt anim_entry elements_centre">
            <div
              className="titre_pqt_vignette elements_centre texte_taille_5 non_selectionnable"
              style={{ color: dark ? "var(--wht)" : "var(--blk)" }}
            >
              Toutes les recettes
            </div>
            <div
              className="trait_pqt_vignette"
              style={{ backgroundColor: dark ? "var(--wht)" : "var(--blk)" }}
            />
          </div>
        )}

        {myRctList.length && !isSearching > 0 ? (
          <div className="plage_vignette elements_centre non_selectionnable">
            {myRctList.map((myRct, index) => (
              <VignetteRecette
                key={"list" + index}
                myId={myRct.rct_id}
                myName={myRct.rct_name}
                myImg={myRct.rct_img}
                dark={dark}
              />
            ))}
          </div>
        ) : mySearchList.length > 0 && isSearching ? (
          <div className="plage_vignette elements_centre non_selectionnable">
            {mySearchList.map((myRct, index) => (
              <VignetteRecette
                key={"search" + index}
                myId={myRct.rct_id}
                myName={myRct.rct_name}
                myImg={myRct.rct_img}
                darl={dark}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div
        className="ctn_search elements_centre"
        style={{ top: isSearching ? "150px" : "330px" }}
      >
        <form
          className="elements_centre colonne grid_form"
          onSubmit={(e) => rechercher(e)}
          style={{
            gridTemplateRows: isSearching
              ? "150px 150px 100px"
              : "100px 0px 0px",
            transition: "0.5s",
          }}
        >
          <div
            className="pqt elements_centre"
            style={{
              width: tailleTel
                ? "350px"
                : tailleInt2 && !tailleInt1
                ? "800px"
                : "1000px",
              left: "17px",
            }}
          >
            <input
              className="input"
              placeholder="Rechercher une recette..."
              onChange={(e) => myOnChange(e)}
              onFocus={() => setIsSearching(true)}
              value={mySearch}
              style={{
                color: dark ? "var(--wht)" : "var(--blk)",
                backgroundColor: dark ? "var(--blk)" : "var(--wht)",
              }}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="2xl"
              style={{
                color: dark ? "var(--wht)" : "var(--blk)",
                position: "absolute",
                right: "40px",
              }}
            />
          </div>

          {isSearching ? (
            <div className="ctn_cat elements_centre">
              {myFilterList.map((cat, i) => (
                <CatFiltre
                  key={i}
                  myFilterList={myFilterList}
                  setMyFilterList={setMyFilterList}
                  i={i}
                  dark={dark}
                />
              ))}
            </div>
          ) : null}

          {isSearching ? (
            <div
              className="btn_recherche anim_entry elements_centre non_selectionnable"
              style={{ flexWrap: "wrap", rowGap: "30px" }}
            >
              <div
                style={{ color: `var(--${dark ? "wht" : "blk"})` }}
                className="button"
                onClick={(e) => rechercher(e)}
              >
                Rechercher
              </div>

              <div
                style={{ color: `var(--${dark ? "wht" : "blk"})` }}
                className="button"
                onClick={(e) => reinitialisation(e)}
              >
                Réinitialisation
              </div>
            </div>
          ) : null}
        </form>
      </div>
      <div
        className="cancel texte_taille_2 elements_centre non_selectionnable"
        onClick={() => setIsSearching(false)}
        style={{ right: isSearching ? "20px" : "-200px" }}
      >
        Annuler
      </div>
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
        dark={dark}
        setDark={setDark}
      />
      <div
        id={boardModificationName}
        className="board_menu_suppl elements_centre"
      ></div>
      <MenuAjoutRecette
        toShow={toShow}
        setToShow={setToShow}
        pseudo={pseudo}
        tailleTel={tailleTel}
        dark={dark}
      />
      <PiedDePage dark={dark} />
    </div>
  );
}

export default PagePrincipale;
