import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext); 
  const navigate = useNavigate(); 
  const [loginError, setLoginError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoginError(''); 

    if (!email || !password) {
      setLoginError('Por favor, completa todos los campos.');
      return;
    }

    const success = await login({ email, password }); 
    if (success) {
      
      navigate('/profile'); 
    } else {
      
      setLoginError('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa', 
      }}
    >
      <div
        style={{
          border: '1px solid #ddd',
          padding: '30px',
          borderRadius: '8px',
          width: '400px',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          Iniciar Sesión
        </h2>
        {loginError && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {loginError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;