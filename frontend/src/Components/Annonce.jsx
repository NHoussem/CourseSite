
import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Slider from "./CarouselSlider";
function Annonce(props){
    const path="./AnnoceDetails/"+props.Annonceid
    const [images,setImages]=useState([])
    useEffect(()=>{
        getImage()
  },[])
    let getImage= async()=>{
        let response=await fetch(`http://127.0.0.1:8000/api/photo/${props.Annonceid}/`)
        var data = await response.json()
        setImages(data)
    }
    const pathimage=images[0] && images[0].image

    return(   
        <div className="relative inline-block duration-300 max-w-72 ease-in-out transition-transform transform hover:-translate-y-2 w-full p-1">
            <div className="shadow-2xl rounded-2xl bg-white">
                    <div className="h-60 max-h-60 object-cover  flex justify-center items-center rounded-t-2xl">
                        <img className="h-full w-full max-h-38 rounded-t-2xl object-cover" src={'http://127.0.0.1:8000' + pathimage} alt="teste" />
                    </div>
                    <div className="p-2 gap-96">
                        <h4 className=" text font-bold pt-2 truncate" >{props.Titre}</h4>
                        <p className="max-10 pt-1.5">Date de Publication : {props.DatePublication}</p>
                        <p className="pt-1.5">Tarif: {props.Tarif}DA/heure</p>
                        <div className="flex mt-2 gap-2 pt-1.5 ">
                        <div className="rounded-full overflow-hidden h-10 w-10">
                             <a href="/"><img src={'http://127.0.0.1:8000'+props.user_profile_pic} className="h-full w-full object-cover" alt="ProfilePicture" /></a>
                        </div>
                            <a className="text-gray-400 text-xs mt-2 hover:text-gray-700 col-span-1" href="/"> {props.user_username} </a>
                        </div>
                        <div className="flex flex-col justify-center items-center pt-1.5">
                            <a href={path} className="text-[#178C8C] border border-[#178C8C] hover:bg-[#175D8A] hover:text-white active:bg-[#175D8A] font-bold  px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Plus d'information </a>
                        </div>
                        
                    </div>
                </div>
             </div>   
)}

export default Annonce;
