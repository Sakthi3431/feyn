import { createContext,useContext, useState, useEffect } from "react";
import axios from "axios";
import API, { authAPI } from "../services/api";
import toast from "react-hot-toast";

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
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    const profile = await authAPI.getProfile();
    setUser(profile.data);
    toast.success(`Welcome, ${profile.data.username}!`, {
      position: "top-right",
      autoClose: 500,
    })
    return profile.data
  };

    const RegisterUser = async (data) => {
    const res = await authAPI.register(data);
    return res.data;
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.error("Logging out", {
      position: "top-right",
      autoClose: 500,
    })
    setUser(null)
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