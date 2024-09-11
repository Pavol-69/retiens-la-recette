// CSS
import "../styles/CSSGeneral.css";
import "../styles/Burger.scss";

function Burger({ tailleTel, menuBurger, setMenuBurger, isLoaded }) {
  return (
    <div
      onClick={() => {
        if (menuBurger) {
          setMenuBurger(false);
        } else {
          setMenuBurger(true);
        }
      }}
      className="case_burger elements_centre"
      style={{ opacity: tailleTel ? 1 : 0 }}
    >
      <div
        className={`trait_burger trait_burger1 ${
          isLoaded ? `trait_burger1${menuBurger ? "_nrm" : "_rvs"}` : null
        }`}
      ></div>
      <div
        className={`trait_burger trait_burger2 ${
          isLoaded ? `trait_burger2${menuBurger ? "_nrm" : "_rvs"}` : null
        }`}
      ></div>
      <div
        className={`trait_burger trait_burger3 ${
          isLoaded ? `trait_burger3${menuBurger ? "_nrm" : "_rvs"}` : null
        }`}
      ></div>
    </div>
  );
}

export default Burger;
