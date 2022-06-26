import React from "react";
import { Navigate , Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem("token");
  return (
    isAuthenticated ? <Component/> : <Navigate  to="/" />
  );
}

export default ProtectedRoute;