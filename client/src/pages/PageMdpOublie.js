// Components
import PiedDePage from "../components/PiedDePage";
import Titre from "../components/Titre";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Connexion.css";

// Autre
import React, { useState } from "react";
import { toast } from "react-toastify";

function PageMdpOublie({
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
}) {
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
      <Bandeau mySize={"medium"} dark={dark} />

      <div className="grid_mdp_oublie board">
        <Titre
          tailleTel={tailleTel}
          tailleInt1={tailleInt1}
          tailleInt2={tailleInt2}
          tailleOrdi={tailleOrdi}
        />
        <div className="txt_mdp_oublie texte_taille_2 texte_centre margin_auto">
          Merci de renseigner votre e-mail, nous allons réinitialiser votre mot
          de passe.
        </div>
        <form
          className="grid_mdp_oublie_form margin_auto"
          style={{ width: tailleTel ? "350px" : "450px" }}
          onSubmit={onSubmitForm}
        >
          <div className="renseignement_connexion elements_centre colonne">
            <input
              className="input margin_auto"
              type="mail"
              name="mail"
              placeholder="Adresse mail..."
              onChange={myOnChange}
              style={{
                color: dark ? "var(--wht)" : "var(--blk)",
                backgroundColor: dark ? "var(--blk)" : "var(--wht)",
              }}
            ></input>
          </div>
          <div onClick={onSubmitForm} className="button margin_auto">
            Envoyer Mail
          </div>
        </form>
      </div>

      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageMdpOublie;
