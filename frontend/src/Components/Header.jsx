import React,{ useState,useContext } from "react";
import AuthContext from '../context/AuthContext'

function Heada(){
    const [navbar, setNavbar] = useState(false);
    const [dropdwon,setDrop]=useState(false)
    let {user}=useContext(AuthContext)
    // console.log({user})
    return(
        <nav className="w-full bg-white shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="/">
                        <h2 className="text-2xl font-bold text-black">InsightCours</h2>
                    </a>
                    <div className="lg:hidden">
                        <button
                            className="md:hidden p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-black"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}
                >
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        <li className="flex text-black hover:text-indigo-200 justify-center">
                            <a href="/">Accueil</a>
                        </li>
                        <li className="flex justify-center text-black hover:text-indigo-200" >
                            <div>
                                <button onClick={() => setDrop(!dropdwon)} id="dropdownMenuButton1" className="dropdown-toggle   px-6   py-2.5      text-black   font-medium   text-xs   leading-tight    rounded        transition   duration-150   ease-in-out   flex   items-center   whitespace-nowrap" type="button"   data-bs-toggle="dropdown"  aria-expanded="false">Theme
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="caret-down"
                                        className="w-2 ml-2"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        >
                                        <path
                                            fill="currentColor"
                                            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                        ></path>
                                        </svg>
                                        
                                </button>
                                <ul  className={` dropdown-menu min-w-max  absolute bg-white  text-base  z-50  float-left  py-2  list-none  text-left  rounded-lg  shadow-lg  mt-1   m-0  bg-clip-padding  border-none ${dropdwon ? "block" : "hidden"}`}  aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="/?search=Science" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Science</a>
                                        </li>
                                        <li>
                                            <a href="/?search=Mathématique" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Mathématique</a>
                                        </li>
                                        <li>
                                            <a href="/?search=Physique" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Physique</a>
                                        </li>
                                        <li>
                                            <a href="/?search=Arabic" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Arabic</a>
                                        </li>
                                        <li>
                                            <a href="/?search=Français" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Français</a>
                                        </li>
                                        <li>
                                            <a href="/?search=Anglais" onClick={() => setDrop(!dropdwon)} className="dropdown-item  text-sm  py-2  px-4  font-normal  block  w-full  whitespace-nowrap  bg-transparent  text-gray-700  hover:bg-gray-100">Anglais</a>
                                        </li>
                                </ul>

                            </div>
                        </li>
                                
                        <li className="flex justify-center text-black hover:text-indigo-200">
                            <a href="/">À propos de nous</a>
                        </li>
                        <li className="flex justify-center text-black hover:text-indigo-200">
                            <a href="/">Contactez-nous</a>
                        </li>
                    </ul>

                    <div className="lg:hidden md:hidden sm:inline-block sm:w-full">
                        <a
                            href="/login"
                            className="inline-block  w-full px-4 m-2 py-3 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100"
                        >
                            Se connecter
                        </a>
                        <a
                            href="/register"
                            className="inline-block   w-full px-4 py-3 m-2 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100"
                        >
                            S'inscire
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden  md:inline-block">
                <a
                    href="/login"
                    className="px-4 py-2 m-1 text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100"
                >
                    Se connecter
                </a>
                <a
                    href="/register"
                    className="px-4 py-2 m-1 text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100"
                >
                    S'inscrire
                </a>
            </div>
        </div>
    </nav>
    );
}
export default Heada;
 