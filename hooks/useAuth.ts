import axios from 'axios';

import { useState, useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';

interface SignIn {
  email: string;
  password: string;
  handleClose?: () => void;
}

interface SignUp extends SignIn {
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  password: string;
}

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async ({ email, password, handleClose }: SignIn) => {
    try {
      setAuthState({ loading: true, error: null, data: null });
      const { data } = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      setAuthState({ loading: false, error: null, data });
      handleClose && handleClose();
    } catch (err: any) {
      const error = err.response.data.errors[0].errorMessage;
      setAuthState({ loading: false, error, data: null });
    }
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    city,
    phone,
    handleClose,
  }: SignUp) => {
    try {
      setAuthState({ loading: true, error: null, data: null });
      const { data } = await axios.post('/api/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });

      setAuthState({ loading: false, error: null, data });
      handleClose && handleClose();
    } catch (err: any) {
      const error = err.response.data.errors[0].errorMessage;
      setAuthState({ loading: false, error, data: null });
    }
  };

  return {
    signin,
    signup,
  };
};

export default useAuth;
