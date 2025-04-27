import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(UserContext); 
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      setRegisterError('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setRegisterError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }

    const success = await register({ email, password }); 
    if (success) {
      navigate('/login'); 
    } else {
      setRegisterError('Registro fallido. Por favor, intenta de nuevo.'); 
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          width: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Registro</h2>
        {registerError && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {registerError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Apellido:</label>
            <input
              type="text"
              id="apellido"
              placeholder="Tu apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Correo electrónico:</label>
            <input
              type="email"
              id="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Contraseña:</label>
            <input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  marginBottom: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'background-color 0.3s ease',
};

export default Register;