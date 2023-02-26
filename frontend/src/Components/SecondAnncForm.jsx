import React, { useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";

function CreateAnnonceForm() {
    let history = useNavigate()
  const [annonceData, setAnnonceData] = useState({
    Titre: '',
    Description: '',
    Tarif: '',
    Categorie: '',
    ThemeAnn: '',
    Modalite: '',
    images: []
  });

  const [localisationData, setLocalisationData] = useState({
    nomWilaya: '',
    NomCommune: '',
    NumRue: '',
    NomRue: '',
    NumLogement: ''
  });

  const handleAnnonceChange = (event) => {
    setAnnonceData({
      ...annonceData,
      [event.target.name]: event.target.value
    });
  };

  const handleLocalisationChange = (event) => {
    setLocalisationData({
      ...localisationData,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = (event) => {
    setAnnonceData({
      ...annonceData,
      images: event.target.files
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('Titre', "aaaaa");
    formData.append('Description', "DEsc");
    formData.append('Tarif', 100);
    formData.append('Categorie',"Lycée");
    formData.append('ThemeAnn', "Math");
    formData.append('Modalite', "Online");
    formData.append('nomWilaya', "1");
    formData.append('NomCommune', "alger");
    formData.append('NumRue', "10");
    formData.append('NomRue', "Test street");
    formData.append('NumLogement', "5");

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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input type="text" name="Titre" value={annonceData.Titre} onChange={handleAnnonceChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="Description" value={annonceData.Description} onChange={handleAnnonceChange} />
      </label>
      <br />
      <label>
        Tarif:
        <input type="number" name="Tarif" value={annonceData.Tarif} onChange={handleAnnonceChange} />
      </label>
      <br />
      <label>
        Catégorie:
        <select name="Categorie" value={annonceData.Categorie} onChange={handleAnnonceChange}>
          <option value="Catégorie 1">Catégorie 1</option>
          <option value="Catégorie 2">Catégorie 2</option>
          <option value="Catégorie 3">Catégorie 3</option>
        </select>
      </label>
      <br />
      <label>
        Thème:
        <select name="ThemeAnn" value={annonceData.ThemeAnn} onChange={handleAnnonceChange}>
        <option value="Theme1">Theme 1</option>
        <option value="Theme2">Theme 2</option>
        <option value="Theme3">Theme 3</option>
        </select>
        </label>

        <label htmlFor="Modalite">Modalite</label>
        <select name="Modalite" value={annonceData.Modalite} onChange={handleAnnonceChange}>
        <option value="Modalite1">Modalite 1</option>
        <option value="Modalite2">Modalite 2</option>
        <option value="Modalite3">Modalite 3</option>
        </select>

        <label htmlFor="Tarif">Tarif</label>
        <input type="number" name="Tarif" value={annonceData.Tarif} onChange={handleAnnonceChange} />

        <label htmlFor="Description">Description</label>
        <textarea name="Description" value={annonceData.Description} onChange={handleAnnonceChange} />

        <label htmlFor="images">Images</label>
        <input type="file" multiple name="images" onChange={handleImageChange} />

        {/* {annonceData.images && (
        <div>
            {annonceData.images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            ))}
        </div>
        )} */}

        <button type="submit">Submit</button></form>
  )}
export default CreateAnnonceForm;
