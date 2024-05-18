// CSS
import "../styles/Renseignement.css";

function Reseignement({
  myLabel,
  myType,
  myNameHtml,
  myPlaceHolder,
  myInfo,
  setMyInfo,
}) {
  function myOnChange(e) {
    setMyInfo({ ...myInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className="renseignement">
      <label>{myLabel}</label>
      <input
        onChange={myOnChange}
        type={myType}
        name={myNameHtml}
        placeholder={myPlaceHolder}
      ></input>
    </div>
  );
}

export default Reseignement;
