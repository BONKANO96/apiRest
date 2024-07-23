import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Utilisateurs.css';

const UpdateUtilisateur = () => {
    const [id, setId] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/utilisateurs/${id}`, {
                nom,
                prenom,
                email,
                mot_de_passe: motDePasse
            });
            setMessage('Utilisateur modifié avec succès');
            setTimeout(() => navigate('/utilisateurs'), 2000);
        } catch (err) {
            setMessage('Erreur lors de la modification de l\'utilisateur');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Modifier un utilisateur</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label className="container">ID de l'utilisateur:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="container">
                    <label className="container">Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className="container">
                    <label className="container">Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div className="container">
                    <label className="container">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="container">
                    <label className="container">Mot de passe:</label>
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </div>
                <button type="submit" className="button">Modifier</button>
            </form>
        </div>
    );
};

export default UpdateUtilisateur;
