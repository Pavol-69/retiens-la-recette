// CSS
import "../styles/PiedDePage.css";

function PiedDePage({ dark }) {
  return (
    <footer
      className="pied_page elements_centre"
      style={{ color: dark ? "var(--wht)" : "var(--blk)" }}
    >
      Site réalisé par Paul Valy - paul.valy@gmail.com
    </footer>
  );
}

export default PiedDePage;
