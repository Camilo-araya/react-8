import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/style/Pizza.css';
import { useCart } from '../context/CartContext';

function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPizza = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error al cargar la pizza: {error}</div>;
  }

  if (!pizza) {
    return <div className="not-found">Pizza no encontrada.</div>;
  }

  return (
    <div className="pizza-container">
      <img src={pizza.img} alt={pizza.name} className="pizza-image" />
      <h3 className="pizza-name">{pizza.name}</h3>
      <p className="pizza-price">Precio: {pizza.price}</p>
      <div className="pizza-ingredients">
        <strong>Ingredientes:</strong>
        <ul>
          {pizza.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <p className="pizza-description">{pizza.desc}</p>
      <button className="add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  );
}

export default Pizza;