'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthInput from './AuthInput';

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

export default function AuthModal({ isSignIn }: { isSignIn: Boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signUpOrSignInButtonStyle = `${
    isSignIn ? 'bg-blue-400' : 'bg-white text-black border-black '
  } text-white border p-1 px-4 rounded ${isSignIn ? 'mr-2' : ''}`;

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
        <Box sx={style}>
          <div className="p-2 h-[600px]">
            <div className="uppercase font-bold text-center pb-2 border-bottom mb-2 border-b-2">
              <p className="text-sm">
                {isSignIn ? 'Sign In' : 'Sign Up'} to OpenTable
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl forn-light text-center">
                {isSignIn ? 'Log  Into Your Account' : 'Create Your Account'}
              </h2>
              <AuthInput />
            </div>
            <button
              type="button"
              className="bg-red-600 text-white p-2 px-4 rounded mt-2 w-full"
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
