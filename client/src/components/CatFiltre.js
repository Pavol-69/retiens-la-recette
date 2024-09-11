// CSS
import "../styles/CSSGeneral.css";
import "../styles/CatFiltre.css";
import "../styles_pages/PagePrincipale.css";

function CatFiltre({ myFilterList, setMyFilterList, i, dark }) {
  function changeState(e) {
    e.preventDefault();
    let myTab = [...myFilterList];
    if (myTab[i][1]) {
      myTab[i][1] = false;
    } else {
      myTab[i][1] = true;
    }
    setMyFilterList(myTab);
  }

  return (
    <div
      className="cat_filtre elements_centre non_selectionnable anim_entry"
      style={{
        backgroundColor: `var(--${
          myFilterList[i][1] ? "main" : dark ? "blk" : "wht"
        })`,
      }}
      onClick={(e) => changeState(e)}
    >
      <span
        style={{
          color: `var(--${
            myFilterList[i][1] ? (dark ? "wht" : "blk") : "main"
          })`,
          transition: "0.5s",
        }}
      >
        {myFilterList[i][0]}
      </span>
    </div>
  );
}

export default CatFiltre;
