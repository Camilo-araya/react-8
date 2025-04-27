import React, { createContext, useState, useCallback } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  const login = useCallback(async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        console.error("Error de inicio de sesión");
        return false;
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("Error de registro");
        return false;
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      return true;
    } catch (error) {
      console.error("Error al registrarse:", error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setEmail("");
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      console.log("No hay token para obtener el perfil.");
      return false;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error al obtener el perfil:", response.status);
        if (response.status === 401) {
          logout();
        }
        return false;
      }

      const data = await response.json();
      setEmail(data.email);
      return true;
    } catch (error) {
      console.error("Error al comunicarse con el servidor para obtener el perfil:", error);
      return false;
    }
  }, [token, logout, setEmail]);

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
};