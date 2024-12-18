import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const outletContext = useOutletContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.tipoPermissao)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet context={outletContext} />;
};

export default RoleBasedRoute;
