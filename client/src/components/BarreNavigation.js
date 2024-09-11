// Components
import BoutonLien from "./BoutonMenu";
import Burger from "./Burger";
import Notif from "./Notif";
import DarkLight from "./DarkLight";

// CSS
import "../styles/BarreNavigation.scss";
import "../styles/BoutonMenu.css";
import "../styles/CSSGeneral.css";

// Autres
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import styled, { css, keyframes } from "styled-components";

const delayAnim = 150;

const Anim = styled.div`
  ${(props) =>
    props.$isLoaded
      ? props.$menu
        ? css`
            animation: ${props.$top > -1
                ? rctShow(props.$top)
                : `show_${props.$type}`}
              0.4s forwards ease-in-out;
            animation-delay: ${(props.$nb - 1) * delayAnim}ms;
          `
        : css`
            animation: ${props.$top > -1
                ? rctHide(props.$top)
                : `hide_${props.$type}`}
              0.4s forwards ease-in-out;
            animation-delay: ${(props.$nbTot - props.$nb) * delayAnim}ms;
          `
      : null}
`;

const rctShow = (top) => keyframes`
  0% {
    opacity: 0;
    top: -65px;
  }

  100% {
    opacity: 1;
    top: ${top}px;
  }
`;

const rctHide = (top) => keyframes`
  0% {
    opacity: 1;
    top: ${top}px;
  }

  100% {
    opacity: 0;
    top: -65px;
  }
`;

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
  dark,
  setDark,
}) {
  const [shaking, setShaking] = useState(false);
  const [shakingRct, setShakingRct] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const [menuRecette, setMenuRecette] = useState(false);
  const [menuBurger, setMenuBurger] = useState(false);
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadedRct, setIsLoadedRct] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (menuUser) {
      setIsLoadedUser(true);
    }
    if (menuBurger) {
      setIsLoaded(true);
    }
    if (menuRecette) {
      setIsLoadedRct(true);
    }
    if (!tailleTel) {
      setMenuBurger(false);
      setIsLoaded(false);
    } else {
      setMenuRecette(false);
      setIsLoadedRct(false);
    }
  }, [menuUser, menuBurger, menuRecette, tailleTel]);

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
      setMenuBurger(false);
      setMenuRecette(false);
    }
  }

  function affichageMenuRct(e) {
    if (menuRecette) {
      setMenuRecette(false);
    } else {
      setMenuRecette(true);
      setMenuUser(false);
      setMenuBurger(false);
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

  function onBlurEvent(e) {
    e.preventDefault();
    setMenuBurger(false);
    setMenuUser(false);
    setMenuRecette(false);
  }

  return isAuth && role !== "rejected" && role !== "to_define" ? (
    <div
      className="non_selectionnable"
      onBlur={(e) => onBlurEvent(e)}
      tabIndex={0}
    >
      <header>
        {tailleTel ? (
          <div className="bandeau_header">
            {role !== "reader" ? (
              <div
                onClick={(e) => setMenuUser(false)}
                style={{ width: "80px", position: "absolute" }}
              >
                <Burger
                  tailleTel={tailleTel}
                  menuBurger={menuBurger}
                  setMenuBurger={setMenuBurger}
                  isLoaded={isLoaded}
                />
                {nbNotif > 0 && role === "admin" && !menuBurger ? (
                  <Notif nbNotif={nbNotif} />
                ) : null}
              </div>
            ) : null}
            <div className="centre_mobile elements_centre">
              <div style={{ height: "100%", width: "170px" }}>
                <BoutonLien myLink={"/"} myTitle={"Accueil"} />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              tailleOrdi || tailleInt1
                ? "bandeau_header elements_centre"
                : "bandeau_header align_gauche"
            }
          >
            <BoutonLien myLink={"/"} myTitle={"Accueil"} />
            {allowToModify ? (
              <div style={{ height: "100%" }}>
                <div
                  id="id_menu_recette"
                  className="bouton_menu ligne"
                  onMouseEnter={() => setShakingRct(true)}
                  onMouseLeave={() => setShakingRct(false)}
                  onClick={(e) => {
                    affichageMenuRct(e);
                  }}
                >
                  <div>Recette</div>
                  <div className="fleche_menu_user">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      bounce={shakingRct}
                      size="lg"
                      style={{ color: "var(--wht)" }}
                    />
                  </div>
                </div>
                <Anim
                  className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
                  $nb={3}
                  $nbTot={3}
                  $isLoaded={isLoadedRct}
                  $menu={menuRecette}
                  $type="rct"
                  $top={192}
                  style={{
                    top: isLoadedRct
                      ? menuRecette
                        ? "-65px"
                        : "192px"
                      : "-65px",
                  }}
                  onClick={(e) => {
                    SuppressionRecette(e);
                    setMenuRecette(false);
                  }}
                >
                  Supprimer Recette
                </Anim>
                <Anim
                  className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
                  $nb={2}
                  $nbTot={3}
                  $isLoaded={isLoadedRct}
                  $menu={menuRecette}
                  $type="rct"
                  $top={131}
                  style={{
                    top: isLoadedRct
                      ? menuRecette
                        ? "-65px"
                        : "131px"
                      : "-65px",
                  }}
                  onClick={(e) => {
                    modifyButton(e);
                    setMenuRecette(false);
                  }}
                >
                  Modifier Recette
                </Anim>
                <Anim
                  id="btn_deco"
                  className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
                  $nb={1}
                  $nbTot={3}
                  $isLoaded={isLoadedRct}
                  $menu={menuRecette}
                  $type="rct"
                  $top={70}
                  style={{
                    top: isLoadedRct
                      ? menuRecette
                        ? "-65px"
                        : "70px"
                      : "-65px",
                  }}
                  onClick={(e) => {
                    newRecipe(e);
                    setMenuRecette(false);
                  }}
                >
                  Nouvelle Recette
                </Anim>
              </div>
            ) : (role === "admin" || role === "writer") && !allowToModify ? (
              <div
                className="bouton_menu"
                style={{ height: "100%" }}
                onClick={(e) => newRecipe(e)}
              >
                Nouvelle Recette
              </div>
            ) : null}

            {role === "admin" ? (
              <div className="paquet_btn_admin">
                <BoutonLien myLink={"/admin"} myTitle={"Admin"} />
                {nbNotif > 0 ? <Notif nbNotif={nbNotif} /> : null}
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
        <div className="paquet_user_dl elements_centre ligne">
          <div className="ctn_dl elements_centre">
            <DarkLight dark={dark} setDark={setDark} />
          </div>
          <div
            className="paquet_user elements_centre ligne"
            onClick={(e) => {
              affichageMenuUser(e);
            }}
          >
            <FontAwesomeIcon
              className="icone_user"
              size={tailleTel ? "2x" : "2x"}
              icon={faUser}
              style={{ color: "var(--wht)" }}
            />
            {!tailleTel ? (
              <div className="ligne">
                <div className="user texte_taille_2 non_selectionnable">
                  {pseudo}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div>
        <Anim
          id="btn_deco"
          className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
          $nb={2}
          $nbTot={2}
          $isLoaded={isLoadedUser}
          $menu={menuUser}
          $type="user"
          $top={-1}
          style={{
            right: isLoadedUser ? (menuUser ? "-220px" : "0px") : "-220px",
          }}
          onClick={(e) => logout(e)}
        >
          Déconnexion
        </Anim>
        <Anim
          id="btn_info"
          className="bouton_menu_deroulant texte_taille_2"
          $nb={1}
          $nbTot={2}
          $isLoaded={isLoadedUser}
          $menu={menuUser}
          $type="user"
          $top={-1}
          style={{
            right: isLoadedUser ? (menuUser ? "-220px" : "0px") : "-220px",
          }}
        >
          <Link
            className="link link_menu padding_btn_hd elements_centre"
            to="/mes-infos"
            style={{ height: "100%" }}
          >
            Mes informations
          </Link>
        </Anim>
        {role !== "reader" ? (
          <div
            id="id_menu_burger"
            onBlur={(e) => {
              setMenuBurger(false);
            }}
          >
            {allowToModify ? (
              <div>
                <Anim
                  className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
                  $nb={role === "admin" ? 5 : 3}
                  $nbTot={role === "admin" ? 5 : 3}
                  $isLoaded={isLoaded}
                  $menu={menuBurger}
                  $type="burger"
                  $top={-1}
                  style={{
                    left: isLoaded ? (menuBurger ? "-220px" : "0px") : "-220px",
                    top: role === "admin" ? "314px" : "194px",
                  }}
                  onClick={(e) => {
                    SuppressionRecette(e);
                    setMenuBurger(false);
                  }}
                >
                  Supprimer recette
                </Anim>
                <Anim
                  className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
                  $nb={role === "admin" ? 4 : 2}
                  $nbTot={role === "admin" ? 5 : 3}
                  $isLoaded={isLoaded}
                  $menu={menuBurger}
                  $type="burger"
                  $top={-1}
                  style={{
                    left: isLoaded ? (menuBurger ? "-220px" : "0px") : "-220px",
                    top: role === "admin" ? "253px" : "133px",
                  }}
                  onClick={(e) => {
                    modifyButton(e);
                    setMenuBurger(false);
                  }}
                >
                  Modifier recette
                </Anim>
              </div>
            ) : null}
            <Anim
              className="bouton_menu_deroulant texte_taille_2 padding_btn_hd"
              $nb={role === "admin" ? 3 : 1}
              $nbTot={
                allowToModify
                  ? role === "admin"
                    ? 5
                    : 3
                  : role === "admin"
                  ? 3
                  : 1
              }
              $isLoaded={isLoaded}
              $menu={menuBurger}
              $type="burger"
              $top={-1}
              style={{
                left: isLoaded ? (menuBurger ? "-220px" : "0px") : "-220px",
                top: role === "admin" ? "192px" : "70px",
              }}
              onClick={(e) => newRecipe(e)}
            >
              Nouvelle Recette
            </Anim>
            {role === "admin" ? (
              <div>
                <Anim
                  id="btn_cat"
                  className="bouton_menu_deroulant texte_taille_2"
                  $nb={2}
                  $nbTot={allowToModify ? 5 : 3}
                  $isLoaded={isLoaded}
                  $menu={menuBurger}
                  $type="burger"
                  $top={-1}
                  style={{
                    left: isLoaded ? (menuBurger ? "-220px" : "0px") : "-220px",
                  }}
                >
                  <Link
                    className="link link_menu padding_btn_hd"
                    to="/categorie"
                  >
                    Catégories
                  </Link>
                </Anim>
                <Anim
                  id="btn_admin"
                  className="bouton_menu_deroulant texte_taille_2"
                  $nb={1}
                  $nbTot={allowToModify ? 5 : 3}
                  $isLoaded={isLoaded}
                  $menu={menuBurger}
                  $type="burger"
                  $top={-1}
                  style={{
                    left: isLoaded ? (menuBurger ? "-220px" : "0px") : "-220px",
                  }}
                >
                  <Link className="link link_menu padding_btn_hd" to="/admin">
                    {`Admin ( ${nbNotif} )`}
                  </Link>
                </Anim>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <header></header>
  );
}

export default BarreNavigation;
