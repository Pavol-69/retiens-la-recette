// CCS
import "../styles/CSSGeneral.css";
import "../styles/BoutonMenu.css";

// Autres
import { Link } from "react-router-dom";

function BoutonMenu({ myLink, myTitle }) {
  return (
    <Link className="bouton_menu" to={myLink}>
      {myTitle}
    </Link>
  );
}

export default BoutonMenu;
