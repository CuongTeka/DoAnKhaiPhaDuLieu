import React, { createContext, useContext, useState, useEffect } from "react";
import { handleCheckAuth, handleLogoutApi } from "./services/userService";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await handleCheckAuth();
        // console.log(response);
        if (response.message == "Authenticated") {
          setLoggedIn(true);
          // setAdmin(true);
          // console.log("granted");
          // setUsername(response.user.name);
          // localStorage.setItem("name", response.user.name);
          // console.log("username: ", localStorage.getItem("name"));
          // localStorage.setItem("id", response.user.id);
        } else {
          setLoggedIn(false);
          setAdmin(false);
          localStorage.removeItem("id");
          // setUsername(null);
        }
      } catch {
        setLoggedIn(false);
        setAdmin(false);
        localStorage.removeItem("id");
        // setUsername(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (isAdmin) => {
    setLoggedIn(true);
    setAdmin(isAdmin);
  };

  const logout = async () => {
    try {
      await handleLogoutApi();
      setLoggedIn(false);
      setAdmin(false);
      // setUsername(null);
      // Cookies.remove("token");
      // localStorage.clear();
      localStorage.removeItem("id");
      // window.location.href = "/login";
      // navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, logout, login, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
