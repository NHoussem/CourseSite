import React, { useContext, useState } from "react";
import { redirect } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function ChangePassword(){
    const link=useParams()
    const history =useNavigate()
    console.log(link.token)
    const [PassWord,setPassword]=useState()
    const [ConfirmePass,setConfPassword]=useState()
    const [DiffPass,setDiffPass]=useState(false)

    const PassChange =(event)=>{
        setPassword(event.target.value)
    }
    const ConfPassChange =(event)=>{
        setConfPassword(event.target.value)
    }
    const ChangePasswordHandler= (event)=>{
        if (PassWord!==ConfirmePass){
            setDiffPass(true)
        }
        else{
            setDiffPass(false)
        }
    }
    let ChangePassword=async(e)=>{
        fetch (`http://127.0.0.1:8000/api/reset_passwordChange/`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                'Password':PassWord,
                'token':link.token
            })
        })
        .catch(error=>console.error(error));
    }
    const handleSubmit=e=> {
        e.preventDefault()
        ChangePassword()
        history('/');
    }
    return(
        <><div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-PrincipalCol lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-black   decoration-wavy">
                        Réinitialiser mot de passe
                    </h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label

                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nouveau mot de passe
                            </label>
                            <input
                                onChange={PassChange}
                                name="password"
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirmer le mot de passe
                            </label>
                            <input
                                onChange={ConfPassChange}
                                name="password"
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <div className={` block ${DiffPass ? "block":"hidden" }`}>
                            <h1>
                                Ces mots de passe ne correspondent pas. Veuillez réessayer.
                            </h1>
                        </div>
                        <div className="mt-6">
                            <button type='submit' onClick={ChangePasswordHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-PrincipalCol rounded-md hover:bg-SecondryCol focus:outline-none focus:bg-SecondryCol">
                                <a href="/">Login</a>
                            </button>
                        </div>
                    </form>

                </div>
            </div></>
    )
}
export default ChangePassword;