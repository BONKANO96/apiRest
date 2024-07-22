// src/components/Utilisateurs/Utilisateurs.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/utilisateurs');
      setUtilisateurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {utilisateurs.map(utilisateur => (
          <li key={utilisateur.id}>{utilisateur.nom} {utilisateur.prénom}</li>
        ))}
      </ul>
    </div>
  );
};

export default Utilisateurs;
