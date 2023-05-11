'use client';

import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({ loading: true, error: null, data: null });
    try {
      const jwt = getCookie('jwt');

      if (!jwt) {
        setAuthState({ loading: false, error: null, data: null });
        return;
      }

      const { data } = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      setAuthState({ loading: false, error: null, data });
    } catch (err: any) {
      const error = err.response.data.errors[0].errorMessage;
      setAuthState({ loading: false, error: error, data: null });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
