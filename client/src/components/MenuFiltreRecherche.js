// CCS
import "../styles/CSSGeneral.css";
import "../styles/BoutonBoard.css";
import "../styles/ModifCategorie.css";

function MenuFiltreRecherche({
  myFilterList,
  setMyFilterList,
  myBoard,
  myFilterBool,
  setMyFilterBool,
  tailleTel,
}) {
  const annuler = (e) => {
    e.preventDefault();
    ouvertureModif(false);
    setMyFilterBool(false);
  };

  const onSubmitValider = async (e) => {
    e.preventDefault();
    let myList = myFilterList;
    for (let i = 0; i < myList.length; i++) {
      if (
        myBoard.childNodes[0].childNodes[1].childNodes[i].className.indexOf(
          "selected"
        ) === 0
      ) {
        myList[i][1] = true;
      } else {
        myList[i][1] = false;
      }
    }
    setMyFilterList(myList);
    ouvertureModif(false);
    setMyFilterBool(false);
  };

  const catSelect = (e) => {
    e.preventDefault();

    if (e.target.className.indexOf("selected") === 0) {
      e.target.className = e.target.className.replace(
        "selected",
        "non_selected"
      );
    } else if (e.target.className.indexOf("non_selected") === 0) {
      e.target.className = e.target.className.replace(
        "non_selected",
        "selected"
      );
    }
  };

  function ouvertureModif(myBool) {
    if (myBool) {
      myBoard.style.left = "0px";
    } else {
      myBoard.style.left = "100vw";
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
      <div className="titre_modif texte_centre">Filtrer par catégorie</div>
      <div className="elements_centre" style={{ flexWrap: "Wrap" }}>
        {myFilterList.length > 0
          ? myFilterList.map((cat, index) =>
              cat[1] ? (
                <div
                  key={"menu" + index}
                  onClick={(e) => catSelect(e)}
                  className="selected elements_centre gras"
                >
                  {cat[0]}
                </div>
              ) : (
                <div
                  key={"menu" + index}
                  onClick={(e) => catSelect(e)}
                  className="non_selected elements_centre gras"
                >
                  {cat[0]}
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

export default MenuFiltreRecherche;
