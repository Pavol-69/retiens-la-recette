// CSS
import "../styles/PlusIcon.css";

function PlusIcon({ dark }) {
  return (
    <div
      className="plus_btn_ctn elements_centre"
      style={{ color: `var(--${dark ? "wht" : "blk"})` }}
    >
      <div
        className="plus_trait_1"
        style={{ backgroundColor: `var(--${dark ? "wht" : "blk"})` }}
      ></div>
      <div
        className="plus_trait_2"
        style={{ backgroundColor: `var(--${dark ? "wht" : "blk"})` }}
      ></div>
    </div>
  );
}

export default PlusIcon;
