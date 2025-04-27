import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { CartProvider } from './context/CartContext';
import { UserContext } from './context/UserContext'; 
import { UserProvider } from './context/UserContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? children : <Navigate to="/login" />;
};


const AuthRedirect = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<AuthRedirect><Register /></AuthRedirect>} />
            <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;