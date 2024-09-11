// Components
import PiedDePage from "../components/PiedDePage";
import Titre from "../components/Titre";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";

// Autre
import { toast } from "react-toastify";

function PageNonAccepte({
  role,
  isAuth,
  setIsAuth,
  tailleOrdi,
  tailleTel,
  tailleInt1,
  tailleInt2,
  dark,
}) {
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    toast.info("Déconnecté(e).");
  }
  function desinscription(e) {
    e.preventDefault();
    if (deleteUser()) {
      localStorage.removeItem("token");
      setIsAuth(false);
      toast.info("Désinscrit(e).");
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

  return (
    <div className="relatif">
      <Bandeau mySize="medium" dark={dark} />
      <div className="grid_non_accepte board">
        <Titre
          tailleTel={tailleTel}
          tailleInt1={tailleInt1}
          tailleInt2={tailleInt2}
          tailleOrdi={tailleOrdi}
        />

        <div className="txt_mdp_oublie texte_taille_2 texte_centre margin_auto">
          {role === "to_define"
            ? "Votre demande d'inscription est en attente."
            : "Désolé, votre demande d'inscription a été rejetée."}
        </div>
        <div className="paquet_bouton ligne margin_auto">
          <div onClick={(e) => logout(e)} className="button margin_auto">
            Déconnexion
          </div>
          <div
            onClick={(e) => desinscription(e)}
            className="button margin_auto"
          >
            Désinscription
          </div>
        </div>
      </div>

      <PiedDePage dark={dark} />
    </div>
  );
}

export default PageNonAccepte;
