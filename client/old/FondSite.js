// Styles
import "../styles/FondSite.css";

function FondSite({ myFondSite }) {
  return (
    <div className="font_site">
      <img className="img_font_site" src={myFondSite} />
      <div className="degrade_font_site"></div>
    </div>
  );
}

export default FondSite;
