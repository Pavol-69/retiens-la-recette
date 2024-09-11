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
import { Link } from "react-router-dom";

function PageConnexion({
  setIsAuth,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
  setDark,
}) {
  const [myInfo, setMyInfo] = useState({
    mail: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);

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
          remember: remember,
        }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
        setDark(parseRes.userDark);
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

  function onChangeRemember(e) {
    //e.preventDefault();
    if (remember) {
      setRemember(false);
    } else {
      setRemember(true);
    }
  }

  return (
    <div className="relatif">
      <Bandeau mySize="medium" dark={dark} />
      <div className="grid_connexion board">
        <Titre
          tailleTel={tailleTel}
          tailleInt1={tailleInt1}
          tailleInt2={tailleInt2}
          tailleOrdi={tailleOrdi}
        />
        <form
          className="grid_connexion_form margin_auto"
          style={{ width: tailleTel ? "350px" : "450px" }}
          onSubmit={(e) => onSubmitForm(e)}
        >
          <input
            className="input margin_auto"
            onChange={myOnChange}
            type="mail"
            name="mail"
            placeholder="Adresse mail..."
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          ></input>

          <input
            className="input margin_auto"
            onChange={myOnChange}
            type="password"
            name="password"
            placeholder="Mot de passe..."
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
              backgroundColor: dark ? "var(--blk)" : "var(--wht)",
            }}
          ></input>

          <div className="remember_mdp_oublie_line elements_centre margin_auto">
            <div className="remember element_centre ligne">
              <input
                className="checkbox"
                type="checkbox"
                checked={remember}
                onChange={(e) => onChangeRemember(e)}
              />
              <span
                className="elements_centre"
                style={{ color: dark ? "var(--wht)" : "var(--blk)" }}
              >
                Se souvenir de moi
              </span>
            </div>

            <Link
              className="mdp_oublie texte_taille_1 elements_centre"
              to="/mot_de_passe_oublie"
            >
              Mot de Passe oublié ?
            </Link>
          </div>
          <div
            className="button non_selectionnable margin_auto"
            id="bouton_connexion"
            onClick={(e) => onSubmitForm(e)}
            style={{ color: dark ? "var(--wht)" : "var(--blk)" }}
          >
            Connexion
          </div>
          <span
            className="margin_auto"
            style={{
              color: dark ? "var(--wht)" : "var(--blk)",
            }}
          >
            Pas encore de compte ?
          </span>
          <Link
            className="to_inscription texte_taille_1 elements_centre"
            to="/inscription"
          >
            S'inscrire
          </Link>
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

export default PageConnexion;
