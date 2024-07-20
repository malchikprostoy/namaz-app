// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/profile", { headers: { Authorization: token } })
        .then((response) => setUser(response.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/api/login", { email, password });
    const token = response.data.token;
    localStorage.setItem("token", token);
    const userResponse = await axios.get("/api/profile", {
      headers: { Authorization: token },
    });
    setUser(userResponse.data);
  };

  const register = async (name, email, password) => {
    await axios.post("/api/register", { name, email, password });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
