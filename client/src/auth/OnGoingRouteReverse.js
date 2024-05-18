import { Outlet, Navigate } from "react-router-dom";

function OnGoingRouteReverse({ role }) {
  return role === "rejected" || role === "to_define" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default OnGoingRouteReverse;
