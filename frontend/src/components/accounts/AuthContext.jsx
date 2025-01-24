import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import { jwtDecode } from "jwt-decode";
//Set Up JWT Persistence (Optional)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ user, setUser] = useState(null);
 useEffect(() =>{
    const token = localStorage.getItem("jwt");
    if (token) {
      console.log(token)
        // Decode token to get user info (use jwt-decode library if necessary)
        try {
          const user = jwtDecode(token); // Assuming jwt-decode is installed
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Invalid token:", error);
          logout(); // Clear invalid token
        }
      }
    }, []);
    const login = (userData, token) => {
        localStorage.setItem("jwt", token)
        setIsAuthenticated(true);
        setUser(userData);
    };


    const logout = () => {
        localStorage.removeItem("jwt")
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };