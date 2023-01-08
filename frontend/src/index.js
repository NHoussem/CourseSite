import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './Style/main.css';
import AnnonceList from './Components/AnnonceList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

    <AnnonceList/>
  </React.StrictMode>
);

