import { createContext, useContext, useState, useEffect } from "react";
// import { fetchUser, userLogin, userLogout } from "../utils/user";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on initial load
  useEffect(() => {
    // const initializeUser = async () => {
    //   try {
    //     const userData = await fetchUser();
    //     setUser(userData);
    //   } catch {
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // initializeUser();
  }, []);

  // // Login function
  // const login = async (email, password) => {
  //   try {
  //     const userData = await userLogin(email, password);
  //     setUser(userData);
  //     return { success: true };
  //   } catch (error) {
  //     return { success: false, message: error };
  //   }
  // };

  // // Logout function
  // const logout = () => {
  //   userLogout();
  //   setUser(null);
  // };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
