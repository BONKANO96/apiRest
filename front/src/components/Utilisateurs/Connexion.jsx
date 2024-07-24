import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './Utilisateurs.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/connexion', {
                email,
                mot_de_passe: motDePasse
            });
            localStorage.setItem('token', res.data.token); // Sauvegarder le token dans le localStorage
            setMessage('Connexion réussie');
            // Rediriger vers la page de profil après un délai
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setMessage(`Erreur: ${err.response.data.error}`);
            } else {
                setMessage('Erreur lors de la connexion');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="title">Connexion</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label className="container">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="container">
                    <label className="container">Mot de passe:</label>
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">Connexion</button>
            </form>
        </div>
    );
};

export default Connexion;
