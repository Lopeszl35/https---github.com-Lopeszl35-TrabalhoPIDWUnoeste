import React from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const outletContext = useOutletContext();

  console.log("User Permissao:", user?.tipoPermissao); // Log para debug
  console.log("Allowed Roles:", allowedRoles);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.tipoPermissao)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet context={outletContext} />;
};

export default RoleBasedRoute;
