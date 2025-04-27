import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/NotFound.css'; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">¡Oops! Página no encontrada</h1>
      <p className="not-found-message">
        Parece que te has perdido en el delicioso laberinto de pizzas.
      </p>
      <img
        src="https://media.tenor.com/On7kvXhzml4AAAAC/404-not-found.gif" 
        alt="404 Not Found"
        className="not-found-image"
      />
      <Link to="/" className="not-found-link">
        Volver a la pizzería
      </Link>
    </div>
  );
}

export default NotFound;