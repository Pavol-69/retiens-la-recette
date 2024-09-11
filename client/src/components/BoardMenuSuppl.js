// Components
import ModifTitreRecette from "./ModifTitreRecette";
import ModifNbPersonne from "./ModifNbPersonne";
import ModifIngredient from "./ModifIngredient";
import ModifStep from "./ModifStep";
import ModifCategorie from "./ModifCategorie";
import ModifImages from "./ModifImages";
import SupprRecette from "./SupprRecette";

// CSS
import "../styles/CSSGeneral.css";
import "../styles/ModifRct.css";
import "../styles_pages/CreationRecette.css";

//Autre
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

function BoardMenuSuppl({
  boardModificationName,
  modify,
  setModify,
  changingDelete,
  setChangingDelete,
  setLeftCarrousel,
  rct_id,
  myRct,
  setMyRct,
  setNoCat,
  myBoard,
  tailleTel,
  dark,
}) {
  const [title, setTitle] = useState("");
  const [nb, setNb] = useState("");
  const [nbType, setNbType] = useState("");
  const [cat, setCat] = useState([]);
  const [img, setImg] = useState([]);

  useEffect(() => {
    setTitle(myRct.rct_name);
    setNb(myRct.rct_nb);
    setNbType(myRct.rct_nb_type);
    setCat(myRct.rct_cat);
    setImg(myRct.rct_img);
  }, []);

  async function updateRct() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/updateRecipeInfos",
        {
          method: "POST",
          headers: {
            rct_id: rct_id,
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_id: rct_id,
            rct_name: title,
            rct_nb: nb,
            rct_nb_type: nbType,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateRecipeCat() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/updateRecipeCategories",
        {
          method: "Post",
          headers: {
            rct_id: rct_id,
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_cat: cat,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateRecipeImg() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/updateRecipeImages",
        {
          method: "Post",
          headers: {
            rct_id: rct_id,
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_id: rct_id,
            rct_img: img,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateRecipeIng(mySectionIngList, myIngList) {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/updateRecipeIngredients",
        {
          method: "Post",
          headers: {
            rct_id: rct_id,
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_id: rct_id,
            rct_section_ing: mySectionIngList,
            rct_ing: myIngList,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateStep(mySectionStepList, myStepList) {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/recipe/updateRecipeSteps",
        {
          method: "Post",
          headers: {
            rct_id: rct_id,
            "content-type": "application/json",
            token: localStorage.token,
          },

          body: JSON.stringify({
            rct_id: rct_id,
            rct_section_step: mySectionStepList,
            rct_step: myStepList,
          }),
        }
      );

      const parseRes = await response.json();

      if (parseRes) {
        return true;
      } else {
        toast.error(parseRes);
        return false;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function valider(e) {
    e.preventDefault();

    // MAJ des valeurs
    setMyRct((prev) => ({
      ...prev,
      rct_name: title,
      rct_nb: nb,
      rct_nb_type: nbType,
      rct_cat: cat,
      rct_img: img,
    }));

    //MAJ variables
    validationCat();
    setLeftCarrousel(0);

    // MAJ de la BDD
    if (
      updateRct() &&
      updateRecipeCat() &&
      updateRecipeImg() &&
      validationIng() &&
      validationStep()
    ) {
      toast.success("Recette mise à jour avec succès");
    } else {
      toast.error("Erreur dans la mise à jour de la recette");
    }

    // On quitte le menu
    setModify(false);
  }

  function validationCat() {
    let myBool = false;
    for (let i = 0; i < cat.length; i++) {
      if (cat[i][1]) {
        myBool = true;
      }
    }
    if (myBool) {
      setNoCat(false);
    } else {
      setNoCat(true);
    }
  }

  function validationIng() {
    let k = 0;
    let myIngList = [];
    let mySectionIngList = [];
    let myField = document.getElementById("field_sections_ing");
    mySectionIngList.push(["no_section", 1]);

    for (let i = 0; i < myField.childNodes.length; i++) {
      let myNode = myField.childNodes[i];
      // Sections
      if (i > 0) {
        mySectionIngList.push([
          myNode.childNodes[0].childNodes[3].value,
          i + 1,
        ]);
        myNode = myNode.childNodes[1];
      } else {
        myNode = myNode.childNodes[0];
      }

      // Ingrédients
      for (let j = 0; j < myNode.childNodes.length; j++) {
        let mySubNode = myNode.childNodes[j];
        k++;
        myIngList.push([
          mySubNode.childNodes[0].childNodes[3].value,
          mySubNode.childNodes[0].childNodes[4].value,
          mySubNode.childNodes[0].childNodes[5].value,
          i + 1,
          k,
        ]);
      }
    }
    if (updateRecipeIng(mySectionIngList, myIngList)) {
      setMyRct((prev) => ({
        ...prev,
        rct_section_ing: mySectionIngList,
        rct_ing: myIngList,
      }));
      return true;
    } else {
      return false;
    }
  }

  function validationStep() {
    // Enregistrement de toutes nos nouvelles données

    let k = 0;
    let myStepList = [];
    let mySectionStepList = [];
    let myField = document.getElementById("field_sections_step");
    mySectionStepList.push(["no_section", 1]);

    for (let i = 0; i < myField.childNodes.length; i++) {
      let myNode = myField.childNodes[i];
      // Sections
      if (i > 0) {
        mySectionStepList.push([
          myNode.childNodes[0].childNodes[3].value,
          i + 1,
        ]);
        myNode = myNode.childNodes[1];
      } else {
        myNode = myNode.childNodes[0];
      }

      // Steps
      for (let j = 0; j < myNode.childNodes.length; j++) {
        let mySubNode = myNode.childNodes[j];
        k++;
        myStepList.push([
          mySubNode.childNodes[0].childNodes[3].value,
          i + 1,
          k,
        ]);
      }
    }

    if (updateStep(mySectionStepList, myStepList)) {
      setMyRct((prev) => ({
        ...prev,
        rct_step: myStepList,
        rct_section_step: mySectionStepList,
      }));
      return true;
    } else {
      return false;
    }
  }

  function annuler(e) {
    e.preventDefault();

    // RAZ des valeurs
    setTitle(myRct.rct_name);
    setNb(myRct.rct_nb);
    setNbType(myRct.rct_nb_type);
    setCat(myRct.rct_cat);
    setImg(myRct.rct_img);

    // On quitte le menu
    setModify(false);
  }

  return (
    <div
      id={boardModificationName}
      className="board_menu_suppl"
      style={{
        flexWrap: "wrap",
        left: modify || changingDelete ? "0px" : "100vw",
        backgroundColor: `rgb(${dark ? "30, 30, 30" : "250, 250, 250"}, 0.5)`,
      }}
    >
      {modify ? (
        <div className="pqt_btn_mdf elements_centre">
          <div
            className={`top_mdf_btn top_mdf_btn_${
              dark ? "dark" : "light"
            } texte_taille_2 elements_centre non_selectionnable`}
            onClick={(e) => valider(e)}
          >
            Valider
          </div>

          <div
            className={`top_mdf_btn top_mdf_btn_${
              dark ? "dark" : "light"
            } texte_taille_2 elements_centre non_selectionnable`}
            onClick={(e) => annuler(e)}
          >
            Annuler
          </div>
        </div>
      ) : null}
      {modify ? (
        <div className="ctn_modif">
          <div></div>
          <ModifTitreRecette
            title={title}
            setTitle={setTitle}
            tailleTel={tailleTel}
            dark={dark}
          />
          <ModifCategorie
            cat={cat}
            setCat={setCat}
            tailleTel={tailleTel}
            dark={dark}
          />
          <ModifImages
            img={img}
            setImg={setImg}
            tailleTel={tailleTel}
            dark={dark}
          />
          <ModifNbPersonne
            nb={nb}
            setNb={setNb}
            nbType={nbType}
            setNbType={setNbType}
            tailleTel={tailleTel}
            dark={dark}
          />
          <ModifIngredient
            defaultValue_ing={myRct.rct_ing}
            defaultValue_section={myRct.rct_section_ing}
            myBoard={myBoard}
            tailleTel={tailleTel}
            dark={dark}
          />
          <ModifStep
            rct_id={rct_id}
            setMyRct={setMyRct}
            defaultValue_step={myRct.rct_step}
            defaultValue_section={myRct.rct_section_step}
            setModify={setModify}
            myBoard={myBoard}
            tailleTel={tailleTel}
            dark={dark}
          />
        </div>
      ) : null}

      {!!changingDelete && (
        <SupprRecette
          rct_id={rct_id}
          setChangingDelete={setChangingDelete}
          myBoard={myBoard}
          tailleTel={tailleTel}
          dark={dark}
        />
      )}
    </div>
  );
}

export default BoardMenuSuppl;
