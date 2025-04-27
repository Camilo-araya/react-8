import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../assets/style/Navbar.css';
import { useCart } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { cart, calculateTotal } = useCart();
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate(); 

  const total = calculateTotal();

  const formattedTotal = total.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">¡Pizzería Il Nino Totoli!</span>
      <ul className="navbar-links">
        <li className="navbar-link-item">
          <Link to="/" className="navbar-button">Home</Link>
        </li>
        {token ? (
          <>
            <li className="navbar-link-item">
              <Link to="/profile" className="navbar-button">Profile</Link>
            </li>
            <li className="navbar-link-item">
              <button className="navbar-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-link-item">
              <Link to="/login" className="navbar-button">Login</Link>
            </li>
            <li className="navbar-link-item">
              <Link to="/register" className="navbar-button">Register</Link>
            </li>
          </>
        )}
        <li className="navbar-link-item navbar-total">
          <Link to="/cart" className="navbar-button navbar-total-button">
            Total: {formattedTotal}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;