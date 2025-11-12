import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Link } from 'react-router';
import logo from '../assets/carLogo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 shadow-inner">
      <div className="container mx-auto px-6 py-10">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Rent To Ride" className="h-14 w-auto" />
            <span className="text-xl font-bold dark:text-white">
              Rent To Ride
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center mt-6 gap-6">
            <Link
              to="/"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/team"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Teams
            </Link>
            <Link
              to="/privacy"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              Privacy
            </Link>
          </div>
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Bottom */}
        <div className="text-center ">
          <p className="text-sm dark:text-gray-300">
            © 2025 Rent To Ride. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
