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

//CSS
import "./styles/CSSGeneral.css";
import "./styles/index.css";

// Autre
import React, { useState, useEffect } from "react";
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
  const [dark, setDark] = useState(true);
  const tailleOrdi = useMediaQuery({ query: "(min-width: 1475px)" });
  const tailleInt1 = useMediaQuery({
    query: "(min-width: 1330px)",
  });
  const tailleInt2 = useMediaQuery({
    query: "(min-width: 891px)",
  });
  const tailleTel = useMediaQuery({ query: "(max-width: 990px)" });

  const body = document.body;
  //body.style.transition = "0.5s";

  useEffect(() => {
    //setDark(true);
  }, []);

  if (dark) {
    body.style.backgroundColor = "var(--blk)";
  } else {
    body.style.backgroundColor = "var(--wht)";
  }

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
                    dark={dark}
                    setDark={setDark}
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
                    dark={dark}
                    setDark={setDark}
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
                    dark={dark}
                    setDark={setDark}
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
                      dark={dark}
                      setDark={setDark}
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
                      dark={dark}
                      setDark={setDark}
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
                    dark={dark}
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

          <Route path="/" element={<PublicRoute isAuth={isAuth} />}>
            <Route
              path="/inscription"
              element={
                <PageInscription
                  setIsAuth={setIsAuth}
                  tailleOrdi={tailleOrdi}
                  tailleTel={tailleTel}
                  tailleInt1={tailleInt1}
                  tailleInt2={tailleInt2}
                  dark={dark}
                />
              }
            />

            <Route
              path="/connexion"
              element={
                <PageConnexion
                  setIsAuth={setIsAuth}
                  tailleOrdi={tailleOrdi}
                  tailleTel={tailleTel}
                  tailleInt1={tailleInt1}
                  tailleInt2={tailleInt2}
                  dark={dark}
                  setDark={setDark}
                />
              }
            />
            <Route
              path="/mot_de_passe_oublie"
              element={
                <PageMdpOublie
                  tailleOrdi={tailleOrdi}
                  tailleTel={tailleTel}
                  tailleInt1={tailleInt1}
                  tailleInt2={tailleInt2}
                  dark={dark}
                />
              }
            />
            <Route
              path="/reinitialisation_mot_de_passe/:resetKey"
              element={
                <PageResetPassword
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  tailleOrdi={tailleOrdi}
                  tailleTel={tailleTel}
                  tailleInt1={tailleInt1}
                  tailleInt2={tailleInt2}
                  dark={dark}
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
