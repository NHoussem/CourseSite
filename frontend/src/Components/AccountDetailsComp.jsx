import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
function AccountDetails() {
    let history = useNavigate()
    let {user,authTokens}=useContext(AuthContext)
    let length = "Houssem".length
    const [Password1,setPassword1]=useState('')
    const [Password2,setPassword2]=useState('')
    const [oldPAssword,setOldPass]=useState('')
    const handlePass1Change =(event)=>{
        setPassword1(event.target.value)
    }
    const handlePass2Change =(event)=>{
        setPassword2(event.target.value)
    }
    const handleOldPassword =(event)=>{
        setOldPass(event.target.value)
    }
    let ChangePassword=async(e)=>{
        console.log(oldPAssword)
        const formData = new FormData();
        formData.append('old_password', oldPAssword);
        formData.append('new_password', Password1);
        console.log(formData)
        const response = await fetch('http://127.0.0.1:8000/api/ChangePassword/',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+String(authTokens.access)
            },
            body:JSON.stringify({'old_password':oldPAssword,'new_password':Password1})})
            .then(response=>response.json())
            .then(data=>console.log(data))
            .catch(error=>console.error(error));
            // history('/');
    }
    const handleSubmit = e => {
        e.preventDefault()
        ChangePassword()
        // history('/');
      };
    return (

        <><div className="px-4 ">
            <label htmlFor="ChangePassword" className="text-bold text-gray-600 uppercase mt-2">Information du compte:</label>
            <hr className="bg-gray-200 h-px w-80" />
            <div className="grid grid-row">
                <label htmlFor="Username" className="my-2">Username:</label>
                <input type="text" readOnly value={user.username} className="border-2 border-gray-200 py-1 px-8 mx-10 shadow-lg" />
            </div><div className="grid grid-row">
                <label htmlFor="email " className="my-2">Email:</label>
                <input type="text" readOnly value={user.email} className="border-2 border-gray-200 py-1 px-8 mx-10 shadow-lg" />
            </div>
            <Form method="POST" onSubmit={handleSubmit}>
                <div className="grid grid-row">
                    <label htmlFor="ChangePassword" className="text-bold text-gray-600 uppercase mt-2"> Changement de mot de passe</label>
                    <hr className="bg-gray-200 h-px w-80" />
                    <label htmlFor="OldPassword" className="my-2"  >Mot de passe actuel</label>
                    <input type="text" className="border-2 border-gray-200 py-1 px-2 mx-10 shadow-lg" onChange={handleOldPassword} />
                    <label htmlFor="OldPassword" className="my-2" >Nouveau mot de passe</label>
                    <input type="text" className="border-2 border-gray-200 py-1 px-2 mx-10 shadow-lg " onChange={handlePass1Change}/>
                    <label htmlFor="OldPassword" className="my-2"  >Confirmer le nouveau mot de passe</label>
                    <input type="text" className="border-2  border-gray-200 py-1 px-2 mx-10 shadow-lg" onChange={handlePass2Change}/>
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" onClick={handleSubmit} className="px-5 m-4 py-2 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100">
                        <a   >Enregistrer les modifications</a>
                    </button>
                </div>

            </Form>
            



        </div></>
    )
}
export default AccountDetails;