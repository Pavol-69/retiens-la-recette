// Components
import BarreNavigation from "../components/BarreNavigation";
import PiedDePage from "../components/PiedDePage";
import MenuAjoutRecette from "../components/MenuAjoutRecette";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/Admin.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function PageAdmin({
  isAuth,
  setIsAuth,
  pseudo,
  role,
  toShow,
  setToShow,
  nbNotif,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
}) {
  const [myUsers, setMyUsers] = useState([]);

  async function getAllUsersInfos() {
    try {
      const response = await fetch("/dashboard/allUsersInfos", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes.rows.sort();
      setMyUsers(parseRes.rows);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllUsersInfos();
  }, []);

  async function handleChange(e, user_id) {
    try {
      const response = await fetch("/dashboard/changeRole", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          user_id: user_id,
          role: e.target.value,
        }),
      });

      const parseRes = await response.json();
      if (parseRes) {
        if (parseRes.token) {
          toast.success("Connexion réussie");
        } else {
          toast.error(parseRes);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="relatif">
      <BarreNavigation
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        pseudo={pseudo}
        role={role}
        toShow={toShow}
        setToShow={setToShow}
        nbNotif={nbNotif}
        tailleOrdi={tailleOrdi}
        tailleTel={tailleTel}
        tailleInt1={tailleInt1}
        tailleInt2={tailleInt2}
      />
      <Bandeau mySize="small" />
      <div className="board">
        <div id="fond_menu_admin" className="fond_menu">
          <div
            className={
              tailleTel
                ? "ligne_user_tel ligne souligne gras texte_taille_1"
                : "ligne_user ligne souligne gras texte_taille_3"
            }
          >
            <div
              className={
                tailleTel ? "prenom_user_tel texte_centre" : "prenom_user"
              }
            >
              Prenom
            </div>
            <div
              className={tailleTel ? "nom_user_tel texte_centre" : "nom_user"}
            >
              Nom
            </div>
            <div
              className={
                tailleTel ? "pseudo_user_tel texte_centre" : "pseudo_user"
              }
            >
              Pseudo
            </div>
            <div
              className={tailleTel ? "role_user_tel texte_centre" : "role_user"}
            >
              Rôle
            </div>
          </div>
          {myUsers.map((user, index) =>
            user.user_mail !== "paul.valy@gmail.com" ? (
              <div
                className={
                  tailleTel
                    ? "ligne_user_tel ligne texte_taille_1"
                    : "ligne_user ligne gras texte_taille_2"
                }
                key={index}
              >
                <div
                  className={
                    tailleTel ? "prenom_user_tel texte_centre" : "prenom_user"
                  }
                >
                  {user.user_name}
                </div>
                <div
                  className={
                    tailleTel ? "nom_user_tel texte_centre" : "nom_user"
                  }
                >
                  {user.user_family_name}
                </div>
                <div
                  className={
                    tailleTel ? "pseudo_user_tel texte_centre" : "pseudo_user"
                  }
                >
                  {user.user_pseudo}
                </div>
                <select
                  onChange={(e) => handleChange(e, user.user_id)}
                  defaultValue={user.user_role}
                >
                  <option value="to_define">A Définir</option>
                  <option value="rejected">Rejeté</option>
                  <option value="reader">Lecteur</option>
                  <option value="writer">Rédacteur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            ) : null
          )}
        </div>
      </div>
      <MenuAjoutRecette toShow={toShow} setToShow={setToShow} pseudo={pseudo} />
      <PiedDePage />
    </div>
  );
}

export default PageAdmin;
