// CCS
import "../styles/CSSGeneral.css";
import "../styles_pages/CreationRecette.css";
import "../styles/ModifTitreRecette.css";
import "../styles/ModifCat.css";

// Autre
import { toast } from "react-toastify";

function ModifCat({
  oldName,
  setOldName,
  newName,
  setNewName,
  myBoard,
  setCatList,
  tailleTel,
  dark,
}) {
  function myOnChange(e) {
    setNewName(e.target.value);
  }

  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setNewName("");
    setOldName("");
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    if (updateCatName()) {
      ouvertureModif(false);
      setNewName("");
      setOldName("");
    }
  };

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
    }
  }

  async function updateCatName() {
    try {
      const response = await fetch("/recipe/updateCategoryName", {
        method: "Post",
        headers: {
          token: localStorage.token,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          old_name: oldName,
          cat_name: newName,
        }),
      });

      const parseRes = await response.json();

      if (Array.isArray(parseRes)) {
        toast.success("Catégorie renommée.");
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

  return (
    <form id="menu_modif_nom_categorie" onSubmit={(e) => onSubmitValider(e)}>
      <div
        className="titre_modif titre_modif_cat elements_centre"
        style={{ color: `var(--${dark ? "wht" : "blk"})` }}
      >
        Modification du nom de la Catégorie
      </div>
      <input
        onChange={myOnChange}
        className="input"
        style={{
          margin: "auto",
          width: tailleTel ? "350px" : "800px",
          left: "0px",
        }}
        type="text"
        name="cat_name"
        placeholder="Veuillez renseigner un nom pour cette catégorie"
        value={newName}
      ></input>
      <div className="pqt_boutons elements_centre">
        <div
          className="button"
          onClick={(e) => onSubmitValider(e)}
          style={{ color: `var(--${dark ? "wht" : "blk"})` }}
        >
          Valider
        </div>
        <div
          className="button"
          onClick={(e) => annuler(e)}
          style={{ color: `var(--${dark ? "wht" : "blk"})` }}
        >
          Annuler
        </div>
      </div>
    </form>
  );
}

export default ModifCat;
