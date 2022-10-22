import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../contexts/userContext";

export default function ProtectedRoute({
  token,
  redirectPath = "/",
  children,
}) {
  const { setAlert } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      setAlert({
        show: true,
        message: "Sign in to access this page!",
        type: 0,
        doThis: () => {},
        color: "rgba(230,200,0)",
        icon: "alert-circle",
      });
    }
  }, []);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
