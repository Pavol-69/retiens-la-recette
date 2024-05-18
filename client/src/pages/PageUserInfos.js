// Components
import PiedDePage from "../components/PiedDePage";
import BarreNavigation from "../components/BarreNavigation";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Connexion.css";

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
      const response = await fetch("/dashboard/userInfos", {
        method: "GET",
        headers: { token: localStorage.token },
      });

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
      const response = await fetch("/dashboard/deleteUser", {
        method: "POST",
        headers: { token: localStorage.token },
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/dashboard/updateInfos", {
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
      });

      const parseRes = await response.json();
      if (parseRes === true) {
        toast.success("Informations mises à jour");
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
      />
      <Bandeau mySize="big" />
      <div className="board">
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Prénom
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="text"
              name="name"
              placeholder="Prénom"
              value={name}
            ></input>
          </div>

          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Nom de Famille
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="text"
              name="family_name"
              placeholder="Nom"
              value={family_name}
            ></input>
          </div>

          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Pseudo
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              value={pseudo}
            ></input>
          </div>

          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Adresse Mail
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="mail"
              name="mail"
              placeholder="Adresse Mail"
              value={mail}
            ></input>
          </div>

          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de passe, première saisie
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password1"
              placeholder="Mot de passe"
            ></input>
          </div>

          <div className="renseignement_connexion">
            <label className="label_connexion couleur_texte gras texte_taille_3 texte_centre">
              Mot de passe, seconde saisie
            </label>
            <input
              className={
                tailleTel
                  ? "input_connexion_tel texte_taille_2"
                  : "input_connexion texte_taille_2"
              }
              onChange={(e) => myOnChange(e)}
              type="password"
              name="password2"
              placeholder={
                tailleTel
                  ? "Mot de passe, seconde saisie"
                  : "Veuillez renseigner votre mot de passe à nouveau"
              }
            ></input>
          </div>
          <div className="pqt_bouton_connexion ligne">
            <div
              className={
                tailleTel
                  ? "bouton_board_tel non_selectionnable"
                  : "bouton_board non_selectionnable"
              }
              id="bouton_validation"
              onClick={(e) => onSubmitForm(e)}
            >
              Valider
            </div>
            <div
              className={
                tailleTel
                  ? "bouton_board_tel non_selectionnable"
                  : "bouton_board non_selectionnable"
              }
              onClick={(e) => desinscription(e)}
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
      <MenuAjoutRecette toShow={toShow} setToShow={setToShow} pseudo={pseudo} />
      <PiedDePage />
    </div>
  );
}

export default PageUserInfos;
