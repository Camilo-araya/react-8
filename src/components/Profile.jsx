import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { email, logout, fetchProfile, token } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    
    if (token) {
      fetchProfile();
    } else {
      
      navigate('/login');
    }
  }, [token, fetchProfile, navigate]); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '80vh',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Perfil de usuario</h1>
      {email ? (
        <p style={{ fontSize: '1.2em', marginBottom: '15px', color: '#555' }}>
          Email: <strong>{email}</strong>
        </p>
      ) : (
        <p>Cargando información del perfil...</p>
      )}
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Profile;