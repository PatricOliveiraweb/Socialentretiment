import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const { login } = React.useContext(UserContext);

  if (login) {
    return outlet;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
