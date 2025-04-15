import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, userLogin, userLogout } from "../utils/user.js";
import { useNavigate } from "react-router";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pinboardSettings, setPinboardSettings] = useState(() => {
    const stored = localStorage.getItem("pinboardSettings");
    return stored
      ? JSON.parse(stored)
      : {
          all: true,
          posts: true,
          lists: true,
          calendar: true,
        };
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? JSON.parse(stored) : "thehub";
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("pinboardSettings", JSON.stringify(pinboardSettings));
  }, [pinboardSettings]);

  // Load and apply current Theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  // Fetch user on initial load
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return; // Skip API call if no token
      }

      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        console.warn("No valid token or user session found.", err);
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
    navigate("/get-started");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
        pinboardSettings,
        setPinboardSettings,
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
