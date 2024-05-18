// Components
import PiedDePage from "../components/PiedDePage";
import BarreNavigation from "../components/BarreNavigation";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

function PageResetPassword({ isAuth, setIsAuth, tailleTel }) {
  const [myPasswords, setMyPasswords] = useState({
    password1: "",
    password2: "",
  });

  const { password1, password2 } = myPasswords;

  let { resetKey } = useParams();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/forgottenpassword/changepassword", {
        method: "POST",
        headers: {
          token: resetKey,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          password: password1,
          password2: password2,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
        toast.success("Réinitialisation Mot de Passe réussie");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function myOnChange(e) {
    setMyPasswords({ ...myPasswords, [e.target.name]: e.target.value });
  }

  return (
    <div className="relatif">
      <BarreNavigation isAuth={isAuth} setIsAuth={setIsAuth} />
      <Bandeau mySize="big" />
      <div className="board elements_centre">
        <form
          className={
            tailleTel
              ? "form_renseignement_tel elements_centre colonne"
              : "form_renseignement elements_centre colonne"
          }
          onSubmit={onSubmitForm}
        >
          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de Passe, première saisie
            </label>
            <input
              type="password"
              className="input_connexion texte_taille_2"
              name="password1"
              placeholder="Mot de passe, première saisie..."
              onChange={myOnChange}
            ></input>
          </div>
          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de Passe, seconde saisie
            </label>
            <input
              type="password"
              className="input_connexion texte_taille_2"
              name="password2"
              placeholder="Mot de passe, seconde saisie..."
              onChange={myOnChange}
            ></input>
          </div>
          <div
            className={
              tailleTel
                ? "btn_connexion bouton_board_empty_tel non_selectionnable texte_centre"
                : "btn_connexion bouton_board_empty non_selectionnable texte_centre"
            }
            id="bouton_reset_password"
            onClick={onSubmitForm}
          >
            Réinitialisation Mot de passe
          </div>
        </form>
      </div>

      <PiedDePage />
    </div>
  );
}

export default PageResetPassword;
