import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  operatorProfile?: any;
  customerProfile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to restore session on load using localStorage
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const profileRes = await axios.get("/api/auth/me");
          setUser(profileRes.data.user);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log("Session expired or invalid.");
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (data: { user: User; accessToken: string }) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${data.accessToken}`;
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (e) {}
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
