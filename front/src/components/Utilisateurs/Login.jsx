import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, motDePasse });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  
  return (
    <div className="container">
        <h1 className="title">Connexion</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
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

export default Login;
