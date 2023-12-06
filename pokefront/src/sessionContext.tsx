// sessionContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  sessionToken?: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  sessionToken?: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const storedSessionToken = localStorage.getItem('sessionToken');
    return { sessionToken: storedSessionToken || '' };
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider mounted');
    return () => {
      console.log('AuthProvider unmounted');
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        'http://localhost:8080/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const sessionToken = response.data.authentication.sessionToken;
      console.log('sessionToken:', sessionToken);

      // Save the session token to localStorage
      localStorage.setItem('sessionToken', sessionToken);

      setData({ sessionToken });

      // Redirect to the '/catcher' route after successful sign-in
      navigate('/catcher');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }, [navigate]);

  const signOut = useCallback(() => {
    // Remove the session token from localStorage
    localStorage.removeItem('sessionToken');

    // Clear the session token in state
    setData({ sessionToken: undefined });
  }, []);

  useEffect(() => {
    console.log('Data changed:', data);
  }, [data.sessionToken]); // Log whenever sessionToken changes

  return (
    <AuthContext.Provider 
      value={{ sessionToken: data.sessionToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
