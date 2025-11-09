import { useContext } from 'react';
import { Link } from 'react-router';
import logo from '../assets/carLogo.png';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-24" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-none">
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
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>

        {/* User Dropdown */}
        {user && (
          <div className="dropdown dropdown-end ml-4 z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
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
    </div>
  );
};

export default Navbar;
