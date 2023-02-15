import React,{ createContext,useState,useEffect,useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes"




const AuthContext=createContext()

export default AuthContext;



export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    // const {setAuth}=useContext(PrivateRoutes)
    
    let [authTokens,setAuthTokens]=useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') ): null)
    let [user,setUser]=useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens') ): null)

    let loginUser =async(e)=>{
        e.preventDefault()
        // console.log('Form submitted')
        let response = await fetch(`http://127.0.0.1:8000/api/token/`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        // console.log('email:',e.target.email.value)
        let data =await response.json()
        if (response.status===200){
            // setAuth(true)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }   
        else{
            alert('Something went wrong!')

        }
        // console.log('data:',data)

    }
    let contextData={
        user:user,
        loginUser:loginUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}