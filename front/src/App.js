import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Utilisateurs from './components/Utilisateurs/Utilisateurs';
import Livres from './components/Livres/Livres';
import AjouterUtilisateur from './components/Utilisateurs/AjouterUtilisateur';
import DeleteUtilisateur from './components/Utilisateurs/DeleteUtilisateur';
import UpdateUtilisateur from './components/Utilisateurs/UpdateUtilisateur';
/*
import Categories from './components/Categories/Categories';
import Emprunts from './components/Emprunts/Emprunts';
import Commentaires from './components/Commentaires/Commentaires';
import Evaluations from './components/Evaluations/Evaluations';*/
/* <Route path="/categories" element={<Categories />} />
          <Route path="/emprunts" element={<Emprunts />} />
          <Route path="/commentaires" element={<Commentaires />} />
          <Route path="/evaluations" element={<Evaluations />} /> */

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/livres" element={<Livres />} />
          <Route path="/ajouter-utilisateur" element={<AjouterUtilisateur />} />
          <Route path="/supprimer-utilisateur" element={<DeleteUtilisateur />} />
          <Route path="/modifier-utilisateur" element={<UpdateUtilisateur />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <h1>Bienvenue à la bibliothèque en ligne!</h1>;

export default App;
