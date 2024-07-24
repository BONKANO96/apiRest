const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "L'adresse e-mail doit être valide"
            }
        }
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isLongEnough(value) {
                if (value.length < 8) {
                    throw new Error("Le mot de passe doit contenir au moins 8 caractères");
                }
                if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
                    throw new Error("Le mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule");
                }
                if (!/[0-9]/.test(value)) {
                    throw new Error("Le mot de passe doit contenir au moins un chiffre");
                }
                if (!/[^a-zA-Z0-9]/.test(value)) {
                    throw new Error("Le mot de passe doit contenir au moins un caractère spécial");
                }
            }
        }
    },
    date_inscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});


module.exports = Utilisateur;