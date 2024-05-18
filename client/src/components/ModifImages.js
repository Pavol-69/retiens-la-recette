// Components
import UploadImage from "./UploadImage";

// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/BoutonBoard.css";
import "../styles/ModifImages.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";

function ModifImages({
  rct_id,
  setMyRct,
  defaultValue,
  setChangingImg,
  myBoard,
  setLeftCarrousel,
  tailleTel,
}) {
  let [imgList, setImgList] = useState(defaultValue);

  async function updateRecipeImg() {
    try {
      const response = await fetch("/recipe/updateRecipeImages", {
        method: "Post",
        headers: {
          rct_id: rct_id,
          "content-type": "application/json",
          token: localStorage.token,
        },

        body: JSON.stringify({
          rct_id: rct_id,
          rct_img: imgList,
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

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setChangingImg(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    if (updateRecipeImg()) {
      ouvertureModif(false);
      setChangingImg(false);
      setLeftCarrousel(0);
      setMyRct((prev) => ({ ...prev, rct_img: imgList }));
    }
  };

  return (
    <div>
      <div
        className={
          tailleTel
            ? "modif_recette_tel elements_centre colonne"
            : "modif_recette elements_centre colonne"
        }
        onSubmit={(e) => onSubmitValider(e)}
      >
        <div className="titre_modif texte_centre">
          Choisissez les images que vous souhaitez intégrer à votre recette (5
          maximum)
        </div>
        <div id="plage_insersion_image" className="ligne elements_centre">
          {imgList.map((imgUrl, index) =>
            imgList[index - 1] !== "" ? (
              <UploadImage
                key={imgUrl + index}
                imgList={imgList}
                setImgList={setImgList}
                i={index}
                tailleTel={tailleTel}
              />
            ) : null
          )}
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
      </div>
    </div>
  );
}

export default ModifImages;
