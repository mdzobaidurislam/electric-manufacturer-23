import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
import useUser from "../Hooks/useUser";
import SpinnerLoading from "../Share/SpinnerLoading";

const RequireUser = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { localUser, userLoading } = useUser(user);
  const location = useLocation();
  if (loading || userLoading) {
    return <SpinnerLoading />;
  }
  if (!user || !localUser) {
    signOut(auth);
    return <Navigate to="/login" sate={{ form: location }} replace />;
  }
  return children;
};

export default RequireUser;
