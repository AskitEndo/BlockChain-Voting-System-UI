import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Set default authorization header for all requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (id, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          id,
          password,
        }
      );

      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set authorization header for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;

      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Remove authorization header
    delete axios.defaults.headers.common["Authorization"];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
