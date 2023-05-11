'use client';

import Link from 'next/link';
import AuthModal from './AuthModal';

import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-4 flex justify-between w-screen ">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          {loading ? null : !data ? (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          ) : (
            <>
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-2"
                onClick={() => signout()}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
