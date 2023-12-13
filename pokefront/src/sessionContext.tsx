// sessionContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface AuthState {
  sessionToken?: string;
  userId?: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  sessionToken?: string;
  userId?: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [data, setData] = useState<AuthState>(() => {
    const storedSessionToken = localStorage.getItem('sessionToken');
    const userId = localStorage.getItem('userId');
    return { sessionToken: storedSessionToken || '', userId: userId || undefined };
  });


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
      localStorage.setItem('userId', response.data._id);

      setData({ sessionToken, userId: response.data._id });
      navigate('/catcher');

    } catch (error) {
      console.error('Error signing in:', error);
    }
  }, []);

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
      value={{ sessionToken: data.sessionToken, signIn, signOut, userId: data.userId }}>
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
