import React from "react";
import { useState,useEffect} from "react";
import Annonce from './Annonce.jsx'
import Paginate from "./Paginate.jsx";

let AnnonceList=()=>{
    const [annonces ,setAnnonces]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = annonces.slice(indexOfFirstPost, indexOfLastPost);
    
    useEffect(()=>{
        GetAnnonces()
        
    },[]);
    
    let GetAnnonces = async() => {
        // console.log(`http://127.0.0.1:8000/api/teste/${window.location.search}`)
        const response = await fetch(`http://127.0.0.1:8000/api/teste/${window.location.search}`)
        const data =await response.json()
        setAnnonces(data)
    }
    const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage !== Math.ceil(annonces.length / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};
    return (
            <><div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 mx-10">
            {currentPosts.map((annonce, id) => (
                <Annonce key={id} Annonceid={annonce.id} Titre={annonce.Titre} DatePublication={annonce.DatePublication} Tarif={annonce.Tarif} localisation={annonce.Wilaya+' '+annonce.Commune+' '+annonce.Immobilier} user_username={annonce.user_username} user_profile_pic={annonce.user_profilepicture}/>
            ))}
        </div><div >
                <div className="flex flex-col justify-center items-center pt-1.5">
                <Paginate
                    postsPerPage={postsPerPage}
                    totalPosts={annonces.length}
                    currentPage={currentPage}
                    paginate={paginate}
                    previousPage={previousPage}
                    nextPage={nextPage} />
                </div>
            </div></>
    )

}
export default AnnonceList;
