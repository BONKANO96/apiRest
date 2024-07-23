import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Utilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/Utilisateurs')
      .then(res => {
        setUtilisateurs(Object.keys(res.data[0]))
        setRecords(res.data)
      })
    }, []);

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            <table>
                <thead>
                    <tr>
                      {utilisateurs.map((c, i) => (
                        <th key={i}>{c}</th>
                      ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((d, i) => (
                        <tr key={i}>
                          <td>{d.id}</td>
                          <td>{d.nom}</td>
                          <td>{d.prenom}</td>
                          <td>{d.email}</td>
                            <td>{new Date(d.date_inscription).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Utilisateurs;
