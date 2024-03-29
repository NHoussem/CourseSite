import React from "react";
import DetailsAnnonce from "./AnnoceDetails";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Slider from "./CarouselSlider";
import NavbarFilter from "./FilterCom";
import FirstPageWAth from "../Pages/FirstPageWAth";
import Scraper from "./Scrapper";
import PosterPage from "../Pages/PosterPage";
import Reg_Form from "./Register_form";
import Login from "./Login_form";
import { AuthProvider } from "../context/AuthContext"
import PrivateRoutes from "../utils/PrivateRoutes"
import CreateAnnonceForm from "./SecondAnncForm";
import LeftSettinComp from "./LeftSettinComp";
import AccountDetails from "./AccountDetailsComp";
import Settings from "../Pages/Settings";
import ResetPassword from "./Reset_password";
import ChangePassword from "./ChangePassword";
// import Filters from "./FilterCom";

function App() {
    return (
        <AuthProvider>
            <Routes>

                <Route path="/" element={<FirstPageWAth />} />
                <Route path="AnnoceDetails/:id" element={<DetailsAnnonce />} />
                <Route path="/Slider" element={<Slider />} />
                <Route path="/Filter" element={<NavbarFilter />} />
                <Route path="/Poster" element={<PosterPage />} />
                <Route path="/tata" element={<CreateAnnonceForm />} />
                {/*
        <Route element={<PrivateRoutes />}>

        </Route> */}
                <Route path="/ss" element={<Scraper />} />
                <Route path="/Register" element={<Reg_Form />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/AccountDetails" element={<AccountDetails />} /> 
                <Route path="/ResetPassword" element={<ResetPassword/>}/>
                <Route path="/reset_password/:token" element={<ChangePassword/>}/>

            </Routes>
        </AuthProvider>

        /* <div>
            <FiDiv />
            <AnnonceList />
            <Footer />
        </div> */


    );
}
export default App;