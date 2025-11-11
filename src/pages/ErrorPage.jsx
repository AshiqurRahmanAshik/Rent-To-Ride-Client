import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
