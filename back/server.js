const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes
app.use(bodyParser.json());

// Configuration de la base de données PostgreSQL
const sequelize = new Sequelize('my_library', 'my_libraryUser', '1234', {
    host: 'localhost',
    dialect: 'postgres'
  });

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(err => console.error('Impossible de se connecter à la base de données:', err));

// Définition des modèles Sequelize
const Utilisateur = sequelize.define('Utilisateur', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prénom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    date_inscription: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

const Livre = sequelize.define('Livre', {
    titre: { type: DataTypes.STRING, allowNull: false },
    auteur: { type: DataTypes.STRING, allowNull: false },
    date_publication: { type: DataTypes.DATE },
    isbn: { type: DataTypes.STRING, unique: true },
    nombre_pages: { type: DataTypes.INTEGER },
    résumé: { type: DataTypes.TEXT },
    image_couverture: { type: DataTypes.STRING },
});

const Catégorie = sequelize.define('Catégorie', {
    nom: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Emprunt = sequelize.define('Emprunt', {
    date_emprunt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    date_retour: { type: DataTypes.DATE },
});

const Commentaire = sequelize.define('Commentaire', {
    texte: { type: DataTypes.TEXT, allowNull: false },
    date_commentaire: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

const Évaluation = sequelize.define('Évaluation', {
    note: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    date_évaluation: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// Relations entre les modèles
Utilisateur.hasMany(Emprunt);
Emprunt.belongsTo(Utilisateur);
Livre.hasMany(Emprunt);
Emprunt.belongsTo(Livre);
Utilisateur.hasMany(Commentaire);
Commentaire.belongsTo(Utilisateur);
Livre.hasMany(Commentaire);
Commentaire.belongsTo(Livre);
Utilisateur.hasMany(Évaluation);
Évaluation.belongsTo(Utilisateur);
Livre.hasMany(Évaluation);
Évaluation.belongsTo(Livre);
Livre.belongsToMany(Catégorie, { through: 'Livre_Catégorie' });
Catégorie.belongsToMany(Livre, { through: 'Livre_Catégorie' });

// Synchronisation des modèles avec la base de données
sequelize.sync({ force: true })
    .then(() => console.log('Les modèles ont été synchronisés avec la base de données'))
    .catch(err => console.error('Erreur lors de la synchronisation des modèles:', err));

// Définition des routes de base
app.get('/', (req, res) => res.send('Bienvenue à la bibliothèque en ligne!'));

// Routes CRUD pour Utilisateur
app.post('/utilisateurs', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.create(req.body);
        res.status(201).json(utilisateur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/utilisateurs', async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll();
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/utilisateurs/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            res.status(200).json(utilisateur);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/utilisateurs/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            await utilisateur.update(req.body);
            res.status(200).json(utilisateur);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/utilisateurs/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            await utilisateur.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes CRUD pour Livre
app.post('/livres', async (req, res) => {
    try {
        const livre = await Livre.create(req.body);
        res.status(201).json(livre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/livres', async (req, res) => {
    try {
        const livres = await Livre.findAll();
        res.status(200).json(livres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/livres/:id', async (req, res) => {
    try {
        const livre = await Livre.findByPk(req.params.id);
        if (livre) {
            res.status(200).json(livre);
        } else {
            res.status(404).json({ error: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/livres/:id', async (req, res) => {
    try {
        const livre = await Livre.findByPk(req.params.id);
        if (livre) {
            await livre.update(req.body);
            res.status(200).json(livre);
        } else {
            res.status(404).json({ error: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/livres/:id', async (req, res) => {
    try {
        const livre = await Livre.findByPk(req.params.id);
        if (livre) {
            await livre.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Livre non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes CRUD pour Catégorie
app.post('/categories', async (req, res) => {
    try {
        const categorie = await Catégorie.create(req.body);
        res.status(201).json(categorie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await Catégorie.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/categories/:id', async (req, res) => {
    try {
        const categorie = await Catégorie.findByPk(req.params.id);
        if (categorie) {
            res.status(200).json(categorie);
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const categorie = await Catégorie.findByPk(req.params.id);
        if (categorie) {
            await categorie.update(req.body);
            res.status(200).json(categorie);
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        const categorie = await Catégorie.findByPk(req.params.id);
        if (categorie) {
            await categorie.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Catégorie non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes CRUD pour Emprunt
app.post('/emprunts', async (req, res) => {
    try {
        const emprunt = await Emprunt.create(req.body);
        res.status(201).json(emprunt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/emprunts', async (req, res) => {
    try {
        const emprunts = await Emprunt.findAll();
        res.status(200).json(emprunts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/emprunts/:id', async (req, res) => {
    try {
        const emprunt = await Emprunt.findByPk(req.params.id);
        if (emprunt) {
            res.status(200).json(emprunt);
        } else {
            res.status(404).json({ error: 'Emprunt non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/emprunts/:id', async (req, res) => {
    try {
        const emprunt = await Emprunt.findByPk(req.params.id);
        if (emprunt) {
            await emprunt.update(req.body);
            res.status(200).json(emprunt);
        } else {
            res.status(404).json({ error: 'Emprunt non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/emprunts/:id', async (req, res) => {
    try {
        const emprunt = await Emprunt.findByPk(req.params.id);
        if (emprunt) {
            await emprunt.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Emprunt non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes CRUD pour Commentaire
app.post('/commentaires', async (req, res) => {
    try {
        const commentaire = await Commentaire.create(req.body);
        res.status(201).json(commentaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/commentaires', async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll();
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/commentaires/:id', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.id);
        if (commentaire) {
            res.status(200).json(commentaire);
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/commentaires/:id', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.id);
        if (commentaire) {
            await commentaire.update(req.body);
            res.status(200).json(commentaire);
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/commentaires/:id', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.id);
        if (commentaire) {
            await commentaire.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes CRUD pour Évaluation
app.post('/evaluations', async (req, res) => {
    try {
        const evaluation = await Évaluation.create(req.body);
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/evaluations', async (req, res) => {
    try {
        const evaluations = await Évaluation.findAll();
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/evaluations/:id', async (req, res) => {
    try {
        const evaluation = await Évaluation.findByPk(req.params.id);
        if (evaluation) {
            res.status(200).json(evaluation);
        } else {
            res.status(404).json({ error: 'Évaluation non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/evaluations/:id', async (req, res) => {
    try {
        const evaluation = await Évaluation.findByPk(req.params.id);
        if (evaluation) {
            await evaluation.update(req.body);
            res.status(200).json(evaluation);
        } else {
            res.status(404).json({ error: 'Évaluation non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/evaluations/:id', async (req, res) => {
    try {
        const evaluation = await Évaluation.findByPk(req.params.id);
        if (evaluation) {
            await evaluation.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Évaluation non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Démarrer le serveur
app.listen(port, () => console.log(`Serveur en cours d'exécution sur http://localhost:${port}`));
