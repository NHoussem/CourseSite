import React, { useContext, useRef, useState, } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import Wilayas from '../data/Wlayas.json'
import Communes from '../data/Communes.json'

const AnnonceForm = () => {
  const inputImages = useRef(null);
  let { user } = useContext(AuthContext)
  const [annonceData, setAnnonceData] = useState({
    Titre: '',
    Description: '',
    Tarif: '',
    Categorie: '',
    ThemeAnn: '',
    Modalite: '',
    images: [],
    utilisateur_id: 0,
  });
  const AnnonceId = useParams();
  let history = useNavigate()
  const [Titre, setTitle] = useState('');
  const [Lieu, setLieu] = useState('');
  const [Categorie, setSelectedCategorie] = useState('');
  const [ThemeAnn, setSelectedTheme] = useState('');
  const [Modalite, setSelectedModalit] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [Tarif, setTarif] = useState('');
  const [Description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const handleFileInputChange = (event) => {
    setImages(event.target.files);
  };
  const handleCategorieChange = (event) => {
    setSelectedCategorie(event.target.value);
  };
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };
  const handleModalitChange = (event) => {
    setSelectedModalit(event.target.value);
  };
  const handleWilayaChange = (event) => {
    setSelectedWilaya(event.target.value);
  };
  const handleCommuneChange = (event) => {
    setSelectedCommune(event.target.value);
  };
  const onDrop = acceptedImages => {
    setImages(acceptedImages);
  };
  const handleImageChange = (event) => {
    setAnnonceData({
      ...annonceData,
      images: event.target.files
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  let createAnnonce = async (e) => {
    console.log(user)
    const formData = new FormData();
    formData.append('Titre', Titre);
    formData.append('Description', Description);
    formData.append('Tarif', parseInt(Tarif));
    formData.append('Categorie', Categorie);
    formData.append('ThemeAnn', ThemeAnn);
    formData.append('Modalite', Modalite);
    formData.append('nomWilaya', selectedWilaya);
    formData.append('NomCommune', selectedCommune);
    formData.append('Lieu', Lieu);
    formData.append('utilisateur_id', user.user_id)

    for (let i = 0; i < annonceData.images.length; i++) {
      formData.append('photos', annonceData.images[i]);
    }
    fetch(`http://127.0.0.1:8000/api/annonce/create/`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    history('/');
  };
  const handleSubmit = e => {
    e.preventDefault()
    createAnnonce()
    history('/');
  };
  const handleClickChange = () => {
    inputImages.current.click();
  }

  return (
    <div className="bg-PrincipalCol ml-56 px-5 border-solid shadow-2xl my-20 mx-20 w-2/3 rounded-xl">
      <Form method="POST" onSubmit={handleSubmit}>
        <div className=" ml-24">
          <FormGroup className='py-4 grid grid-cols-3 justify-center items-center'>
            {/* <Label for="title">Titre</Label> */}
            <Input
              className="bg-white col-span-2 rounded-lg border border-gray-300 py-2 px-4 block w-full leading-5 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              name="title"
              id="title"
              value={Titre}
              onChange={e => setTitle(e.target.value)}
              placeholder="Entrer un titre"
            />
          </FormGroup>
          <div className='grid-cols-3'>
            <FormGroup>
              {/* <Label for="Catégorie">Catégorie</Label> */}
              <select value={Categorie} onChange={handleCategorieChange} className="text-black m-10 px-4 py-2  rounded-md shadow hover:bg-gray-100">
                <option className='text-black ' value="" >Catégorie</option>
                <option value="Alger" className='text-black'>Primaire</option>
                <option value="Oran" className='text-black'>Collège</option>
                <option value="Constantine" className='text-black'>Lycée</option>

              </select>
              {/* <Label for="Theme">Thème</Label> */}
              <select value={ThemeAnn} onChange={handleThemeChange} className="text-black m-10 px-4 py-2 rounded-md shadow hover:bg-gray-100">
                <option className='text-black ' value="" >Thème</option>
                <option value="Science" className='text-black'>Science</option>
                <option value="Physique" className='text-black'>Physique</option>
                <option value="Mathématique" className='text-black'>Mathématique</option>
                <option value="Arabic" className='text-black'>Arabic</option>
                <option value="Français" className='text-black'>Français</option>
                <option value="Anglais" className='text-black'>Anglais</option>
              </select>
              {/* <Label for="Theme">Modalité</Label> */}
              <select value={Modalite} onChange={handleModalitChange} className="text-black m-10 px-4 py-2  rounded-md shadow hover:bg-gray-100">
                <option className='text-black ' value="" >Modalité</option>
                <option value="Alger" className='text-black'>Offline</option>
                <option value="Oran" className='text-black'>Online</option>
              </select>

            </FormGroup>
          </div>
          <FormGroup className='py-4 grid grid-cols-3 justify-center items-center'>
            <Label for="Tarif" className='bg-white rounded-lg border border-gray-300 py-2 px-4 block text-black focus:border-blue-500 w-32'>Tarif horaire</Label>
            <Input
              className="bg-white rounded-lg border border-gray-300 py-2 px-4 block  leading-5 text-gray-700 focus:outline-none focus:border-blue-500 w-56"
              type="number"
              name="Tarif"
              id="Tarif"
              value={Tarif}
              onChange={e => setTarif(e.target.value)}
              placeholder="Tarif/H"
            />
          </FormGroup>
          <div>
            <FormGroup>
              {/* <Label className='flex'>Wilaya:</Label> */}
              <select value={selectedWilaya} onChange={handleWilayaChange} className="text-black m-10 px-4 py-2   justify-center items-center rounded-md shadow hover:bg-gray-100">
                <option className='text-black ' value="" >Wilaya</option>
                {
                  Wilayas.map(wilaya => {
                    return (
                      <option value={wilaya.nomWilaya} className='text-black'>{wilaya.nomWilaya}</option>
                    )
                  })
                }
                {/* <option value="Alger" className='text-black'>Alger</option>
                <option value="Oran" className='text-black'>Oran</option>
                <option value="Constantine" className='text-black'>Constantine</option> */}
              </select>
              {/* <label className='m-1'>Commune:</label> */}
              <select value={selectedCommune} onChange={handleCommuneChange} className=" bg bg-white text-black m-10 px-4 py-2 rounded-md shadow hover:bg-gray-100">
                <option className='black p-2' value="">Commune</option>
                {/* {selectedWilaya && communes[selectedWilaya].map((commune) => (
                  <option key={commune} value={commune} className='text-black'>{commune}</option>
                ))} */}
                {
                  Communes.map(commune => {
                    if (commune.nomWilaya === selectedWilaya) {
                      return (
                        <option key={commune.nomCommune} value={commune.nomCommune} className='text-black'>{commune.nomCommune}</option>
                      )
                    }
                  })
                }
              </select>
            </FormGroup>
          </div>
          <FormGroup className='py-4 grid grid-cols-3 justify-center items-center'>
            {/* <Label for="title" className="block text-gray-700 font-medium mb-2">Lieu de la formation</Label> */}
            <Input
              className="bg-white col-span-2 rounded-lg border border-gray-300 py-2 px-4 block w-full leading-5 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              name="lieu"
              id="lieu"
              value={Lieu}
              onChange={e => setLieu(e.target.value)}
              placeholder="Entres le lieu de la formation"
            />
          </FormGroup>
          <FormGroup>
            {/* <Label for="description" className="block text-gray-700 font-medium mb-2">Description</Label> */}
            <textarea
              className="bg-white rounded-lg border border-gray-300 py-2 px-4 block w-4/6 leading-5 text-gray-700 focus:outline-none focus:border-blue-500 mt-5"
              name="description"
              id="description"
              value={Description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Entrer une description"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image" className="block text-gray-700 font-medium mb-2 mt-5">Images</Label>
            <div {...getRootProps()}>
              <input type="file" multiple name="images" ref={inputImages} className='hidden' onChange={handleImageChange} />
              <Button
                type="button"
                onClick={handleClickChange}
                className="bg-white rounded-lg border border-gray-300 py-2 px-4 block w-40 leading-5 text-gray-700 focus:outline-none focus:border-blue-500"
              >
                Charger images
              </Button>
            </div>
            <div className="mt-4">
              {/* {images.map(image => (
                    <img key={image.path} src={image.path} alt={image.path} />
                ))} */}
            </div>
          </FormGroup>
          <div className='flex justify-center items-center '>
            <Button onClick={handleSubmit} type="submit" className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full my-5 ">
              Poster
            </Button>
          </div>
        </div>
      </Form>

    </div>
  );
}

export default AnnonceForm;