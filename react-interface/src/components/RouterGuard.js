import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function RouterGuard({children}) {
 
    function hasJWT() {
        let flag = false;
  
        //check user has JWT token
        localStorage.getItem("token") ? flag=true : flag=false
       
        return flag
    }
  
    if(!hasJWT()){
        return <Navigate to="/login"/>;
    }
    else return children;
 };

export default RouterGuard;