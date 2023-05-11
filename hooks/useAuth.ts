import axios from 'axios';

import { useState, useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setAuthState({ loading: true, error: null, data: null });
      const { data } = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      setAuthState({ loading: false, error: null, data });
    } catch (err: any) {
      const error = err.response.data.errors[0].errorMessage;
      setAuthState({ loading: false, error, data: null });
    }
  };

  const signup = async () => {};

  return {
    signin,
    signup,
  };
};

export default useAuth;
