const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors()); // Permet les requêtes depuis n'importe quel domaine
const port = 3000;

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());

// Configuration de la base de données PostgreSQL
const sequelize = new Sequelize('my_library', 'my_libraryUser', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

app.use('/login', userRoutes);
app.get('/utilisateurs', async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM \"Utilisateurs\"");
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (utilisateur) {
            res.status(200).json(utilisateur);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Nouvelle route POST pour créer un utilisateur
app.post('/utilisateurs', async (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
        // Hash du mot de passe avant de le sauvegarder
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Création de l'utilisateur
        const nouvelUtilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe: hashedPassword,
            date_inscription: new Date()
        });

        res.status(201).json(nouvelUtilisateur);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'L\'adresse e-mail est déjà utilisée' });
        } else if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

const jwtSecret = process.env.JWT_SECRET || 'votre_secret_jwt';

app.post('/connexion', async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (utilisateur && await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)) {
            const token = jwt.sign({ id: utilisateur.id }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ message: 'Connexion réussie', token });
        } else {
            res.status(401).json({ error: 'Email ou mot de passe invalide' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});


app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
});


app.put('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si un nouveau mot de passe est fourni, le hacher avant de le sauvegarder
        if (mot_de_passe) {
            utilisateur.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
        }

        // Mise à jour des autres champs
        utilisateur.nom = nom || utilisateur.nom;
        utilisateur.prenom = prenom || utilisateur.prenom;
        utilisateur.email = email || utilisateur.email;

        // Sauvegarde des modifications
        await utilisateur.save();

        res.status(200).json(utilisateur);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'L\'adresse e-mail est déjà utilisée' });
        } else if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});


// DELETE supprimer un utilisateur
app.delete('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await utilisateur.destroy();
        res.status(200).json({ message: `Utilisateur avec l'id = ${id} supprimé avec succès` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(err => console.error('Impossible de se connecter à la base de données:', err));

// Définition des modèles Sequelize
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


const initDatabase = async () => {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = [
        { nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-01-01 12:00:00') },
        { nom: 'Martin', prenom: 'Marie', email: 'marie.martin@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-02-01 12:00:00') },
        { nom: 'Durand', prenom: 'Pierre', email: 'pierre.durand@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-03-01 12:00:00') },
        { nom: 'Leroy', prenom: 'Anne', email: 'anne.leroy@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-04-01 12:00:00') },
        { nom: 'Moreau', prenom: 'Paul', email: 'paul.moreau@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-05-01 12:00:00') },
        { nom: 'Roux', prenom: 'Julie', email: 'julie.roux@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-06-01 12:00:00') },
        { nom: 'Petit', prenom: 'Luc', email: 'luc.petit@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-07-01 12:00:00') },
        { nom: 'Richard', prenom: 'Emma', email: 'emma.richard@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-08-01 12:00:00') },
        { nom: 'Schneider', prenom: 'Hugo', email: 'hugo.schneider@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-09-01 12:00:00') },
        { nom: 'Lefevre', prenom: 'Sophie', email: 'sophie.lefevre@example.com', mot_de_passe: hashedPassword, date_inscription: new Date('2024-10-01 12:00:00') }
    ];

    try {
        await Utilisateur.bulkCreate(users);
        console.log('Données initiales insérées');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
    }
};

// Démarrer le serveur
app.listen(port, async () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
    await initDatabase();
});
