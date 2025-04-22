import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, userLogin, userLogout } from "../utils/user.js";
import { useNavigate } from "react-router";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
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
        };
  });

  // Theme mode: "light", "dark", or "system"
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "system";
  });

  // System theme preference (true = dark)
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Determine effective theme based on mode
  const effectiveTheme =
    themeMode === "light"
      ? "thehub"
      : themeMode === "dark"
      ? "thedarkhub"
      : systemPrefersDark
      ? "thedarkhub"
      : "thehub";

  // Apply effective theme to <html> and persist mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode, effectiveTheme]);

  // Track system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setSystemPrefersDark(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Persist pinboard settings
  useEffect(() => {
    localStorage.setItem("pinboardSettings", JSON.stringify(pinboardSettings));
  }, [pinboardSettings]);

  // Fetch user on mount
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
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

  const logout = () => {
    userLogout();
    setUser(null);
    setThemeMode("system"); // Reset theme to system on logout
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
        themeMode,
        setThemeMode,
        effectiveTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
