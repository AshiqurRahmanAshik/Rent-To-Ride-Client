import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Circular Spinner */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute w-24 h-24 border-8 border-t-sky-500 border-gray-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />

        {/* Inner pulse circle */}
        <motion.div
          className="w-10 h-10 bg-sky-400 rounded-full shadow-md"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 font-medium animate-pulse text-lg">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
