import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Utilisateurs.css';

const DeleteUtilisateur = () => {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/utilisateurs/${id}`);
            setMessage('Utilisateur supprimé avec succès');
            setTimeout(() => navigate('/utilisateurs'), 2000);
        } catch (err) {
            setMessage('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Supprimer un utilisateur</h1>
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
                <button type="submit" className="button">Supprimer</button>
            </form>
        </div>
    );
};

export default DeleteUtilisateur;
