import { getMe } from "@api-caller/authenApi";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingProvider } from "./Loading";

const AuthContext = createContext({
  isAuthenticated: false,
  login: async (accessToken: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const router = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = sessionStorage.getItem('token') && JSON.parse(sessionStorage.getItem("token") || "");
      try {
        if (token) {
          const response = await getMe(token);
          setIsAuthenticated(true);
          
        } else {
          setTimeout(() => {
            router("/signin");
          }, 1500);
        }
      } catch (error) {
        setTimeout(() => {
          setIsAuthenticated(false);
          sessionStorage.removeItem('token')
          router("/signin");
        }, 1500);
        
      }
    };
    checkAccessToken();
  }, []);

  const login = async (accessToken: any) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("token", accessToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <LoadingProvider>{isAuthenticated && children}</LoadingProvider>
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
