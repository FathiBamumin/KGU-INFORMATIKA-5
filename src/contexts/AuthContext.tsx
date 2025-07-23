import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  userType: "guru" | "siswa";
}

interface AuthContextType {
  user: User | null;
  login: (userType: "guru" | "siswa", credentials: { username: string; password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userType: "guru" | "siswa", credentials: { username: string; password: string }) => {
    // Simple demo authentication - in real app, this would call an API
    const validCredentials = {
      guru: { username: "guru123", password: "password123" },
      siswa: { username: "siswa123", password: "password123" }
    };

    const isValid = 
      credentials.username === validCredentials[userType].username &&
      credentials.password === validCredentials[userType].password;

    if (isValid || credentials.username.length > 0) { // Allow any non-empty username for demo
      setUser({
        username: credentials.username,
        userType: userType
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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