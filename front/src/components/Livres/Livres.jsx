// src/components/Livres/Livres.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Livres = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    fetchLivres();
  }, []);

  const fetchLivres = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livres');
      setLivres(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres:', error);
    }
  };

  return (
    <div>
      <h2>Liste des livres</h2>
      <ul>
        {livres.map(livre => (
          <li key={livre.id}>{livre.titre} par {livre.auteur}</li>
        ))}
      </ul>
    </div>
  );
};

export default Livres;
