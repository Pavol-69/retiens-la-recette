// Components
import BoutonLien from "./BoutonMenu";

// CSS
import "../styles/BarreNavigation.css";
import "../styles/BoutonMenu.css";

// Autres
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import {
  faChevronDown,
  faBars,
  faUser,
  faPlus,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

function BarreNavigation({
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
  allowToModify,
  modify,
  setModify,
  ouvertureModif,
  setChangingDelete,
}) {
  const [shaking, setShaking] = useState(false);
  const [shakingRct, setShakingRct] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const [menuHeader, setMenuHeader] = useState(false);
  const [menuRecette, setMenuRecette] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    toast.info("Déconnecté(e).");
  };

  const newRecipe = (e) => {
    e.preventDefault();
    setToShow(true);
  };

  function affichageMenuUser(e) {
    if (menuUser) {
      setMenuUser(false);
    } else {
      setMenuUser(true);
    }
  }

  function affichageMenuHeader(e) {
    if (menuHeader) {
      setMenuHeader(false);
    } else {
      setMenuHeader(true);
    }
  }

  function affichageMenuRct(e) {
    if (menuRecette) {
      setMenuRecette(false);
    } else {
      setMenuRecette(true);
    }
  }

  function modifyButton(e) {
    if (modify) {
      setModify(false);
    } else {
      setModify(true);
    }
  }

  function SuppressionRecette(e) {
    e.preventDefault();
    ouvertureModif(true);
    setChangingDelete(true);
  }

  return isAuth && role !== "rejected" && role !== "to_define" ? (
    <header>
      {tailleTel ? (
        <div className="bandeau_header align_gauche">
          {allowToModify || role === "admin" ? (
            <div>
              <FontAwesomeIcon
                onClick={(e) => {
                  affichageMenuHeader(e);
                }}
                id="menu_header"
                icon={faBars}
              />
              {allowToModify ? (
                <FontAwesomeIcon
                  onClick={(e) => modifyButton(e)}
                  id="btn_icon_modify"
                  icon={faPenToSquare}
                  style={{ color: "var(--color-text)" }}
                />
              ) : null}

              {nbNotif > 0 && role === "admin" ? (
                <div className="notif gras" style={{ left: "34px" }}>
                  {nbNotif}
                </div>
              ) : null}
              {menuHeader ? (
                <div
                  className="menu_deroulant elements_centre colonne"
                  id="id_menu_user"
                  onBlur={(e) => {
                    setMenuHeader(false);
                  }}
                >
                  <div
                    className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                    onClick={(e) => newRecipe(e)}
                  >
                    Nouvelle Recette
                  </div>
                  {allowToModify ? (
                    <div
                      className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                      onClick={(e) => SuppressionRecette(e)}
                    >
                      Supprimer Recette
                    </div>
                  ) : null}

                  {role === "admin" ? (
                    <div>
                      <Link
                        className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                        to="/admin"
                      >
                        {"Admin (" + nbNotif + ")"}
                      </Link>
                      <Link
                        className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                        to="/categorie"
                      >
                        Catégories
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : role === "writer" ? (
            <FontAwesomeIcon
              onClick={(e) => newRecipe(e)}
              id="btn_plus"
              icon={faPlus}
            />
          ) : null}
          <div
            className="centre_mobile elements_centre"
            style={{
              left: allowToModify
                ? "100px"
                : role === "writer" || role === "admin"
                ? "50px"
                : "0px",
            }}
          >
            <div style={{ height: "100%", width: "170px" }}>
              <BoutonLien myLink={"/"} myTitle={"Accueil"} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            tailleOrdi
              ? "bandeau_header elements_centre"
              : "bandeau_header align_gauche"
          }
        >
          <BoutonLien myLink={"/"} myTitle={"Accueil"} />
          {tailleInt2 && !tailleInt1 && allowToModify ? (
            <div
              className="ligne elements_centre"
              onMouseEnter={() => setShakingRct(true)}
              onMouseLeave={() => setShakingRct(false)}
              onClick={(e) => {
                affichageMenuRct(e);
              }}
            >
              <div className="bouton_menu">
                Recette
                <div className="fleche_menu_user">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    bounce={shakingRct}
                    size="lg"
                    style={{ color: "var(--color-text)" }}
                  />
                </div>
              </div>
              {menuRecette ? (
                <div
                  className="menu_deroulant elements_centre colonne"
                  id="id_menu_user"
                  onBlur={(e) => {
                    setMenuRecette(false);
                  }}
                >
                  <div
                    className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                    onClick={(e) => modifyButton(e)}
                  >
                    Modifier Recette
                  </div>
                  <div
                    className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                    onClick={(e) => newRecipe(e)}
                  >
                    Nouvelle Recette
                  </div>
                  <div
                    className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
                    onClick={(e) => SuppressionRecette(e)}
                  >
                    Supprimer Recette
                  </div>
                </div>
              ) : null}
            </div>
          ) : (role === "admin" || role === "writer") && !allowToModify ? (
            <div
              className="bouton_menu"
              style={{ height: "100%" }}
              onClick={(e) => newRecipe(e)}
            >
              Nouvelle Recette
            </div>
          ) : allowToModify ? (
            <div className="ligne" style={{ height: "100%" }}>
              <div className="bouton_menu" onClick={(e) => newRecipe(e)}>
                Nouvelle Recette
              </div>
              <div className="bouton_menu" onClick={(e) => modifyButton(e)}>
                Modifier la recette
              </div>
              <div
                className="bouton_menu"
                onClick={(e) => SuppressionRecette(e)}
              >
                Supprimer la recette
              </div>
            </div>
          ) : null}

          {role === "admin" ? (
            <div className="paquet_btn_admin">
              <BoutonLien myLink={"/admin"} myTitle={"Admin"} />
              {nbNotif > 0 ? (
                <div className="notif gras" style={{ right: "0px" }}>
                  {nbNotif}
                </div>
              ) : null}
            </div>
          ) : null}
          {role === "admin" ? (
            <BoutonLien
              myLink={"/categorie"}
              myTitle={"Gestion des Catégories"}
            />
          ) : null}
        </div>
      )}

      <div
        className="paquet_user elements_centre ligne"
        style={{
          right: !tailleTel ? "20px" : "0px",
        }}
        onMouseEnter={() => setShaking(true)}
        onMouseLeave={() => setShaking(false)}
        onClick={(e) => {
          affichageMenuUser(e);
        }}
      >
        <FontAwesomeIcon
          className="icone_user"
          size={tailleTel ? "2x" : "lg"}
          icon={faUser}
          style={{ color: "var(--color-text)" }}
        />
        {!tailleTel ? (
          <div className="ligne">
            <div className="couleur_texte gras texte_taille_1">{pseudo}</div>

            <div className="fleche_menu_user">
              <FontAwesomeIcon
                icon={faChevronDown}
                bounce={shaking}
                size="lg"
                style={{ color: "var(--color-text)" }}
              />
            </div>
          </div>
        ) : null}
        {menuUser ? (
          <div
            className="menu_deroulant elements_centre colonne"
            style={{ right: tailleTel ? "0px" : null }}
            id="id_menu_user"
            onBlur={(e) => {
              setMenuUser(false);
            }}
          >
            <Link
              className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
              to="/mes-infos"
            >
              Mes informations
            </Link>
            <Link
              onClick={(e) => logout(e)}
              className="bouton_menu_deroulant elements_centre texte_taille_1 gras"
              to="/"
            >
              Déconnexion
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  ) : (
    <header></header>
  );
}

export default BarreNavigation;
