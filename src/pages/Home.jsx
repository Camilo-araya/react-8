import React, { useState, useEffect } from 'react';
import SingleCardPizza from '../components/SingleCardPizza';
import Header from '../components/Header';
import '../assets/style/Home.css';

function Home() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPizzas(data);
        }
      })
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  if (pizzas.length === 0) {
    return (
      <div className="home-container">
        <Header />
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header />
      <div className="pizza-grid">
        {pizzas.map((pizza) => {
          console.log("Datos de la pizza en Home.jsx:", pizza);
          return <SingleCardPizza key={pizza.id} pizza={pizza} />;
        })}
      </div>
    </div>
  );
}

export default Home;