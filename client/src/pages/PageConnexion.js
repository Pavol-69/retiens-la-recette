// Components
import PiedDePage from "../components/PiedDePage";
import BarreNavigation from "../components/BarreNavigation";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function PageConnexion({ setIsAuth, tailleTel }) {
  const [myInfo, setMyInfo] = useState({
    mail: "",
    password: "",
  });

  const { mail, password } = myInfo;

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("/auth/connexion", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          mail: mail,
          password: password,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
        toast.success("Connexion réussie");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function myOnChange(e) {
    setMyInfo({ ...myInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className="relatif">
      <Bandeau mySize="big" />
      <div className="board">
        <form
          className="form_renseignement elements_centre colonne"
          onSubmit={(e) => onSubmitForm(e)}
        >
          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Adresse Mail
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={myOnChange}
              type="mail"
              name="mail"
              placeholder="Adresse mail"
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de passe
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={myOnChange}
              type="password"
              name="password"
              placeholder="Mot de passe"
            ></input>
          </div>
          <Link
            className="mdp_oublie couleur_texte gras texte_taille_1 elements_centre"
            to="/portail_connexion/mot_de_passe_oublie"
          >
            Mot de Passe oublié ?
          </Link>

          <div
            className={
              tailleTel
                ? "btn_connexion bouton_board_empty_tel non_selectionnable"
                : "btn_connexion bouton_board_empty non_selectionnable"
            }
            id="bouton_connexion"
            onClick={(e) => onSubmitForm(e)}
          >
            Connexion
          </div>
          <button
            onClick={(e) => onSubmitForm(e)}
            style={{ visibility: "hidden" }}
          ></button>
        </form>
      </div>

      <PiedDePage />
    </div>
  );
}

export default PageConnexion;
