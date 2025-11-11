import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/carLogo.png';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeClass = 'text-blue-500 font-semibold'; // Active link style
  const normalClass = 'text-gray-700';

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto relative">
      {/* Logo */}
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-2">
          <img className="w-24" src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none items-center gap-4">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse-cars"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Browse Cars
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/add-car"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Add Your Car
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-listings"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  My Listings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  My Bookings
                </NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end ml-4 z-50">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full" title={user?.displayName}>
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

      {/* Mobile Section */}
      <div className="md:hidden flex-none">
        {user ? (
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
              {/* User Info */}
              <li>
                <span className="font-medium">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">{user.email}</span>
              </li>
              <li className="divider"></li>

              {/* Navigation Links */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/browse-cars"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Browse Cars
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-car"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Add Your Car
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-listings"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  My Listings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  My Bookings
                </NavLink>
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
          // Hamburger menu for guests
          <>
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

            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-base-100 shadow-md md:hidden z-40">
                <ul className="flex flex-col p-4 gap-2">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/browse-cars"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Browse Cars
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Signup
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
