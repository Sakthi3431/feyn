import { createContext,useContext, useState, useEffect } from "react";
import axios from "axios";
import { authAPI } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      authAPI.getProfile()
        .then(res => setUser(res.data))
        .catch(() => localStorage.clear())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    setUser(res.data.user);
    return res.data.user;
  };

    const RegisterUser = async (data) => {
    const res = await authAPI.register(data);
    return res.data;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const contextData = {
    user,
    RegisterUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);