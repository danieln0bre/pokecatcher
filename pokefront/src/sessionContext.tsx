import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  sessionToken: string | null;
  updateSessionToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const updateSessionToken = (token: string | null) => {
    setSessionToken(token);
  };

  return (
    <AuthContext.Provider value={{ sessionToken, updateSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
