import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function LeftSettinComp() {
    let { logoutUser } = useContext(AuthContext)
    return (
        <>
            <div className="grid grid-row grid-cols-1 ml-20">
                <div className="flex items-center justify-center my-4">
                    <img src="https://secure.gravatar.com/avatar/9872d1f9333aea304c977b5ac4d5c7cc?s=70&d=mm&r=g" alt="userPhoto"
                        className="rounded-full items-center justify-center"
                    />
                </div>

                <a href="/PostedAnnonce" className="pl-2 py-3 hover:bg-gray-100 rounded-md">Annonces publiées</a>
                <hr className="bg-gray-200 h-px w-40" />
                <a href="/Favorit" className="pl-2 hover:bg-gray-100 py-3 rounded-md">Annonces favoris</a>
                <hr className="bg-gray-200 h-px w-40" />
                <a href="/AccountDetails" className="pl-2 hover:bg-gray-100 py-3 rounded-md">Détails du compte</a>
                <hr className="bg-gray-200 h-px w-40" />
                <a href="/" onClick={logoutUser} className="pl-2 hover:bg-gray-100 py-3 rounded-md">Deconnexion</a>

            </div></>
    )

}
export default LeftSettinComp;