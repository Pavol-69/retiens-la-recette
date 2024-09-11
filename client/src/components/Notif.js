// CSS
import "../styles/Notif.css";

function Notif({ nbNotif }) {
  return (
    <div className="notif">
      <div className="notif_txt gras">{nbNotif}</div>
    </div>
  );
}

export default Notif;
