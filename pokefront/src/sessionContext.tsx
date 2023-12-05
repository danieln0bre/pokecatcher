import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SessionContextProps {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const value: SessionContextProps = {
    sessionToken,
    setSessionToken,
  };

  console.log('Session Token in SessionProvider:', sessionToken);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

