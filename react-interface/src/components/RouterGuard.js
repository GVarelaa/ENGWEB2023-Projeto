import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

function RouterGuard({children}) {
 
    function hasJWT() {
        let flag = false;
        
        var token = localStorage.getItem('token')
        var decodedToken
        if(token){
            try{
                decodedToken = jwt_decode(token)
                if(Date.now() >= decodedToken.exp * 1000) flag = false
                else flag = true
            }
            catch (error){
                console.log(error)
            }
        }
        else if(Cookies.get('token')){
            token = Cookies.get('token')
            try{
                decodedToken = jwt_decode(token)
                if(Date.now() >= decodedToken.exp * 1000) flag = false
                else {
                    localStorage.setItem('token', token)
                    flag = true
                }
            }
            catch(error){
                console.log(error)
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