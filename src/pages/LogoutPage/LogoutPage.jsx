import React, { useContext, useEffect } from "react";
import UsersService from "../../services/UsersService";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { isLogged, setIsLogged, refreshToken, setRefreshToken } =
    useContext(UserContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    //console.log("refreshToken: ",  refreshToken);
    UsersService.deleteLogoutUser({ token: refreshToken });
    setIsLogged(false);
    //setRefreshToken;

    navigate(from, { replace: true });
  }, []);

  return <div></div>;
};

export default LogoutPage;
