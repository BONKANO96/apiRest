import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const AjouterUtilisateur = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/utilisateurs', {
                nom,
                prenom,
                email,
                mot_de_passe: motDePasse
            });
            setMessage(`Utilisateur ajouté avec succès: ${res.data.nom} ${res.data.prenom}`);
            // Réinitialiser le formulaire après le succès
            setNom('');
            setPrenom('');
            setEmail('');
            setMotDePasse('');
            // Rediriger vers la liste des utilisateurs après un délai
            setTimeout(() => navigate('/utilisateurs'), 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(`Erreur: ${err.response.data.message}`);
            } else {
                setMessage('Erreur lors de l\'ajout de l\'utilisateur');
            }
        }
    };

    return (
        <div>
            <h1>Ajouter un utilisateur</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AjouterUtilisateur;
