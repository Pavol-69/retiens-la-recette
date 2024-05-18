import { Outlet, Navigate } from "react-router-dom";

function OnGoingRoute({ role }) {
  return role === "rejected" || role === "to_define" ? (
    <Navigate to="/non_accepte" />
  ) : (
    <Outlet />
  );
}

export default OnGoingRoute;
