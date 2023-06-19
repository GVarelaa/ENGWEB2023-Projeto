import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

function RouterGuard({children}) {
 
    function hasJWT() {
        let flag = false;
        
        var token = localStorage.getItem('token');
        if(token){
            var decodedToken = jwt_decode(token);
            if(Date.now() >= decodedToken.exp * 1000) flag = false;
            else flag = true;
        }
        else if(Cookies.get('token')){
            token = Cookies.get('token')

            var decodedToken = jwt_decode(token);
            if(Date.now() >= decodedToken.exp * 1000) flag = false;
            else {
                localStorage.setItem('token', token)
                flag = true;
            }
        }
       
        return flag
    }
  
    if(!hasJWT()){
        return <Navigate to="/login"/>;
    }
    else return children;
 };

export default RouterGuard;