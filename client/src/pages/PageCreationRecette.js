// Components
import BarreNavigation from "../components/BarreNavigation";
import PiedDePage from "../components/PiedDePage";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import Bandeau from "../components/Bandeau";
import BoardMenuSuppl from "../components/BoardMenuSuppl";

// Datas
import imgToDefine from "../datas/Image_a_definir.jpg";

// CSS
import "../styles/CSSGeneral.css";
import "../styles/ModifRct.css";
import "../styles_pages/CreationRecette.css";

//Autre
import { toast } from "react-toastify";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function PageCreationRecette({
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
  // Infos recette
  const [myRct, setMyRct] = useState({
    rct_name: "",
    user_pseudo: "",
    rct_nb: 0,
    rct_nb_type: "",
    rct_section_ing: [["no_section", 1]],
    rct_ing: [],
    rct_section_step: [["no_section", 1]],
    rct_step: [],
    rct_cat: [],
    rct_img: ["", "", "", "", ""],
  });

  // Mes variables
  let { rct_id } = useParams();
  const [changingDelete, setChangingDelete] = useState(false);
  const boardModificationName = "board_modification";
  const myBoard = document.getElementById(boardModificationName);
  const [leftCarrousel, setLeftCarrousel] = useState(0);
  const [leftBeat, setLeftBeat] = useState(false);
  const [rightBeat, setRightBeat] = useState(false);
  const [allowToModify, setAllowToModify] = useState(false);
  const [modify, setModify] = useState(false);
  const [noCat, setNoCat] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fonctions fetch
  async function getRecipeInfos() {
    try {
      const response = await fetch("/recipe/getRecipeInfos", {
        method: "GET",
        headers: { rct_id: rct_id, token: localStorage.token },
      });

      const parseRes = await response.json();

      if (parseRes.myInfo) {
        let myBool = false;
        for (let i = 0; i < parseRes.myCatList.length; i++) {
          if (parseRes.myCatList[i][1]) {
            myBool = true;
          }
        }
        if (myBool) {
          setNoCat(false);
        }

        setMyRct({
          ...myRct,
          rct_name: parseRes.myInfo.rows[0].rct_name,
          user_pseudo: parseRes.myInfo.rows[0].user_pseudo,
          rct_nb: parseRes.myInfo.rows[0].rct_nb,
          rct_nb_type: parseRes.myInfo.rows[0].rct_nb_type,
          rct_section_ing: parseRes.mySectionIngList,
          rct_ing: parseRes.myIngList,
          rct_section_step: parseRes.mySectionStepList,
          rct_step: parseRes.myStepList,
          rct_cat: parseRes.myCatList,
          rct_img: parseRes.myImgList,
        });
        if (
          (parseRes.myInfo.rows[0].user_pseudo === pseudo &&
            role === "writer") ||
          role === "admin"
        ) {
          setAllowToModify(true);
        }
        setIsLoaded(true);
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(
    () => {
      getRecipeInfos();
    },
    [],
    [getRecipeInfos]
  );

  // Fonctions Modifier

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  function changeCarrousel(mvt) {
    let myLeft = leftCarrousel;
    if (myLeft + mvt <= 0 && myRct.rct_img[-(myLeft + mvt)] !== "") {
      setLeftCarrousel(myLeft + mvt);
    }
  }

  function choixCarrousel(e, index) {
    setLeftCarrousel(-index);
  }

  return isLoaded ? (
    <div className="relatif" style={{ overflowY: modify ? "hidden" : "auto" }}>
      <Bandeau mySize={"medium"} dark={dark} />
      <div id="board_creation_recette" className="board">
        <div className="titre_recette elements_centre">
          <div
            className="elements_centre texte_centre colonne"
            style={{
              fontSize: "4em",
            }}
          >
            {myRct.rct_name}
            <div id="signature">par {myRct.user_pseudo}</div>
          </div>
        </div>

        <div className="liste_categorie elements_centre ligne">
          {!noCat ? (
            myRct.rct_cat.map((cat, index_cat) =>
              cat[1] ? (
                <div
                  key={"cat" + index_cat}
                  className="categorie_rct elements_centre gras"
                >
                  {cat}
                </div>
              ) : null
            )
          ) : (
            <div className="categorie_rct elements_centre gras">
              Aucune catégorie associée
            </div>
          )}
        </div>

        <div id="image_board" style={{ width: tailleTel ? "400px" : "800px" }}>
          <div className="limite">
            <div id="carrousel" style={{ left: leftCarrousel * 100 + "%" }}>
              {myRct.rct_img[0] === "" ? (
                <div className="cadre_image_recette elements_centre">
                  <img
                    alt="no_illustration"
                    className="image_recette"
                    src={imgToDefine}
                  ></img>
                  <div className="message_aucune_image texte_taille_5 gras elements_centre">
                    Aucune image de définie
                  </div>
                </div>
              ) : (
                myRct.rct_img.map((img, index) => (
                  <div
                    key={"image_" + index}
                    className="cadre_image_recette elements_centre"
                  >
                    <img
                      alt={"illustration_" + index}
                      className="image_recette"
                      src={img}
                    ></img>
                  </div>
                ))
              )}
            </div>

            {myRct.rct_img[1] !== "" ? (
              <div>
                <div className="carrousel_left elements_centre">
                  <div
                    className="fond_bouton"
                    onMouseEnter={() => setLeftBeat(true)}
                    onMouseLeave={() => setLeftBeat(false)}
                    onClick={(e) => {
                      changeCarrousel(1);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleChevronLeft}
                      size="4x"
                      style={{
                        color: "var(--blk)",
                        backgroundColor: "var(--main)",
                        border: "solid 1px var(--main)",
                        borderRadius: "50px",
                      }}
                      beat={leftBeat}
                    />
                  </div>
                </div>
                <div className="carrousel_right elements_centre">
                  <div
                    className="fond_bouton"
                    onMouseEnter={() => setRightBeat(true)}
                    onMouseLeave={() => setRightBeat(false)}
                    onClick={(e) => {
                      changeCarrousel(-1);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleChevronRight}
                      size="4x"
                      style={{
                        color: "var(--blk)",
                        backgroundColor: "var(--main)",
                        border: "solid 1px var(--main)",
                        borderRadius: "50px",
                      }}
                      beat={rightBeat}
                    />
                  </div>
                </div>
                <div id="points_carrousel" className="elements_centre">
                  {myRct.rct_img.map((img, index) =>
                    img !== "" ? (
                      index === -leftCarrousel ? (
                        <div
                          key={index}
                          className="rond_carrousel"
                          style={{
                            backgroundColor: "var(--main)",
                          }}
                        ></div>
                      ) : (
                        <div
                          key={index}
                          className="rond_carrousel"
                          style={{
                            backgroundColor: "var(--blk)",
                          }}
                          onClick={(e) => choixCarrousel(e, index)}
                        ></div>
                      )
                    ) : null
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div
          id="main_board"
          className={tailleTel ? "elements_centre colonne" : null}
        >
          <div className="bandeau_gauche">
            <div className="nb_personne gras elements_centre texte_centre">
              {myRct.rct_nb === 0
                ? "Pour..."
                : "Pour " + myRct.rct_nb + " " + myRct.rct_nb_type}
            </div>
            <div id="titre_liste_ingredient" className="texte_centre">
              Liste ingrédients
            </div>
            <div id="liste_ingredient">
              {myRct.rct_section_ing.length > 0
                ? myRct.rct_section_ing.map(
                    (section_ing, index_section_ing) => {
                      return (
                        <ul key={"section_ing" + index_section_ing}>
                          {section_ing[0] !== "no_section" ? (
                            <p className="gras souligne texte_ingredient">
                              {section_ing[0]}
                            </p>
                          ) : null}
                          {myRct.rct_ing.length > 0
                            ? myRct.rct_ing.map((ing, index_ing) =>
                                ing[3] === section_ing[1] ? (
                                  <li
                                    key={"ing" + index_ing}
                                    className="point_ingredient"
                                  >
                                    {ing[0] > 0 ? (
                                      <span className="gras texte_ingredient">
                                        {ing[0] + " "}
                                      </span>
                                    ) : null}
                                    {ing[1] !== "" ? (
                                      <span className="gras texte_ingredient">
                                        {ing[1] + " "}
                                      </span>
                                    ) : null}
                                    {ing[2] !== "" ? (
                                      <span className="texte_ingredient">
                                        {ing[2]}
                                      </span>
                                    ) : null}
                                  </li>
                                ) : null
                              )
                            : null}
                        </ul>
                      );
                    }
                  )
                : null}
            </div>
          </div>

          <div
            id="recette_board"
            style={{ color: `var(--${dark ? "wht" : "blk"})` }}
          >
            <div
              className={`intitule_recette ${
                tailleTel ? "texte_centre" : null
              }`}
            >
              La recette
            </div>
            <div id="liste_step">
              {myRct.rct_section_step.length > 0
                ? myRct.rct_section_step.map(
                    (section_step, index_section_step) => (
                      <ul key={"section_step" + index_section_step}>
                        {section_step[0] !== "no_section" ? (
                          <p className="gras souligne texte_ingredient">
                            {section_step[0]}
                          </p>
                        ) : null}
                        {myRct.rct_step.length > 0
                          ? myRct.rct_step.map((step, index_step) =>
                              step[1] === section_step[1] ? (
                                <li
                                  key={"step" + index_step}
                                  className="point_step"
                                >
                                  {step[0] !== "" ? (
                                    <span className="texte_step">
                                      {step[0]}
                                    </span>
                                  ) : null}
                                </li>
                              ) : null
                            )
                          : null}
                      </ul>
                    )
                  )
                : null}
            </div>
          </div>
        </div>
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
        isRecipePage={true}
        allowToModify={allowToModify}
        modify={modify}
        setModify={setModify}
        ouvertureModif={ouvertureModif}
        setChangingDelete={setChangingDelete}
        dark={dark}
        setDark={setDark}
      />

      <BoardMenuSuppl
        boardModificationName={boardModificationName}
        modify={modify}
        setModify={setModify}
        changingDelete={changingDelete}
        setChangingDelete={setChangingDelete}
        setLeftCarrousel={setLeftCarrousel}
        rct_id={rct_id}
        myRct={myRct}
        setMyRct={setMyRct}
        setNoCat={setNoCat}
        myBoard={myBoard}
        tailleTel={tailleTel}
        dark={dark}
      />

      <MenuAjoutRecette
        toShow={toShow}
        setToShow={setToShow}
        pseudo={pseudo}
        tailleTel={tailleTel}
        dark={dark}
      />

      <PiedDePage dark={dark} />
    </div>
  ) : null;
}

export default PageCreationRecette;
