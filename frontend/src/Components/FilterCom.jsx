import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

  
  const NavbarFilter = ({setPath}) => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [ValRech , setValRech]=useState('');
  const [RePAth,setRePath]=useState('');

const communes = {
    Alger: [
      'Alger Centre',
      'Bab El Oued',
      'Belouizdad',
      'Bologhine',
      'Dar El Beida'
    ],
    Oran: [
      'Arzew',
      'Es Senia',
      'Mers El Kebir',
      'Oran Centre',
      'Oued Tlélat'
    ],
    Constantine: [
      'Ain El Bey',
      'Didouche Mourad',
      'El Khroub',
      'Mohammedia',
      'Zighoud Youcef'
    ],
    Batna: [
      'Batna'
    ],
  };
    const handleWilayaChange = (event) => {
      setSelectedWilaya(event.target.value);
      setRePath("?"+"Wilaya="+event.target.value)
    };
    const handleCommuneChange = (event) => {
      setSelectedCommune(event.target.value);
      setRePath("?"+"Commune="+event.target.value+"&Wilaya="+selectedWilaya)
    };

    const handleMinDateChange = (event) => {
        setMinDate(event.target.value);
    };

    const handleMaxDateChange = (event) => {
        setMaxDate(event.target.value);
    };

    const handleFilterClick = () => {
        setShowFilters(!showFilters);
    };
    const handleValRech =(event) =>{
        setValRech(event.target.value)
    }
    const handlpathChange=()=>{
      if(selectedCommune!=''){
        setRePath(selectedCommune)
      }
      if(selectedWilaya!=''){
        setRePath(selectedWilaya)
      }
    }
    const handleSearch = (event) => {
          // if(selectedCommune!=='' && selectedWilaya!==''){
          //   setRePath("?"+"Commune="+selectedCommune+"&Wilaya="+selectedWilaya)
          // }
          // if(selectedWilaya!=='' && selectedCommune===''){
          //   setRePath("?"+"Wilaya="+selectedWilaya)
          // }
          // if(selectedCommune==='' && selectedWilaya!==''){
          //   setRePath("?"+"Wilaya="+selectedWilaya)
          // }
          // console.log(RePAth)
          navigate(`/${RePAth}`);
          window.location.reload();
      }

    return (
        <nav className={`bg-SecondryCol p-2 flex justify-center ${!showFilters ? "justify-center":"justify-between  "}  items-center`}>
                <div className="flex">
                <input className="bg-PrincipalCol p-2 rounded-lg text-white" placeholder="Recherche..." onChange={handleValRech} />
                <button className="bg-PrincipalCol p-2 rounded-lg text-white ml-2" onClick={handleFilterClick}>Filtrer</button>
                <a href={`?search=${ValRech}`} className={`bg-PrincipalCol p-2 flex rounded-lg text-white ml-2 ${!showFilters ? "flex":"hidden" }`}>Rechercher</a>
                </div>
                {showFilters && (
                <div className="bg-PrincipalCol p-2 rounded-lg text-white">
                    <label>Wilaya:</label>
                    <select value={selectedWilaya} onChange={handleWilayaChange} className="text-black m-2">
                        <option className='text-black ' value="" >Tous les wilayas</option>
                        <option value="Alger" className='text-black'>Alger</option>
                        <option value="Oran" className='text-black'>Oran</option>
                        <option value="Constantine" className='text-black'>Constantine</option>
                        <option value="Batna" className='text-black'>Batna</option>
                    </select>
                    <label className='m-1'>Commune:</label>
                    <select value={selectedCommune} onChange={handleCommuneChange} className="text-black m-2">
                    <option value="">Toutes les communes</option>
                    {selectedWilaya && communes[selectedWilaya].map((commune) => (
                        <option key={commune} value={commune} className='text-black'>{commune}</option>
                    ))}
                    </select>
                    <label className='m-1'>Date:</label>
                <input className="text-black m-2" type="date"  onChange={handleMinDateChange} placeholder="date de début"  />
                <input  className="text-black m-2" type="date"  onChange={handleMaxDateChange} placeholder="date de fin" />
                <button  onClick={handleSearch} className="PrincipalCol p-2 rounded-lg text-white ml-2" >Apply</button>
                </div>
            )}
        </nav>

  );
};

export default NavbarFilter;