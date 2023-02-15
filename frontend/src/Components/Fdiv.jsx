import React,{ useState } from "react";
import SearchBar from "./Searchbar";
import Heada from "./Header.jsx";

function FiDiv() {

    return (<><Heada /><div>
        <div className="relative m-4 mx-2">
            <ul>
                <li className="absolute  grid grid-flow-col grid-cols-none justify-center items-center  w-full top-0 md:top-20">
                    {/* <SearchBar /> */}
                </li>
                <li className="grid absolute  p-4 w-full justify-center items-center top-10 md:top-32 ">
                    <h1 className="felx text-xs md:text-xl   font-bold truncate sm:text-clip lg:w-full justify-center items-center text-center">
                        InsightCours Votre chemin vers le succées
                    </h1>
                </li>
                <li className="invisible grid absolute w-full p-8 justify-center items-center top-28 md:top-40 lg:visible">
                    <a
                        href="/"
                        className="px-4 py-2 bg-PrincipalCol flex text-white justify-center items-center rounded-md shadow hover:bg-gray-100"
                    >
                        Liste des cours
                    </a>
                </li>
            </ul>

            <img className="w-full " src={require('../images/Headerimg.png')} alt="teste" />

        </div>
    </div></>
    );
}

export default FiDiv;