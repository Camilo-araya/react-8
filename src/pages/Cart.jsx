import React, { useContext } from 'react';
import '../assets/style/Cart.css';
import { useCart } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; 

function Cart() {
  const { cart, updateQuantity, removeFromCart, calculateTotal, clearCart } = useCart();
  const { token } = useContext(UserContext);
  const navigate = useNavigate(); 

  const increaseQuantity = (pizzaId) => {
    const pizza = cart.find((item) => item.id === pizzaId);
    updateQuantity(pizzaId, pizza.quantity + 1);
  };

  const decreaseQuantity = (pizzaId) => {
    const pizza = cart.find((item) => item.id === pizzaId);
    if (pizza.quantity > 1) {
      updateQuantity(pizzaId, pizza.quantity - 1);
    } else {
      removeFromCart(pizzaId);
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      alert('Debes iniciar sesión para poder pagar.');
      navigate('/login'); 
      return;
    }

    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega algunos items para pagar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(cart.map(item => ({
          pizzaId: item.id, 
          quantity: item.quantity,
        }))),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al realizar el checkout:', errorData);
        alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
        return;
      }

      const data = await response.json();
      console.log('Pedido realizado con éxito:', data);
      alert('Pedido realizado con éxito. ¡Gracias por tu compra!');
      clearCart(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error de red al realizar el checkout:', error);
      alert('Hubo un error de red al procesar tu pedido. Por favor, verifica tu conexión e intenta de nuevo.');
    }
  };

  if (!cart || cart.length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Detalles del pedido:</h2>
      <div className="cart-items">
        {cart.map((pizza) => (
          <div key={pizza.id} className="cart-item">
            <img src={pizza.img} alt={pizza.name} className="pizza-imageN" />
            <div className="pizza-name">{pizza.name}</div>
            <div className="pizza-price">${pizza.price}</div>
            <button
              onClick={() => decreaseQuantity(pizza.id)}
              className="quantity-button decrease"
            >
              -
            </button>
            <div className="quantity-display">{pizza.quantity}</div>
            <button
              onClick={() => increaseQuantity(pizza.id)}
              className="quantity-button increase"
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">Total: ${calculateTotal()}</div>
      <button
        className="pay-button"
        onClick={handleCheckout} 
        disabled={!token || cart.length === 0} 
        style={{ opacity: !token || cart.length === 0 ? 0.5 : 1, cursor: !token || cart.length === 0 ? 'not-allowed' : 'pointer' }}
      >
        Pagar
      </button>
      {!token && (
        <p className="login-required">Debes iniciar sesión para poder pagar.</p>
      )}
      {cart.length === 0 && token && (
        <p className="empty-cart-message">Tu carrito está vacío. ¡Añade algunas pizzas!</p>
      )}
    </div>
  );
}

export default Cart;