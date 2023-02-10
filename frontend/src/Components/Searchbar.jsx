import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";



function SearchBar(){
    const navigate = useNavigate();
    const [ValRech , setValRech]=useState('');
    const handleValRech = (event) => {
        setValRech(event.target.value);
    };
    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            navigate(`/?search=${ValRech}`);
            window.location.reload();
        }
      };
    return(<div className="">
                    <div className='mx-auto'>
                        <div className="relative flex items-center w:70 md:w-96 max-w-screen-sm h-12  rounded-lg border  ">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                            <img className="w-5 " src={require('../images/searchSymbol.png')} alt="teste" />
                            </div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                onChange={(event) => setValRech(event.target.value)}
                                onKeyPress={handleSearch}
                                id="search"
                                placeholder="Chercher un cour" /> 
                        </div>
                    </div>
                </div>
    );
}
export default SearchBar;