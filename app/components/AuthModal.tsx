'use client';

import { useState, useCallback, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthInput from './AuthInput';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import CircleLoading from './CircleLoading';
import { Alert } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { loading, data, error } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  );

  useEffect(() => {
    if (isSignIn) {
      return inputs.password && inputs.email
        ? setDisabled(false)
        : setDisabled(true);
    }
    const isDisabled = Object.values(inputs).some((v) => v === '');
    setDisabled(isDisabled);
  }, [inputs]);

  const handleClick = () => {
    isSignIn
      ? signin({ email: inputs.email, password: inputs.password })
      : null;
  };

  const signUpOrSignInButtonStyle = `${
    isSignIn ? 'bg-blue-400 text-white' : 'bg-white text-black border-black '
  }  border p-1 px-4 rounded ${isSignIn ? 'mr-2' : ''}`;

  return (
    <div>
      <button
        className={signUpOrSignInButtonStyle}
        type="button"
        onClick={handleOpen}
      >
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <CircleLoading />
        ) : (
          <Box sx={style}>
            <div className="p-2 h-[600px]">
              {error && (
                <Alert severity="error" className="mb-2">
                  {error}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-bottom mb-2 border-b-2">
                <p className="text-sm">
                  {isSignIn ? 'Sign In' : 'Sign Up'} to OpenTable
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl forn-light text-center">
                  {isSignIn ? 'Log  Into Your Account' : 'Create Your Account'}
                </h2>
                <AuthInput
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
              </div>
              <button
                type="button"
                className="bg-red-600 text-white p-2 px-4 rounded mt-2 w-full disabled:opacity-60"
                disabled={disabled}
                onClick={handleClick}
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
