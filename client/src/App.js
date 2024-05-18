// Components
import PageCreationRecette from "./pages/PageCreationRecette";
import PageConnexion from "./pages/PageConnexion";
import PageInscription from "./pages/PageInscription";
import PageAdmin from "./pages/PageAdmin";
import PagePrincipale from "./pages/PagePrincipale";
import PageUserInfos from "./pages/PageUserInfos";
import PrivateRoute from "./auth/PrivateRoute";
import PublicRoute from "./auth/PublicRoute";
import AdminRoute from "./auth/AdminRoute";
import OnGoingRoute from "./auth/OnGoingRoute";
import OnGoingRouteReverse from "./auth/OnGoingRouteReverse";
import PageMdpOublie from "./pages/PageMdpOublie";
import PageResetPassword from "./pages/PageResetPassword";
import PageGestionCategorie from "./pages/PageGestionCategorie";
import PageNonAccepte from "./pages/PageNonAccepte";
import PagePortail from "./pages/PagePortail";

//CSS
import "./styles/CSSGeneral.css";
import "./styles/index.css";

// Autre
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

function App() {
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [nbNotif, setNbNotif] = useState(0);
  const [toShow, setToShow] = useState(false);
  const tailleOrdi = useMediaQuery({ query: "(min-width: 1475px)" });
  const tailleInt1 = useMediaQuery({
    query: "(min-width: 1275px)",
  });
  const tailleInt2 = useMediaQuery({
    query: "(min-width: 851px)",
  });
  const tailleTel = useMediaQuery({ query: "(max-width: 850px)" });

  /*if (!isLoadedInfo || !isLoadedAuth) {
    return null;
  }*/

  //if (isLoadedInfo && isLoadedAuth) {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setPseudo={setPseudo}
                setRole={setRole}
                setNbNotif={setNbNotif}
              ></PrivateRoute>
            }
          >
            <Route path="/" element={<OnGoingRoute role={role} />}>
              <Route
                path="/"
                element={
                  <PagePrincipale
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
                }
              />
              <Route
                path="/recette/:rct_id"
                element={
                  <PageCreationRecette
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
                }
              />
              <Route
                path="/mes-infos"
                element={
                  <PageUserInfos
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    MyPseudo={pseudo}
                    setPseudo={setPseudo}
                    role={role}
                    toShow={toShow}
                    setToShow={setToShow}
                    nbNotif={nbNotif}
                    tailleOrdi={tailleOrdi}
                    tailleTel={tailleTel}
                    tailleInt1={tailleInt1}
                    tailleInt2={tailleInt2}
                  />
                }
              />

              <Route
                path="/admin"
                element={<AdminRoute isAuth={isAuth} role={role} />}
              >
                <Route
                  path="/admin"
                  element={
                    <PageAdmin
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
                  }
                />
              </Route>
              <Route
                path="/categorie"
                element={<AdminRoute isAuth={isAuth} role={role} />}
              >
                <Route
                  path="/categorie"
                  element={
                    <PageGestionCategorie
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
                  }
                />
              </Route>
            </Route>

            <Route
              path="/non_accepte"
              element={<OnGoingRouteReverse role={role} />}
            >
              <Route
                path="/non_accepte"
                element={
                  <PageNonAccepte
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                    pseudo={pseudo}
                    role={role}
                    toShow={toShow}
                    setToShow={setToShow}
                    tailleOrdi={tailleOrdi}
                    tailleTel={tailleTel}
                    tailleInt1={tailleInt1}
                    tailleInt2={tailleInt2}
                  />
                }
              />
            </Route>
          </Route>

          <Route
            path="/portail_connexion"
            element={<PublicRoute isAuth={isAuth} />}
          >
            <Route
              path="/portail_connexion"
              element={
                <PagePortail
                  tailleOrdi={tailleOrdi}
                  tailleTel={tailleTel}
                  tailleInt1={tailleInt1}
                  tailleInt2={tailleInt2}
                />
              }
            />
            <Route
              path="/portail_connexion/inscription"
              element={
                <PageInscription setIsAuth={setIsAuth} tailleTel={tailleTel} />
              }
            />

            <Route
              path="/portail_connexion/connexion"
              element={
                <PageConnexion setIsAuth={setIsAuth} tailleTel={tailleTel} />
              }
            />
            <Route
              path="/portail_connexion/mot_de_passe_oublie"
              element={<PageMdpOublie tailleTel={tailleTel} />}
            />
            <Route
              path="/portail_connexion/reinitialisation_mot_de_passe/:resetKey"
              element={
                <PageResetPassword
                  tailleTel={tailleTel}
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </React.StrictMode>
  );
  //}
}

export default App;
