import { Credentials, getMe } from "@api-caller/authenApi";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./Loading";
import { IMe } from "@constants/interface";

const AuthContext = createContext({
  doctorId: "",
  isAuthenticated: false,
  login: async (accessToken: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const router = useNavigate();
  const { changeLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  useEffect(() => {
    checkAccessToken();
  }, [children]);
  const checkAccessToken = async () => {
    const token:Credentials =
      sessionStorage.getItem("token") &&
      JSON.parse(sessionStorage.getItem("token") || "");
      console.log(token);
    try {
      if (token) {
        const response: IMe = await getMe(token.accessToken);
        changeLoading(false);
        setIsAuthenticated(true);
        setDoctorId(response.doctor_id);
      } else {
        router("/signin");
      }
    } catch (error) {
      setIsAuthenticated(false);
      // sessionStorage.removeItem("token");
      router("/signin");
    }
  };

  const login = async (accessToken: any) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("token", accessToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ doctorId, isAuthenticated, login, logout }}>
      {isAuthenticated && children}
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
