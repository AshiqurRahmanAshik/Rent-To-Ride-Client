import { useContext, useState } from 'react';
import { Link } from 'react-router';
import logo from '../assets/carLogo.png';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto relative">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-24" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none items-center gap-4">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/browse-cars">Browse Cars</Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/add-car">Add Car</Link>
              </li>
              <li>
                <Link to="/my-listings">My Listings</Link>
              </li>
              <li>
                <Link to="/my-bookings">My Bookings</Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Signup</Link>
              </li>
            </>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end ml-4 z-50">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL}
                  alt="User Profile"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="font-medium">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">{user.email}</span>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="w-full text-center bg-gray-200 py-1 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Right Section */}
      <div className="md:hidden flex-none">
        {user ? (
          // Show avatar if logged in
          <div className="dropdown dropdown-end ml-2">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL}
                  alt="User Profile"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="font-medium">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">{user.email}</span>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="w-full text-center bg-gray-200 py-1 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // Show hamburger menu if not logged in
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu for guests */}
      {isMobileMenuOpen && !user && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md md:hidden z-40">
          <ul className="flex flex-col p-4 gap-2">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/browse-cars"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                Signup
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
