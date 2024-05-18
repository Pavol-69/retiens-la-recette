// Components
import BarreNavigation from "../components/BarreNavigation";
import PiedDePage from "../components/PiedDePage";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles/BoutonBoard.css";
import "../styles/Form.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";

function PageInscription({ setIsAuth, tailleTel }) {
  const [myInfo, setMyInfo] = useState({
    name: "",
    family_name: "",
    pseudo: "",
    mail: "",
    password1: "",
    password2: "",
  });

  const { name, family_name, pseudo, mail, password1, password2 } = myInfo;

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const response = await fetch("/auth/inscription", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          family_name: family_name,
          pseudo: pseudo,
          mail: mail,
          password: password1,
          password2: password2,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
        toast.success(
          "Votre demande d'inscription a bien été prise en compte."
        );
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  function myOnChange(e) {
    e.preventDefault();
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
              Prénom
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="text"
              name="name"
              placeholder="Prénom à renseigner"
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Nom
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="text"
              name="family_name"
              placeholder="Nom à renseigner"
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Pseudo
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="text"
              name="pseudo"
              placeholder="Pseudo à renseigner"
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Adresse Mail
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="mail"
              name="mail"
              placeholder="Adresse mail à renseigner"
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de passe, première saisie
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password1"
              placeholder="Mot de passe"
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div className="renseignement_connexion elements_centre colonne">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de passe, seconde saisie
            </label>
            <input
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password2"
              placeholder={
                tailleTel
                  ? "Mot de passe, seconde saisie"
                  : "Veuillez renseigner votre mot de passe à nouveau"
              }
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
            ></input>
          </div>

          <div
            className={
              tailleTel
                ? "btn_connexion bouton_board_tel non_selectionnable"
                : "btn_connexion bouton_board non_selectionnable"
            }
            id="bouton_inscription"
            onClick={(e) => onSubmitForm(e)}
          >
            Inscription
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

export default PageInscription;
