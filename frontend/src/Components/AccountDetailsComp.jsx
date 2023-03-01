import React, { useContext } from "react";
function AccountDetails() {
    let length = "Houssem".length
    return (

        <><div className="px-4 ">
            <label htmlFor="ChangePassword" className="text-bold text-gray-600 uppercase mt-2">Information du compte:</label>
            <hr className="bg-gray-200 h-px w-80" />
            <div className="grid grid-row">
                <label htmlFor="Username" className="my-2">Username:</label>
                <input type="text" readOnly value={"Houssem"} className="border-2 border-gray-200 py-1 px-8 mx-10 shadow-lg" />
            </div><div className="grid grid-row">
                <label htmlFor="email " className="my-2">Email:</label>
                <input type="text" readOnly value={"Houssem@gmail.com"} className="border-2 border-gray-200 py-1 px-8 mx-10 shadow-lg" />
            </div>
            <div className="grid grid-row">
                <label htmlFor="ChangePassword" className="text-bold text-gray-600 uppercase mt-2"> Changement de mot de passe</label>
                <hr className="bg-gray-200 h-px w-80" />
                <label htmlFor="OldPassword" className="my-2" >Mot de passe actuel</label>
                <input type="text" className="border-2 border-gray-200 py-1 px-2 mx-10 shadow-lg" />
                <label htmlFor="OldPassword" className="my-2" >Nouveau mot de passe</label>
                <input type="text" className="border-2 border-gray-200 py-1 px-2 mx-10 shadow-lg " />
                <label htmlFor="OldPassword" className="my-2" >Confirmer le nouveau mot de passe</label>
                <input type="text" className="border-2  border-gray-200 py-1 px-2 mx-10 shadow-lg" />
            </div>
            <div className="flex items-center justify-center">
                <button className="px-5 m-4 py-2 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100">
                    <a href="/">Enregistrer les modifications</a>
                </button>
            </div>



        </div></>
    )
}
export default AccountDetails;