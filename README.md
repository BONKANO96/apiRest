# Projet de Gestion des Utilisateurs
## Description
Ce projet est une application web permettant de gérer des utilisateurs. Elle permet d'ajouter, de modifier, de supprimer et de consulter des utilisateurs. L'application utilise React pour le frontend et Express.js avec Sequelize pour le backend. La base de données utilisée est PostgreSQL. La sécurité des mots de passe est assurée par bcrypt et l'authentification est gérée par JSON Web Tokens (JWT).

## Prérequis
Node.js (version 14.x ou supérieure)
npm (version 6.x ou supérieure)
PostgreSQL (version 12.x ou supérieure)
Un navigateur web moderne (Chrome, Firefox, Edge, etc.)
Installation
### 1. Cloner le dépôt
bash
Copier le code
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
### 2. Configuration du backend
Installez les dépendances :
bash
Copier le code
cd backend
npm install
Créez un fichier .env à la racine du dossier backend et ajoutez-y les variables d'environnement suivantes :
env
Copier le code
DATABASE_URL=postgres://my_libraryUser:1234@localhost:5432/my_library
JWT_SECRET=your_jwt_secret_key
Démarrez le serveur :
bash
Copier le code
npm start
Le serveur backend devrait maintenant être en cours d'exécution sur http://localhost:3000.

### 3. Configuration du frontend
Installez les dépendances :
bash
Copier le code
cd frontend
npm install
Démarrez l'application React :
bash
Copier le code
npm start
L'application frontend devrait maintenant être en cours d'exécution sur http://localhost:3001.

### Utilisation
Connexion
Rendez-vous sur http://localhost:3001/login.
Entrez les identifiants d'un utilisateur existant ou créez-en un nouveau via l'interface backend.
Gestion des utilisateurs
Ajouter un utilisateur : Cliquez sur "Ajouter un utilisateur" et remplissez le formulaire.
Modifier un utilisateur : Cliquez sur "Modifier" à côté de l'utilisateur que vous souhaitez modifier.
Supprimer un utilisateur : Cliquez sur "Supprimer" à côté de l'utilisateur que vous souhaitez supprimer.
## Structure du Projet
### Backend
server.js : Point d'entrée de l'application backend. Configure Express, Sequelize, et les routes.
routes : Contient les routes de l'API.
models : Contient les modèles Sequelize pour les utilisateurs.
### Frontend
src : Contient le code source React.
components : Contient les composants React (e.g., Login, Utilisateurs, AjouterUtilisateur, ModifierUtilisateur, SupprimerUtilisateur).
App.js : Composant principal de l'application React.
index.js : Point d'entrée de l'application React.
## Scripts
### Backend
npm start : Démarre le serveur Express.
npm run dev : Démarre le serveur Express avec nodemon pour le rechargement automatique.
### Frontend
npm start : Démarre l'application React en mode développement.
npm build : Génère une version optimisée de l'application pour la production.
## Sécurité
### Backend
bcrypt : Utilisé pour le hachage des mots de passe.
jsonwebtoken : Utilisé pour l'authentification JWT.
dotenv : Utilisé pour gérer les variables d'environnement.
### Frontend
localStorage : Utilisé pour stocker le jeton JWT.
axios : Utilisé pour les requêtes HTTP avec interception des erreurs et gestion des jetons.
## Points Importants
Assurez-vous que PostgreSQL est installé et en cours d'exécution.
Vérifiez que les variables d'environnement sont correctement configurées.
Utilisez des mots de passe forts et des secrets JWT sécurisés.
## Dépannage
Problèmes de connexion à la base de données : Vérifiez que PostgreSQL est en cours d'exécution et que les informations de connexion sont correctes.
Problèmes de compilation de React : Assurez-vous que toutes les dépendances sont installées et que votre version de Node.js est compatible.
Erreurs JWT : Vérifiez que JWT_SECRET est correctement configuré dans le fichier .env.
Contribution
Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des modifications que vous souhaitez apporter.

Ce projet est fourni "tel quel" sans aucune garantie. Utilisez-le à vos propres risques. Pour toute question ou assistance, n'hésitez pas à contacter le mainteneur du projet.
