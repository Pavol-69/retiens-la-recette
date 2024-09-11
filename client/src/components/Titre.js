// CSS
import "../styles/Titre.css";
import "../styles/CSSGeneral.css";

function Titre({ tailleOrdi, tailleTel, tailleInt1, tailleInt2 }) {
  return (
    <div
      className="titre_site non_selectionnable texte_centre"
      style={{
        fontSize: tailleTel
          ? "7em"
          : tailleInt2 && !tailleInt1 && !tailleOrdi
          ? "8em"
          : tailleInt1 && !tailleOrdi
          ? "10em"
          : "12em",
      }}
    >
      Retiens la Recette
    </div>
  );
}

export default Titre;
