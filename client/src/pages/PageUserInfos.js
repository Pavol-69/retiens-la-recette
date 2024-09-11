// Components
import PiedDePage from "../components/PiedDePage";
import BarreNavigation from "../components/BarreNavigation";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/UserInfo.css";

// Autre
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function PageUserInfos({
  isAuth,
  setIsAuth,
  myPseudo,
  setPseudo,
  role,
  toShow,
  setToShow,
  nbNotif,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
  setDark,
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

  useEffect(() => {
    getUserInfos();
  }, []);

  async function getUserInfos() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/dashboard/userInfos",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      setMyInfo({
        ...myInfo,
        name: parseRes.user_name,
        family_name: parseRes.user_family_name,
        pseudo: parseRes.user_pseudo,
        mail: parseRes.user_mail,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteUser() {
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/dashboard/deleteUser",
        {
          method: "POST",
          headers: { token: localStorage.token },
        }
      );

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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://lesrecettesdesabine-1b41199a24fd.herokuapp.com/dashboard/updateInfos",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
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
      if (parseRes === true) {
        toast.success("Informations mises à jour");
        window.location.replace("/");
      } else {
        toast.error(parseRes);
      }

      if (pseudo !== "") {
        setPseudo(pseudo);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function myOnChange(e) {
    setMyInfo({ ...myInfo, [e.target.name]: e.target.value });
  }

  function desinscription(e) {
    e.preventDefault();
    if (deleteUser()) {
      localStorage.removeItem("token");
      setIsAuth(false);
      toast.info("Désinscrit(e).");
    }
  }

  return (
    <div className="relatif">
      <Bandeau mySize="medium" dark={dark} />
      <div className="board">
        <form className="grid_user" onSubmit={(e) => onSubmitForm(e)}>
          <div></div>
          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Prénom
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="text"
              name="name"
              placeholder="Prénom"
              value={name}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
            />
          </div>

          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Nom de Famille
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="text"
              name="family_name"
              placeholder="Nom"
              value={family_name}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
            />
          </div>

          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Pseudo
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              value={pseudo}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
            />
          </div>

          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Adresse Mail
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="mail"
              name="mail"
              placeholder="Adresse Mail"
              value={mail}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
            />
          </div>

          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Mot de passe, première saisie
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password1"
              placeholder="Mot de passe"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
            />
          </div>

          <div
            className="sub_grid_user"
            style={{ width: tailleTel ? "350px" : "600px" }}
          >
            <label
              className="gras texte_taille_3 texte_centre"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Mot de passe, seconde saisie
            </label>
            <input
              className="input"
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password2"
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
                backgroundColor: `var(--${dark ? "blk" : "wht"})`,
              }}
              placeholder={
                tailleTel
                  ? "Mot de passe, seconde saisie"
                  : "Veuillez renseigner votre mot de passe à nouveau"
              }
            />
          </div>
          <div className="pqt_bouton_user elements_centre ligne">
            <div
              className="button"
              id="bouton_validation"
              onClick={(e) => onSubmitForm(e)}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Valider
            </div>
            <div
              className="button"
              onClick={(e) => desinscription(e)}
              style={{
                color: `var(--${dark ? "wht" : "blk"})`,
              }}
            >
              Désinscription
            </div>
          </div>
          <button
            onClick={(e) => onSubmitForm(e)}
            style={{ visibility: "hidden" }}
          ></button>
        </form>
      </div>
      <BarreNavigation
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        pseudo={myInfo.pseudo}
        role={role}
        toShow={toShow}
        setToShow={setToShow}
        nbNotif={nbNotif}
        tailleOrdi={tailleOrdi}
        tailleTel={tailleTel}
        tailleInt1={tailleInt1}
        tailleInt2={tailleInt2}
        dark={dark}
        setDark={setDark}
      />
      <MenuAjoutRecette
        toShow={toShow}
        setToShow={setToShow}
        pseudo={pseudo}
        dark={dark}
        setDark={setDark}
      />
      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageUserInfos;
