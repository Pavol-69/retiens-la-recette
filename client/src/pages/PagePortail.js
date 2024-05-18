// Components
import PiedDePage from "../components/PiedDePage";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/PagePrincipale.css";
import "../styles/BoutonBoard.css";

// Autre
import { Link } from "react-router-dom";

function PagePortail({ tailleOrdi, tailleTel, tailleInt1, tailleInt2 }) {
  return (
    <div className="relatif">
      <Bandeau mySize="big" />
      <div className="board">
        <div
          id="titre_site"
          className="non_selectionnable texte_centre"
          style={{
            fontSize: tailleTel
              ? "5em"
              : tailleInt2 && !tailleInt1 && !tailleOrdi
              ? "6em"
              : tailleInt1 && !tailleOrdi
              ? "8em"
              : "10em",
          }}
        >
          Les Recettes de Sabine
        </div>

        <div className="paquet_boutons">
          <Link
            className={
              tailleTel
                ? "bouton_board_empty_tel non_selectionnable"
                : "bouton_board_empty non_selectionnable"
            }
            to="/portail_connexion/connexion"
          >
            Connexion
          </Link>
          <Link
            className={
              tailleTel
                ? "bouton_board_empty_tel non_selectionnable"
                : "bouton_board_empty non_selectionnable"
            }
            to="/portail_connexion/inscription"
          >
            Inscription
          </Link>
        </div>
      </div>
      <PiedDePage />
    </div>
  );
}

export default PagePortail;
