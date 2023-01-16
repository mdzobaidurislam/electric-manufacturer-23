import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
import useAdmin from "../Hooks/useAdmin";
import SpinnerLoading from "../Share/SpinnerLoading";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { admin, adminLoading } = useAdmin(user);
  const location = useLocation();
  if (loading || adminLoading) {
    return <SpinnerLoading />;
  }
  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" sate={{ form: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
