'use client';
import Image from 'next/image';
import ErrorImage from '../../public/icons/error.png';
const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={ErrorImage} alt="Error" width={500} height={500} />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
        <p className="text-xl mt-4 text-red">
          We are having trouble loading the page you are looking for.
        </p>
        {error && (
          <p className="text-xl mt-4 text-red">Error: {error.message}</p>
        )}
      </div>
    </div>
  );
};

export default Error;
