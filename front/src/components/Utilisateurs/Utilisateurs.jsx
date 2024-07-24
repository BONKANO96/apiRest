import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Utilisateurs.css'; // Assurez-vous que le chemin est correct

const Utilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:3000/Utilisateurs')
      .then(res => {
        setUtilisateurs(Object.keys(res.data[0]).slice(0, 4));
        setRecords(res.data);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      });
    }, []);

    return (
        <div className="container">
            <h1 className="title">Liste des Utilisateurs</h1>
            <button className="button" onClick={() => navigate('/ajouter-utilisateur')}>Ajouter un utilisateur</button>
            <button className="button" onClick={() => navigate('/login')}>Connectez vous!</button>
            <table className="table">
                <thead>
                    <tr>
                      {utilisateurs.map((c, i) => (
                        <th key={i}>{c}</th>
                      ))}
                      <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((d, i) => (
                        <tr key={i}>
                          <td>{d.id}</td>
                          <td>{d.nom}</td>
                          <td>{d.prenom}</td>
                          <td>{d.email}</td>
                          <td>
                            <button className="button" onClick={() => navigate(`/supprimer-utilisateur`)}>Supprimer</button>
                            <button className="button" onClick={() => navigate(`/modifier-utilisateur}`)}>Modifier</button>
                          </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Utilisateurs;
