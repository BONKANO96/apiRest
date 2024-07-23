import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const Utilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:3000/Utilisateurs')
      .then(res => {
        setUtilisateurs(Object.keys(res.data[0]).slice(0, 4))
        setRecords(res.data)
      })
    }, []);

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            <button onClick={() => navigate('/ajouter-utilisateur')}>Ajouter un utilisateur</button>
            <table>
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
                            <button onClick={() => navigate('/supprimer-utilisateur')}>Supprimer un utilisateur</button>
                            <button onClick={() => navigate('/modifier-utilisateur')}>Modifier un utilisateur</button>
                          </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Utilisateurs;
