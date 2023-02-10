import React from "react";
import DetailsAnnonce from "./AnnoceDetails";
import { BrowserRouter  ,Route,Routes,useParams } from "react-router-dom";
import Slider from "./CarouselSlider";
import NavbarFilter from "./FilterCom";
import FirstPageWAth from "../Pages/FirstPageWAth";
import Scraper from "./Scrapper";
import PosterPage from "../Pages/PosterPage";
// import Filters from "./FilterCom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<FirstPageWAth/>}/>
            <Route path="AnnoceDetails/:id" element={<DetailsAnnonce/>}/>
            <Route path="/Slider" element={<Slider/>}/>
            <Route path="/Filter" element={<NavbarFilter/>}/>
            <Route path="/Poster" element={<PosterPage/>}/>
            <Route path="/ss" element={<Scraper/>}/>

        </Routes>

            /* <div>
                <FiDiv/>
                <AnnonceList/>
                <Footer/>
            </div> */
        
        
    );
}
export default App;