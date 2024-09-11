// Components
import PiedDePage from "../components/PiedDePage";
import Titre from "../components/Titre";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

function PageResetPassword({
  setIsAuth,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
}) {
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
      <Bandeau mySize="medium" dark={dark} />
      <div className="grid_reset_mdp board">
        <Titre
          tailleTel={tailleTel}
          tailleInt1={tailleInt1}
          tailleInt2={tailleInt2}
          tailleOrdi={tailleOrdi}
        />
        <div className="txt_mdp_oublie texte_taille_2 texte_centre margin_auto">
          Veuillez choisir un nouveau mot de passe.
        </div>
        <form
          className="grid_reset_mdp_form margin_auto"
          style={{ width: tailleTel ? "350px" : "450px" }}
          onSubmit={onSubmitForm}
        >
          <input
            type="password"
            className="input margin_auto"
            name="password1"
            placeholder="Mot de passe..."
            onChange={myOnChange}
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          ></input>

          <input
            type="password"
            className="input margin_auto"
            name="password2"
            placeholder="Confirmation mot de passe..."
            onChange={myOnChange}
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          ></input>

          <div
            className="button margin_auto"
            id="bouton_reset_password"
            onClick={onSubmitForm}
          >
            Réinitialisation
          </div>
        </form>
      </div>

      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageResetPassword;
