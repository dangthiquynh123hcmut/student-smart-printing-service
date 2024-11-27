// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { decodeToken,isExpired } from 'react-jwt'; // Import các hàm từ react-jwt
import {getMyInfoApi} from "../../api/API";
//handle token invalid



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState(null);
    // const isTokenExpired = (token) => {
    //     try {
    //       return isExpired;
    //     } catch (error) {
    //       return true; // Nếu giải mã không thành công, coi như token hết hạn
    //     }
    // }

    const refreshToken = async () =>{
        try {
            const response = await fetch("https://projectprintmachine-backend.onrender.com/auth/refresh",{
                method: "POST",
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
    
                },
                body: JSON.stringify({
                    token:token
                })
            })
            
            if(!response.ok){
                throw new Error("Unable to refresh token")
            }
            const data = await response.json();
            const tokenResult=data.result.token;
            localStorage.setItem("token",tokenResult);
            return tokenResult;
    
        } catch (error) {
            console.log('Refresh token failed', error);
            // Redirect to login page if refresh token fails
            // localStorage.removeItem("token");
        }
    }
    function getTimeUntilExpiry(token) {
        const currentTime = Date.now(); // Current time in milliseconds
        const timeOut= decodeToken(token)
        console.log("timeout",timeOut.exp)
        console.log("time current", Date.now()/1000)
        console.log(token)
        const timeUntilExpiry = timeOut.exp - currentTime/1000;
        console.log("time remain",timeUntilExpiry)
        return timeUntilExpiry > 0 ? timeUntilExpiry : 0; // Return 0 if expired
        // return 30000
    }
    
    const handleExpTime = (token)=>{
        const remainTime = getTimeUntilExpiry(token);
            setTimeout(()=>{
            refreshToken();
        },remainTime) 
    }

    const fetchUserData = async () => {

        if (token) {
            // const userDataHashed = await getMyInfoApi(token);
            // setUserData(userDataHashed);
            try{
                const response = await fetch("https://projectprintmachine-backend.onrender.com/users/myInfo",{
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${token}`,
                }}
                );

                if (!response.ok) {
                    throw new Error(`Network response was not ok : ${response.status}`);
                }
                const data = await response.json();
                console.log("token hash success:",data);
                setUserData(data)

            }catch(error){
                console.error("Token hash Error:", error);

            }
        }

    };

    useEffect(() => {
        if(token){ // in case logout, token => null
            fetchUserData();
            handleExpTime(token)
            console.log("check refresh token")
        }

    }, [token]);

    // useEffect(()=>{
    //     refreshToken().then(newToken => setToken(newToken)); // Refresh token if expired
    // },[isExpired(token)])


    return (
        <AuthContext.Provider value={{ token, setToken, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
