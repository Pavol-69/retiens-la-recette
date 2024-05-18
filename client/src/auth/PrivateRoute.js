import { Outlet, Navigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import React, { useState, useEffect } from "react";

function PrivateRoute({ isAuth, setIsAuth, setPseudo, setRole, setNbNotif }) {
  const [myCheckInfo, setMyCheckInfo] = useState(false);
  const [myCheckNotif, setMyCheckNotif] = useState(false);
  const [myCheckAuth, setMyCheckAuth] = useState(false);

  async function getUserInfos() {
    try {
      const response = await fetch("/dashboard/userInfos", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setPseudo(parseRes.user_pseudo);
      setRole(parseRes.user_role);
      setMyCheckInfo(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function isVerify() {
    try {
      const response = await fetch("/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      if (parseRes === true) {
        setIsAuth(true);
        await getUserInfos();
        await notifCalcul();
        setMyCheckAuth(true);
      } else {
        setIsAuth(false);
        setMyCheckAuth(true);
        setMyCheckInfo(true);
        setMyCheckNotif(true);
      }

      return parseRes;
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (isAuth) {
      setMyCheckAuth(true);
      getUserInfos();
      notifCalcul();
    } else {
      isVerify();
    }
  }, []);

  async function notifCalcul() {
    try {
      const response = await fetch("/dashboard/getNbNotif", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      if (!isNaN(parseRes)) {
        setNbNotif(parseRes);
        setMyCheckNotif(true);
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  if (myCheckAuth && myCheckInfo && myCheckNotif) {
    return isAuth ? <Outlet /> : <Navigate to="/portail_connexion" />;
  } else {
    return null;
  }
}

export default PrivateRoute;
