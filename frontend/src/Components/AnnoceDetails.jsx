import React, { useEffect, useState, } from "react";
import Heada from "./Header";
import { Params, useParams } from "react-router-dom";
import Slider from "./CarouselSlider";

const DetailsAnnonce = () => {
    const AnnonceId = useParams();
    const [annonce, setAnnonce] = useState("")
    const [images, setImages] = useState([])
    useEffect(() => {
        getAnnonce()
        getImage()
    }, [])

    let getAnnonce = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/annonces/${AnnonceId.id}/`)
        let data = await response.json()
        setAnnonce(data)
    }
    let getImage = async () => {
        let response2 = await fetch(`http://127.0.0.1:8000/api/photo/${AnnonceId.id}/`)
        var data = await response2.json()
        setImages(data)
    }

    const Nomwilaya = annonce.Wilaya
    const NomCommune = annonce.Commune
    const BienImmobilier = annonce.Immobilier
    console.log(annonce)

    return (<>
        <Heada />
        <div className="lg:mx-40 my-10 border-solid shadow-2xl  rounded-2xl">
            <h1 className="p-5 text-2xl font-bold">{annonce.Titre}</h1>
            <div className="overflow-hidden aspect-video mx-10">
                <Slider slides={images} className="h-full w-full object-cover" />
            </div>
            {/* <img key={image.image} className="w-full h-full rounded-2xl " src={'http://127.0.0.1:8000' + image.image}
            alt="testeImages" />) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 ml-10 py-5 pt-5 gap-2">
                <div className="border-2 border-PrincCol shadow-2xl col-span-1 rounded-2xl">
                    <p className="pl-3 p-1"><b>Annonceur: </b> {annonce.user_username}</p>
                    <p className="pl-3 p-1"><b>Chargé le: </b>{annonce.DatePublication}</p>
                    <p className="pl-3 p-1"><b>email: </b>{annonce.user_email}</p>
                    <p className="pl-3 p-1"><b>Catégorie: </b>{annonce.Categorie}</p>
                    <p className="pl-3 p-1"><b>Module: </b>{annonce.ThemeAnn}</p>
                </div>
                <div className="flex flex-col justify-center items-center col-span-2">
                    <button
                        className=" px-5 m-2 py-4 text-center text-white bg-PrincipalCol rounded-md shadow hover:bg-gray-100">Participer</button>
                </div>
            </div>
            <div className="ml-10 py-5">
                <h1 className="text-2xl font-bold text-PrincipalCol">Détails</h1>
                <div className="pl-4">
                    <h1 className="text-2xl font-bold">Description</h1>
                    <p className="pl-4">{annonce.Description}</p>
                </div>
                <div className="pl-4">
                    <h1 className="text-2xl font-bold">Information</h1>
                    <p className="pl-4"><b>Adresse : </b>{Nomwilaya + " " + NomCommune + " " + BienImmobilier} </p>
                    <p className="pl-4"><b>Prix : </b>{annonce.Tarif}</p>
                    <p className="pl-4"><b>Modalité : </b>{annonce.Modalite}</p>
                    <a href="/" className="pl-4 flex items-center hover:text-cyan-600 ">Click ici
                        <img className="scale-50" src={require('../images/GPSiimg.png')} alt="" />
                    </a>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-PrincipalCol">Contacter l'annonceur</h1>
                    <div className="grid grid-cols-3 grid-flow-col-dense gap-0">
                        <input type="text" placeholder="tapez quelque chose..."
                            className="p-2 col-span-2  rounded-md border-2  border-black "></input>
                        <button
                            className="px-5 m-2 py-4 w-40 text-center  bg-PrincipalCol rounded-md shadow text-white hover:bg-gray-100">Envoyer</button>
                    </div>
                </div>
            </div>

        </div>
    </>
    );
}
export default DetailsAnnonce;