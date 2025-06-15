import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState();

  async function updateUser(userData) {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  }

  // Function to log in a user
  const login = async (userData, token, role) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setToken(token);
      setRole(role);

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", JSON.stringify(token));
      await AsyncStorage.setItem("role", JSON.stringify(role));
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      // setUser(null);
      setIsAuthenticated(false);
      setToken("");

      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Load user from AsyncStorage on app start hhh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");
        const storedRole = await AsyncStorage.getItem("role");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          setToken(JSON.parse(storedToken));
          setRole(JSON.parse(storedRole));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        login,
        logout,
        token,
        updateUser,
        role,
      }}>
      {loading ? null : children}
      {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
