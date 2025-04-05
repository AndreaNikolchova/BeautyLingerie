import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  

const LogoutItem = () => {
  const navigate = useNavigate();
  const { changeAuthState } = useContext(AuthContext); 

  useEffect(() => {
    
    changeAuthState({});
    sessionStorage.removeItem("authState");  

   
    navigate("/");
  }, [changeAuthState, navigate]);

  return null; 
};

export default LogoutItem;
