import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function LeftSettinComp() {
    let { logoutUser } = useContext(AuthContext)
    return (
        <><div className="bg-gray-200 bold">
            <p className="text-bold text-4xl ml-20">
                MON COMPTE
            </p>
        </div><div className="grid grid-cols-5 mt-10 ml-10">
                <div className="grid grid-row grid-cols-1">
                    <div className="flex items-center justify-center">
                        <img src="https://secure.gravatar.com/avatar/9872d1f9333aea304c977b5ac4d5c7cc?s=70&d=mm&r=g" alt="userPhoto"
                            className="rounded-full items-center justify-center"
                        />
                    </div>

                    <a href="/PostedAnnonce" className="p-2 my-2 hover:bg-gray-100 rounded-md">Annonces publiées</a>
                    <hr className="bg-gray-200 h-px w-40" />
                    <a href="/Favorit" className="p-2 my-2 hover:bg-gray-100 rounded-md">Annonces favoris</a>
                    <hr className="bg-gray-200 h-px w-40" />
                    <a href="/AccountDetails" className="p-2 my-2 hover:bg-gray-100 rounded-md">Détails du compte</a>
                    <hr className="bg-gray-200 h-px w-40" />
                    <a href="/" onClick={logoutUser} className="p-2 my-2 hover:bg-gray-100 rounded-md">Deconnexion</a>

                </div>
            </div></>
    )

}
export default LeftSettinComp;