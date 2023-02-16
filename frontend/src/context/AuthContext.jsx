import React,{ createContext,useState,useEffect,useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes"




const AuthContext=createContext()

export default AuthContext;



export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    // const {setAuth}=useContext(PrivateRoutes)
    
    let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') ): null)
    let [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens') ): null)
    let [loading,setLoading]=useState(true)

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
    let logoutUser= () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }
    let updateToken = async () =>{
        console.log('updatd')
        let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        // console.log('email:',e.target.email.value)
        let data =await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }   
        else{
            logoutUser()
        }
    }
    let contextData={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    useEffect(() =>{
        let fourMinutes=1000*60*4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            } 
        },fourMinutes)
        return ()=> clearInterval(interval) 

    },[authTokens,loading])



    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}