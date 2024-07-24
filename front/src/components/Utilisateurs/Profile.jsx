import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Utilisateur non authentifié');
        return;
      }

      try {
        const response = await axios.get('/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des données utilisateur');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Chargement des informations utilisateur...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Profil utilisateur</h1>
      <div>
        <p><strong>Nom:</strong> {user.nom}</p>
        <p><strong>Prénom:</strong> {user.prenom}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
