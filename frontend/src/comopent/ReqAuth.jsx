import React from "react";
import { Navigate } from "react-router-dom";

const ReqAuth = ({ children }) => {
   const user = JSON.parse(localStorage.getItem('profile'));
 console.log("user",user)
 if(user?.token) {

    return children;

 }

 return <Navigate to={"/login"} />;
};

export default ReqAuth;
