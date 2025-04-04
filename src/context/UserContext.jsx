import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, userLogin, userLogout } from "../utils/user.js";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on initial load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await fetchUser();
        console.log("Loaded user:", userData);
        setUser(userData);
      } catch (err) {
        console.warn("No valid token or user session found.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const userData = await userLogin(email, password);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error };
    }
  };

  // Logout function
  const logout = () => {
    userLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
