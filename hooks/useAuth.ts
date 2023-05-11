import axios from 'axios';

import { useState } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      if (data) {
        setAuth(true);
        setUser(data);
      }

      return data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const signup = async () => {};

  return {
    auth,
    user,
    signin,
    signup,
  };
};

export default useAuth;
