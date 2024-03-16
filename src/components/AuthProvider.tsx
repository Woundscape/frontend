import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./Loading";
import { DoctorType, IMe } from "@constants";
import { Credentials, getMe } from "@api-caller";

const AuthContext = createContext({
  me: undefined as IMe | undefined,
  isAuthenticated: false,
  login: async (accessToken: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const router = useNavigate();
  const { changeLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [me, setMe] = useState<IMe>();
  useEffect(() => {
    checkAccessToken();
  }, [children]);
  const checkAccessToken = async () => {
    const token: Credentials =
      sessionStorage.getItem("token") &&
      JSON.parse(sessionStorage.getItem("token") || "");
    try {
      if (token) {
        const response: IMe = await getMe(token.accessToken);
        if (
          response.doctor_type == DoctorType.General ||
          response.doctor_type == DoctorType.Reject
        ) {
          router("noApprove");
        }
        setIsAuthenticated(true);
        setMe(response);
        changeLoading(false);
      } else {
        router("/signin");
      }
    } catch (error) {
      logout();
    }
  };

  const login = async (accessToken: any) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("token", accessToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    router("/signin");
  };

  return (
    <AuthContext.Provider value={{ me, isAuthenticated, login, logout }}>
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
