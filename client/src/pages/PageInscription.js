// Components
import PiedDePage from "../components/PiedDePage";
import Titre from "../components/Titre";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles/Form.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";

function PageInscription({
  setIsAuth,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
}) {
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
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/auth/inscription",
        {
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
        }
      );

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
      <Bandeau mySize="medium" dark={dark} />
      <div className="grid_inscription board">
        <Titre
          tailleTel={tailleTel}
          tailleInt1={tailleInt1}
          tailleInt2={tailleInt2}
          tailleOrdi={tailleOrdi}
        />
        <form
          className="grid_inscription_form margin_auto"
          onSubmit={(e) => onSubmitForm(e)}
          style={{ width: tailleTel ? "350px" : "450px" }}
        >
          <input
            onChange={(e) => myOnChange(e)}
            type="text"
            name="name"
            placeholder="Prénom..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />
          <input
            onChange={(e) => myOnChange(e)}
            type="text"
            name="family_name"
            placeholder="Nom..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />

          <input
            onChange={(e) => myOnChange(e)}
            type="text"
            name="pseudo"
            placeholder="Pseudo..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />

          <input
            onChange={(e) => myOnChange(e)}
            type="mail"
            name="mail"
            placeholder="Adresse mail..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />

          <input
            onChange={(e) => myOnChange(e)}
            type="password"
            name="password1"
            placeholder="Mot de passe..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />

          <input
            onChange={(e) => myOnChange(e)}
            type="password"
            name="password2"
            placeholder="Confirmation mot de passe..."
            className="input margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          />

          <div
            className="button margin_auto"
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

      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageInscription;
