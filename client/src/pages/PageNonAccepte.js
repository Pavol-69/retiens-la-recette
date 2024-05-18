// Components
import PiedDePage from "../components/PiedDePage";
import BarreNavigation from "../components/BarreNavigation";
import Bandeau from "../components/Bandeau";

// CSS
import "../styles/CSSGeneral.css";
import "../styles_pages/PageNonAccepte.css";

// Autre
import { toast } from "react-toastify";

function PageNonAccepte({ role, isAuth, setIsAuth, tailleTel }) {
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
      <BarreNavigation role={role} isAuth={isAuth} setIsAuth={setIsAuth} />
      <Bandeau mySize="big" />
      <div className="board elements_centre">
        {role === "to_define" ? (
          <div className="ensemble_to_define elements_centre colonne texte_en_attente">
            <div className="couleur_texte texte_taille_5 texte_en_attente gras texte_centre">
              Votre demande d'inscription est en attente.
            </div>
            <div className="paquet_bouton ligne">
              <div
                onClick={(e) => logout(e)}
                className={
                  tailleTel
                    ? "bouton_board_empty_tel non_selectionnable"
                    : "bouton_board_empty non_selectionnable"
                }
              >
                Déconnexion
              </div>
              <div
                onClick={(e) => desinscription(e)}
                className={
                  tailleTel
                    ? "bouton_board_empty_tel non_selectionnable texte_centre"
                    : "bouton_board_empty non_selectionnable texte_centre"
                }
              >
                Se désinscrire
              </div>
            </div>
          </div>
        ) : (
          <div className="ensemble_to_define elements_centre colonne texte_en_attente">
            <div className="couleur_texte texte_taille_5 texte_en_attente gras texte_centre">
              Désolé, votre demande d'inscription a été rejetée.
            </div>
            <div className="paquet_bouton ligne">
              <div
                onClick={(e) => logout(e)}
                className={
                  tailleTel
                    ? "bouton_board_empty_tel non_selectionnable"
                    : "bouton_board_empty non_selectionnable"
                }
              >
                Déconnexion
              </div>
            </div>
          </div>
        )}
      </div>

      <PiedDePage />
    </div>
  );
}

export default PageNonAccepte;
