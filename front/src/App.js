import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Utilisateurs from './components/Utilisateurs/Utilisateurs';
import Livres from './components/Livres/Livres';/*
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
          
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <h1>Bienvenue à la bibliothèque en ligne!</h1>;

export default App;
