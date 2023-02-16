import React,{useContext,useState} from 'react'
import {outlet,Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const PrivateRoutes =() =>{
    let {user}=useContext(AuthContext)
    return(
        user? <outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes