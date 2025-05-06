import react from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth.utils";

const privatrComponts = () => {
  const isLogin = isLoggedIn();
  console.log(isLogin);
  const auth = localStorage.getItem("userId");
  const token = localStorage.getItem("TC_AUTH_TOKEN");
  return auth && token ? <Outlet /> : <Navigate to="/registration" />;

  //   if (token && auth) {
  //     return <Outlet />;
  //   } else {
  //     <Navigate to="/login" />;
  //   }
};

export default privatrComponts;
