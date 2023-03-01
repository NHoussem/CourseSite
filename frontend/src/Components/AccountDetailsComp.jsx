import React, { useContext } from "react";
function AccountDetails() {
    return (

        <><div className="px-4 ">
            <div className="grid grid-row">
                <label htmlFor="Username">Username</label>
                <input type="text" readOnly value={"Houssem"} className="px-4" />
            </div><div className="grid grid-row">
                <label htmlFor="email">Email</label>
                <input type="text" readOnly value={"Houssem@gmail.com"} className="px-4" />
            </div>
            <div className="grid grid-row grid-cols-3 ">
                <label htmlFor="ChangePassword" className="text-bold text-gray-600 uppercase"> Changement de mot de passe</label>
                <hr className="bg-gray-200 h-px w-80" />
                <label htmlFor="OldPassword" className="" >Mot de passe actuel</label>
                <input type="text" className="border-2 border-gray-200 py-1 col-span-2 block" />
                <label htmlFor="OldPassword" className="" >Nouveau mot de passe</label>
                <input type="text" className="border-2 border-gray-200 py-1 mx-10" />
                <label htmlFor="OldPassword" className="" >Confirmer le nouveau mot de passe</label>
                <input type="text" className="border-2  border-gray-200 py-1" />
            </div>
            <button className="px-5 m-2 py-4 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100">
                <a href="/">Enregistrer les modifications</a>
            </button>



        </div></>
    )
}
export default AccountDetails;