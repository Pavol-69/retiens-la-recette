// CCS
import "../styles/CSSGeneral.css";
import "../styles/VignetteRecette.css";

// Datas
import imgToDefine from "../datas/Image_a_definir.jpg";

// Autres
import { Link } from "react-router-dom";

function VignetteRecette({ myId, myName, myImg }) {
  return (
    <Link id={myId} className="vignette_recette" to={"/recette/" + myId}>
      {myImg === "" ? (
        <img alt="non défini" className="img_vignette" src={imgToDefine}></img>
      ) : (
        <img alt="défini" className="img_vignette" src={myImg}></img>
      )}
      <div className="titre_vignette texte_centre texte_taille_2">{myName}</div>
    </Link>
  );
}

export default VignetteRecette;
