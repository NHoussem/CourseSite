import React, { useState,useEffect } from "react";
import FiDiv from "../Components/Fdiv";
import AnnonceList from "../Components/AnnonceList"
import NavbarFilter from "../Components/FilterCom";
import Foota from "../Components/Footer";

function FirstPageWAth(){
   
    // console.log(path)
    return(
        <><FiDiv/>
        <NavbarFilter />
        <AnnonceList/>
        <Foota/>
        </>
    )
}

export default FirstPageWAth;