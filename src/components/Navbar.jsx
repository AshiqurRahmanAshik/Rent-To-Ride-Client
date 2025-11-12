import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import logo from '../assets/carLogo.png';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // Apply theme globally
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleProfileUpdate = () => {
    navigate('/update-profile');
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  };

  const activeClass =
    theme === 'dark'
      ? 'text-blue-400 font-semibold'
      : 'text-blue-600 font-semibold';
  const normalClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  return (
    <div
      className={`navbar shadow-sm container px-4 mx-auto relative transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-base-100 text-black'
      }`}
    >
      {/* Logo */}
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-2">
          <img className="w-24" src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none items-center gap-4">
        <ul className="menu menu-horizontal px-1 gap-3">
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

          {/* Theme Toggle */}
          <div className="flex items-center ml-4">
            <label className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                checked={theme === 'dark'}
                className="toggle toggle-sm"
              />
              <span className="text-sm">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            </label>
          </div>
        </ul>

        {/* Profile Dropdown */}
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
              className={`menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-base-100 text-black'
              }`}
            >
              <li>
                <span className="font-medium">{user.displayName}</span>
              </li>
              <li>
                <span className="text-sm opacity-70">{user.email}</span>
              </li>
              <li>
                <button
                  onClick={handleProfileUpdate}
                  className={`w-full text-left py-1 rounded ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  Update Profile
                </button>
              </li>
              <li className="mt-1">
                <button
                  onClick={logOut}
                  className={`w-full text-left py-1 rounded ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex-none">
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
          <div
            className={`absolute top-full left-0 w-full shadow-md z-40 transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900 text-white'
                : 'bg-base-100 text-black'
            }`}
          >
            <ul className="flex flex-col p-4 gap-3">
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

              {/* Theme Toggle */}
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <input
                    type="checkbox"
                    onChange={(e) => handleTheme(e.target.checked)}
                    checked={theme === 'dark'}
                    className="toggle toggle-sm"
                  />
                </div>
              </li>

              {/* User Links */}
              {user && (
                <>
                  <li>
                    <button
                      onClick={() =>
                        setIsAccountDropdownOpen(!isAccountDropdownOpen)
                      }
                      className={`w-full text-left py-2 rounded flex justify-between items-center ${
                        theme === 'dark'
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      My Account
                      <span>{isAccountDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isAccountDropdownOpen && (
                      <ul className="ml-2 flex flex-col gap-2 mt-2">
                        <li>
                          <NavLink
                            to="/add-car"
                            className={normalClass}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Add Your Car
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/my-listings"
                            className={normalClass}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            My Listings
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/my-bookings"
                            className={normalClass}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            My Bookings
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={handleProfileUpdate}
                            className={`w-full text-left py-1 rounded ${
                              theme === 'dark'
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-gray-200'
                            }`}
                          >
                            Update Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={logOut}
                            className={`w-full text-left py-1 rounded ${
                              theme === 'dark'
                                ? 'bg-gray-700 hover:bg-gray-600'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            Log Out
                          </button>
                        </li>
                      </ul>
                    )}
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
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
