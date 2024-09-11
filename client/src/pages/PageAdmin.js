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
  dark,
  setDark,
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
      <Bandeau mySize="medium" dark={dark} />
      <div className="board">
        <div
          id="fond_menu_admin"
          className="grid_admin_col"
          style={{
            backgroundColor: `rgb(${dark ? "30,30,30" : "250,250,250"},0.7)`,
            color: `var(--${dark ? "wht" : "blk"})`,
            width: tailleTel ? "100%" : !tailleInt1 ? "800px" : "1200px",
            borderRadius: tailleTel ? "0px" : "20px",
          }}
        >
          <div className="col_admin">
            <div
              className="titre_col"
              style={{
                fontSize: tailleTel ? "1.2em" : !tailleInt1 ? "1.3em" : "1.5em",
              }}
            >
              Prenom
            </div>
            {myUsers.map((user, index) =>
              user.user_mail !== "paul.valy@gmail.com" ? (
                <div
                  className="elm_col"
                  key={index}
                  style={{
                    fontSize: tailleTel
                      ? "1em"
                      : !tailleInt1
                      ? "1.2em"
                      : "1.4em",
                  }}
                >
                  {user.user_name}
                </div>
              ) : null
            )}
          </div>

          <div className="col_admin">
            <div
              className="titre_col"
              style={{
                fontSize: tailleTel ? "1.2em" : !tailleInt1 ? "1.3em" : "1.5em",
              }}
            >
              Nom
            </div>
            {myUsers.map((user, index) =>
              user.user_mail !== "paul.valy@gmail.com" ? (
                <div
                  className="elm_col"
                  key={index}
                  style={{
                    fontSize: tailleTel
                      ? "1em"
                      : !tailleInt1
                      ? "1.2em"
                      : "1.4em",
                  }}
                >
                  {user.user_family_name}
                </div>
              ) : null
            )}
          </div>

          <div className="col_admin">
            <div
              className="titre_col"
              style={{
                fontSize: tailleTel ? "1.2em" : !tailleInt1 ? "1.3em" : "1.5em",
              }}
            >
              Pseudo
            </div>
            {myUsers.map((user, index) =>
              user.user_mail !== "paul.valy@gmail.com" ? (
                <div
                  className="elm_col"
                  key={index}
                  style={{
                    fontSize: tailleTel
                      ? "1em"
                      : !tailleInt1
                      ? "1.2em"
                      : "1.4em",
                  }}
                >
                  {user.user_pseudo}
                </div>
              ) : null
            )}
          </div>

          <div className="col_admin">
            <div
              className="titre_col"
              style={{
                fontSize: tailleTel ? "1.2em" : !tailleInt1 ? "1.3em" : "1.5em",
              }}
            >
              Rôle
            </div>
            {myUsers.map((user, index) =>
              user.user_mail !== "paul.valy@gmail.com" ? (
                <div key={index} className="elm_col">
                  <select
                    className="select_role"
                    onChange={(e) => handleChange(e, user.user_id)}
                    defaultValue={user.user_role}
                    style={{
                      backgroundColor: `var(--${dark ? "blk" : "wht"})`,
                      color: `var(--${dark ? "wht" : "blk"})`,
                      fontSize: tailleTel
                        ? "1em"
                        : !tailleInt1
                        ? "1.2em"
                        : "1.4em",
                      height: tailleTel
                        ? "30px"
                        : !tailleInt1
                        ? "35px"
                        : "40px",
                      paddingLeft: tailleTel ? "5px" : "10px",
                    }}
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
      </div>
      <MenuAjoutRecette
        toShow={toShow}
        setToShow={setToShow}
        pseudo={pseudo}
        dark={dark}
      />
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
        dark={dark}
        setDark={setDark}
      />
      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageAdmin;
