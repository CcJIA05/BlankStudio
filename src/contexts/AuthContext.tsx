import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  showPasswordModal: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const INITIAL_PASSWORD = "000822";
const STORAGE_PASSWORD_KEY = "blankstudio_password";

function getStoredPassword(): string {
  try {
    return localStorage.getItem(STORAGE_PASSWORD_KEY) || INITIAL_PASSWORD;
  } catch {
    return INITIAL_PASSWORD;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password] = useState(getStoredPassword);

  const openPasswordModal = useCallback(() => {
    setShowPasswordModal(true);
  }, []);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
  }, []);

  const login = useCallback(
    (input: string): boolean => {
      if (input === password) {
        setIsAuthenticated(true);
        setShowPasswordModal(false);
        return true;
      }
      return false;
    },
    [password]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        showPasswordModal,
        openPasswordModal,
        closePasswordModal,
        login,
        logout,
        password,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
