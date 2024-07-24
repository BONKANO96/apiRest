import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Utilisateurs from './components/Utilisateurs/Utilisateurs';
import Livres from './components/Livres/Livres';
import AjouterUtilisateur from './components/Utilisateurs/AjouterUtilisateur';
import DeleteUtilisateur from './components/Utilisateurs/DeleteUtilisateur';
import UpdateUtilisateur from './components/Utilisateurs/UpdateUtilisateur';
import Login from './components/Utilisateurs/Login';
import Profile from './components/Utilisateurs/Profile';
import { Navigate } from 'react-router-dom';
import Connexion from './components/Utilisateurs/Connexion';
        
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};        
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/livres" element={<Livres />} />
          <Route path="/ajouter-utilisateur" element={<AjouterUtilisateur />} />
          <Route path="/supprimer-utilisateur" element={<DeleteUtilisateur />} />
          <Route path="/modifier-utilisateur" element={<UpdateUtilisateur />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <h1>Bienvenue à la bibliothèque en ligne!</h1>;

export default App;
