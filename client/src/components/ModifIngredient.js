// Components
import PlusIcon from "./PlusIcon";

// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifIngredient.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import {
  faTrash,
  faArrowsUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";

function ModifIngredient({
  defaultValue_ing,
  defaultValue_section,
  myBoard,
  tailleTel,
  dark,
}) {
  const [myInfo, setMyInfo] = useState({
    rct_ing: defaultValue_ing,
    rct_section_ing: defaultValue_section,
  });
  const [mySupprBool, setMySupprBool] = useState(false);

  function ajoutSection(e) {
    e.preventDefault();
    let mySectionIngList = [...myInfo.rct_section_ing];
    mySectionIngList.push(["", myInfo.rct_section_ing.length + 1]);

    setMyInfo((prev) => ({
      ...prev,
      rct_section_ing: mySectionIngList,
    }));
  }

  function ajoutIngredient(e) {
    e.preventDefault();
    let myIngList = [...myInfo.rct_ing];
    myIngList.push([
      0,
      "",
      "",
      myInfo.rct_section_ing[myInfo.rct_section_ing.length - 1][1],
      myIngList.length + 1,
    ]);

    setMyInfo((prev) => ({
      ...prev,
      rct_ing: myIngList,
    }));
  }

  // Fonctions onChange
  function myOnChange_section_ing(e) {
    let mySectionIngList = [...myInfo.rct_section_ing];
    const mySplit = e.target.name.split("_");
    let myPosition = 0;
    for (let i = 0; i < mySectionIngList.length; i++) {
      if (
        mySectionIngList[i][1].toString() ===
        mySplit[mySplit.length - 1].toString()
      ) {
        myPosition = i;
      }
    }
    mySectionIngList[myPosition][0] = e.target.value;
    setMyInfo((prev) => ({
      ...prev,
      rct_section_ing: mySectionIngList,
    }));
  }

  function myOnChange_ing(e) {
    let myIngList = [...myInfo.rct_ing];
    const mySplit = e.target.name.split("_");
    let myPosition = Number(mySplit[mySplit.length - 2]);
    let myColumn = Number(mySplit[mySplit.length - 1]);
    myIngList[myPosition - 1][myColumn] = e.target.value;
    setMyInfo((prev) => ({
      ...prev,
      rct_ing: myIngList,
    }));
  }

  // Fonction drag&drop pour les sections
  function dragDrop(e) {
    // Vérification de si on prend bien le bon élément kl

    if (e.target.className === "saisie") {
      let isSection = false;
      let isIngredient = false;

      if (e.target.parentNode.className.indexOf("ligne_section") > -1) {
        isSection = true;
      }
      if (e.target.parentNode.className.indexOf("ligne_ingredient") > -1) {
        isIngredient = true;
      }

      if (isSection || isIngredient) {
        // Ma poubelle pour suppression
        const maPoubelle = document.getElementById("icone_poubelle");

        // Coordonnées souris
        let myX = 0;
        let myY = 0;

        // Récupération des éléments sous forme de variable
        const myDrag = e.target.parentNode.parentNode;

        let myField = "";
        if (isSection) {
          myField = myDrag.parentNode;
        }
        if (isIngredient) {
          myField = myDrag.parentNode.parentNode.parentNode; // et oui, on remonte loin..
        }

        // Changement du nom de class pour bien le repérer, on sauvegarde l'ancien pour le restituer plus tard
        let myOldClass = myDrag.className;
        myDrag.className = "drag";

        // Pour conserver la largeur
        let myOldWidth = myDrag.offsetWidth;
        myDrag.style.width = myOldWidth + "px";

        // Création d'une div tempo qui aider l'utilisateur à savoir où est ce qu'il va drop son élément
        let myTempo = document.createElement("div");
        myTempo.className = "ligne_section_tempo";
        myField.appendChild(myTempo);
        myTempo.style.height = myDrag.offsetHeight + "px";
        if (isIngredient) {
          myTempo.style.marginLeft = "30px";
        }

        myTempo.style.backgroundColor = `rgb(${
          dark ? "30,30,30" : "250,250,250"
        },0.3)`;

        // L'élément pris en drag passe en position absolute pour suivre les mouvements de la souris
        myDrag.style.position = "absolute";

        document.addEventListener("mousemove", onMouseMove);
        myBoard.addEventListener("mouseup", onMouseUp);

        // Récupération de toute sections qui ne sont pas ni drag ni tempo, ça nous donne une base fice pour repositionner l'élément drag ensuite
        let myTopList = [];
        let myTop = [];
        let myHeight = [];

        if (isSection) {
          // on démarre à 1 pour ne pas prendre le premier qui ne concerne que la sous catégorie, on veut qu'il reste en tête
          for (let i = 1; i < myField.childNodes.length; i++) {
            if (
              myField.childNodes[i].className !== "ligne_section_tempo" &&
              myField.childNodes[i].className !== "drag"
            ) {
              myTopList.push(myField.childNodes[i]);
              myTop.push(myField.childNodes[i].offsetTop);
            }
          }
        }

        if (isIngredient) {
          for (let i = 0; i < myField.childNodes.length; i++) {
            let myNode = myField.childNodes[i];
            if (
              i > 0 &&
              myNode.className !== "ligne_section_tempo" &&
              myNode.className !== "drag"
            ) {
              myTopList.push(myNode);
              myTop.push(myNode.offsetTop);
              myHeight.push(myNode.offsetHeight);
            }
            for (let j = 0; j < myNode.childNodes.length; j++) {
              let mySubNode = myNode.childNodes[j];
              if (mySubNode.className === "paquet_ligne_ing") {
                for (let k = 0; k < mySubNode.childNodes.length; k++) {
                  if (
                    mySubNode.childNodes[k].className !==
                      "ligne_section_tempo" &&
                    mySubNode.childNodes[k].className !== "ligne_section" &&
                    mySubNode.childNodes[k].className !== "drag"
                  ) {
                    myTopList.push(mySubNode.childNodes[k]);
                    myTop.push(mySubNode.childNodes[k].offsetTop);
                    myHeight.push(mySubNode.childNodes[k].offsetHeight);
                  }
                }
              }
            }
          }
        }

        if (myTopList.length === 0) {
          myTempo.style.width = myDrag.offsetWidth + 10 + "px";
        }

        // Future position de l'élément drag, par rapport aux éléments fixe de la liste qu'on vient d'enregistrer
        let myPosition = 0;

        function onMouseMove(event) {
          // Coordonnées de la souris
          myX = event.pageX;
          myY = event.pageY;

          // on repositionne l'élément drag par rapport à la souris afin qu'on est l'impression qu'on ait sélectionné le milieu du bloc de saisie
          if (isIngredient) {
            myDrag.style.left = myX - 54 + "px";
          } else {
            myDrag.style.left = myX - 34 + "px";
          }
          myDrag.style.top =
            myY - 35 + myBoard.scrollTop - window.scrollY + "px";

          //On ajuste myY selon le scroll
          myY = myY - window.scrollY;

          // Changement de l'animation de la poubelle quand on passe dessus
          if (
            myY + myBoard.scrollTop > maPoubelle.offsetTop &&
            myY + myBoard.scrollTop <
              maPoubelle.offsetTop + maPoubelle.offsetHeight &&
            myX > maPoubelle.offsetLeft &&
            myX < maPoubelle.offsetLeft + maPoubelle.offsetWidth
          ) {
            setMySupprBool(true);
          } else {
            setMySupprBool(false);
          }

          // si myTopList est vide, on ne peut pas faire ce qui suit
          if (myTopList.length > 0) {
            // Avant le premier élément de la liste, forcément première position, on place l'élément tempo avant, et myPosition = -1 pour indiquer la première position au if pour repositionné l'élément drag
            if (
              myY <
              myTopList[0].offsetTop +
                15 - //myTopList[0].offsetHeight / 2 -
                myBoard.scrollTop
            ) {
              myTopList[0].before(myTempo);
              myPosition = -1;
            }

            // Parcours de tous les éléments fixes contenus dans myTopList, on enregistre la position et place l'élément tempo en fonction d'entre quelles lignes on se trouve
            for (let i = myTopList.length - 1; i > 0; i--) {
              if (
                myY <
                  myTopList[i].offsetTop +
                    15 - //myTopList[i].offsetHeight / 2 -
                    myBoard.scrollTop &&
                myY >
                  myTopList[i - 1].offsetTop +
                    15 - //myTopList[i - 1].offsetHeight / 2 -
                    myBoard.scrollTop
              ) {
                myPosition = i;
                myTopList[myPosition].before(myTempo);
              }
            }

            // Après le dernier élément, forcément dernière position, myPosition = -2 -> code pour dernière position
            if (
              myY >
              myTopList[myTopList.length - 1].offsetTop +
                15 - //myTopList[myTopList.length - 1].offsetHeight / 2 -
                myBoard.scrollTop
            ) {
              myPosition = -2;
              myTopList[myTopList.length - 1].after(myTempo);
            }
          } else {
            myPosition = -3;
          }
        }

        // Dès que le clique de la souris se relève
        function onMouseUp(event) {
          // Suppression de l'évenement mousemove
          document.removeEventListener("mousemove", onMouseMove);
          myBoard.removeEventListener("mouseup", onMouseUp);

          // Suppression de myDrag si myPosition = -3, sinon on met à jour tout le reste
          if (
            myY + myBoard.scrollTop > maPoubelle.offsetTop &&
            myY + myBoard.scrollTop <
              maPoubelle.offsetTop + maPoubelle.offsetHeight &&
            myX > maPoubelle.offsetLeft &&
            myX < maPoubelle.offsetLeft + maPoubelle.offsetWidth
          ) {
            myDrag.remove();
            setMySupprBool(false);
          } else {
            // placement de l'élément drag selon la position enregistrée

            if (isSection) {
              if (myPosition === -1) {
                myTopList[0].before(myDrag);
              } else if (myPosition === -2) {
                myTopList[myTopList.length - 1].after(myDrag);
              } else if (myPosition === -3) {
                myField.appendChild(myDrag);
              } else if (myTopList.length > 0) {
                myTopList[myPosition].before(myDrag);
              }
            }

            if (isIngredient) {
              if (myPosition === -1) {
                // Si première position mais que le compartiment "no_section" est vide, il faut le mettre dedans plutôt que "avant le premier élément"
                if (myField.childNodes[0].childNodes[0].childNodes > 1) {
                  myTopList[0].before(myDrag);
                } else {
                  myField.childNodes[0].childNodes[0].appendChild(myDrag);
                }
              } else if (myPosition === -2) {
                // Si le dernier élément est une section, il faut mettre l'ingrédient dedans et non pas en dernière position

                if (
                  myTopList[
                    myTopList.length - 1
                  ].childNodes[0].className.indexOf("ligne_section_ing") > -1
                ) {
                  myTopList[myTopList.length - 1].childNodes[1].appendChild(
                    myDrag
                  );
                } else {
                  myTopList[myTopList.length - 1].after(myDrag);
                }
              } else if (myPosition === -3) {
                myField.childNodes[0].childNodes[0].appendChild(myDrag);
              } else {
                // Dans le cas où on veut le mettre à la fin d'une section, c'est que l'élément suivant est une section, donc appendChild à l'élément n-1
                // Attention à l'élément 0, particulier car non présent dans myTopList
                if (
                  myTopList[myPosition].childNodes[0].className.indexOf(
                    "ligne_section_ing"
                  ) > -1 &&
                  myPosition > 0
                ) {
                  if (
                    myTopList[myPosition - 1].childNodes[0].className.indexOf(
                      "ligne_section_ing"
                    ) > -1
                  ) {
                    myTopList[myPosition - 1].childNodes[1].appendChild(myDrag);
                  } else {
                    myTopList[myPosition - 1].after(myDrag);
                  }
                } else {
                  if (
                    myTopList[myPosition].childNodes[0].className.indexOf(
                      "ligne_section_ing"
                    ) > -1
                  ) {
                    myTopList[myPosition - 1].after(myDrag);
                  } else {
                    myTopList[myPosition].before(myDrag);
                  }
                }
              }
            }

            // On remet en tous les paramètres qu'on avait changé
            myDrag.style.position = "static";
            myDrag.style.top = "0px";
            myDrag.style.left = "0px";
            myDrag.className = myOldClass;
          }

          myTopList = [];
          document.onmouseup = null;

          // Suppression de l'élément tempo
          myTempo.remove();
        }
      }
    }
  }

  return (
    <div
      className="grid_modif grid_modif_ing"
      style={{ width: `${tailleTel ? "400" : "800"}px` }}
    >
      <div
        className="titre_mdf"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Liste ingrédients
      </div>
      <div className="ctn_btn_dnd elements_centre">
        <div
          className="button"
          style={{ gap: "5px", color: `var(--${dark ? "wht" : "blk"})` }}
          onClick={(e) => ajoutSection(e)}
        >
          <PlusIcon dark={dark} />
          <span>Section</span>
        </div>
        <div
          className="button"
          style={{ gap: "5px", color: `var(--${dark ? "wht" : "blk"})` }}
          onClick={(e) => ajoutIngredient(e)}
        >
          <PlusIcon dark={dark} />
          <span>Ingrédient</span>
        </div>
        <div
          id="icone_poubelle"
          className="elements_centre"
          style={{ backgroundColor: `var(--${dark ? "blk" : "wht"})` }}
        >
          <FontAwesomeIcon size="2x" icon={faTrash} bounce={mySupprBool} />
        </div>
      </div>
      <div
        id="field_sections_ing"
        style={{ width: tailleTel ? "410px" : "800px" }}
      >
        {myInfo.rct_section_ing.length > 0
          ? myInfo.rct_section_ing.map((section_ing, index) => (
              <div key={"modif_section_ing" + index} className="case">
                {section_ing[0] !== "no_section" ? (
                  <div
                    className="ligne_section_ing gras elements_centre"
                    style={{
                      backgroundColor: `var(--${dark ? "blk" : "wht"})`,
                    }}
                  >
                    <div className="case_icone_4_fleches elements_centre">
                      <FontAwesomeIcon
                        size="sm"
                        icon={faArrowsUpDownLeftRight}
                        style={{
                          color: `var(--main)`,
                          border: "solid 1px var(--main)",
                          padding: "3px",
                          borderRadius: "50px",
                        }}
                      />
                    </div>
                    <div
                      className="saisie"
                      onMouseDown={(e) => dragDrop(e)}
                    ></div>
                    <div
                      className="non_select ligne_section"
                      style={{
                        color: `var(--${dark ? "wht" : "blk"})`,
                        fontSize: tailleTel ? "0.9em" : "1em",
                      }}
                    >
                      Section :{" "}
                    </div>
                    <input
                      onChange={(e) => myOnChange_section_ing(e)}
                      className={
                        tailleTel
                          ? "input_section_ing_tel non_select"
                          : "input_section_ing non_select"
                      }
                      name={"input_section_ing_" + section_ing[1]}
                      value={section_ing[0]}
                      type="text"
                      placeholder="Veuillez renseigner un nom de section"
                      style={{
                        backgroundColor: `var(--${dark ? "blk" : "wht"})`,
                        color: `var(--${dark ? "wht" : "blk"})`,
                        fontSize: tailleTel ? "0.7em" : "0.8em",
                      }}
                    ></input>
                  </div>
                ) : null}

                <div className="paquet_ligne_ing">
                  {myInfo.rct_ing.length > 0
                    ? myInfo.rct_ing.map((ing, index) =>
                        ing[3] === section_ing[1] ? (
                          <div key={"modif_ing" + index} className="case">
                            <div
                              className="ligne_ingredient elements_centre"
                              style={{
                                backgroundColor: `var(--${
                                  dark ? "blk" : "wht"
                                })`,
                              }}
                            >
                              <div className="case_icone_4_fleches elements_centre">
                                <FontAwesomeIcon
                                  size="sm"
                                  icon={faArrowsUpDownLeftRight}
                                  style={{
                                    color: `var(--main)`,
                                    border: "solid 1px var(--main)",
                                    padding: "3px",
                                    borderRadius: "50px",
                                  }}
                                />
                              </div>
                              <div
                                className="saisie"
                                onMouseDown={(e) => dragDrop(e)}
                              ></div>

                              <div
                                className="non_select gras elements_centre"
                                style={{
                                  color: `var(--${dark ? "wht" : "bkl"})`,
                                  fontSize: tailleTel ? "0.9em" : "1em",
                                }}
                              >
                                {tailleTel ? "Ing :" : "Ingrédient :"}
                              </div>
                              <input
                                onChange={(e) => myOnChange_ing(e)}
                                className="input_ing non_select"
                                name={"input_ing_qty_" + ing[4] + "_0"}
                                type="number"
                                value={ing[0]}
                                style={{
                                  width: tailleTel ? "28px" : "40px",
                                  backgroundColor: `var(--${
                                    dark ? "blk" : "wht"
                                  })`,
                                  color: `var(--${dark ? "wht" : "blk"})`,
                                  fontSize: tailleTel ? "0.7em" : "0.8em",
                                }}
                              ></input>
                              <input
                                onChange={(e) => myOnChange_ing(e)}
                                className="input_ing non_select"
                                name={"input_ing_unit_" + ing[4] + "_1"}
                                type="text"
                                value={ing[1]}
                                style={{
                                  width: tailleTel ? "40px" : "55px",
                                  backgroundColor: `var(--${
                                    dark ? "blk" : "wht"
                                  })`,
                                  color: `var(--${dark ? "wht" : "blk"})`,
                                  fontSize: tailleTel ? "0.7em" : "0.8em",
                                }}
                                placeholder="Unité..."
                              ></input>
                              <input
                                onChange={(e) => myOnChange_ing(e)}
                                className="input_ing non_select"
                                name={"input_ing_what_" + ing[4] + "_2"}
                                type="text"
                                value={ing[2]}
                                style={{
                                  width: tailleTel ? "150px" : "440px",
                                  backgroundColor: `var(--${
                                    dark ? "blk" : "wht"
                                  })`,
                                  color: `var(--${dark ? "wht" : "blk"})`,
                                  fontSize: tailleTel ? "0.7em" : "0.8em",
                                }}
                                placeholder=" Nom de l'ingrédient..."
                              ></input>
                            </div>
                          </div>
                        ) : null
                      )
                    : null}
                </div>
              </div>
            ))
          : null}
      </div>
      <div></div>
    </div>
  );
}

export default ModifIngredient;
