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

function PageMdpOublie({ isAuth, setIsAuth, tailleTel }) {
  const [mail, setMail] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/forgottenpassword/reset", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          mail: mail,
        }),
      });

      const parseRes = await response.json();
      toast.info(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  function myOnChange(e) {
    setMail(e.target.value);
  }

  return (
    <div className="relatif">
      <BarreNavigation isAuth={isAuth} setIsAuth={setIsAuth} />
      <Bandeau mySize={"big"} />

      <div className="board">
        <form
          className={
            tailleTel
              ? "form_renseignement_tel elements_centre colonne"
              : "form_renseignement elements_centre colonne"
          }
          onSubmit={onSubmitForm}
        >
          <div className="couleur_texte gras texte_taille_2 texte_centre">
            Renseignez votre adresse mail afin que nous vous envoyions un mail
            pour réinitialiser votre mot de passe
          </div>
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
              type="mail"
              name="mail"
              placeholder="Adresse mail"
              onChange={myOnChange}
            ></input>
          </div>
          <div
            onClick={onSubmitForm}
            className={
              tailleTel
                ? "btn_connexion bouton_board_empty_tel non_selectionnable texte_centre"
                : "btn_connexion bouton_board_empty non_selectionnable"
            }
          >
            Envoyer Mail
          </div>
        </form>
      </div>

      <PiedDePage />
    </div>
  );
}

export default PageMdpOublie;
