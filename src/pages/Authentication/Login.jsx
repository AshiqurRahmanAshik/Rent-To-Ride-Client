import { Link, useLocation, useNavigate } from 'react-router';
import bgImg from '../../assets/loginImg.png';
import logo from '../../assets/carLogo.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import {
  AiFillGoogleCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false); // 👈 state for eye toggle

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (err.code === 'auth/user-not-found') {
        toast.error('No user found with this email');
      } else if (err.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many login attempts. Please try again later.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        toast.error('Google sign-in popup closed. Try again.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    try {
      await signIn(email, pass);
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (err.code === 'auth/user-not-found') {
        toast.error('No user found with this email');
      } else if (err.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many login attempts. Please try again later.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        toast.error('Google sign-in popup closed. Try again.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center ">Welcome back!</p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4  transition-colors duration-300 transform border rounded-lg "
          >
            <FcGoogle />
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center  uppercase hover:underline">
              or login with email
            </div>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2  border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>

            <div className="mt-4 relative">
              <label
                className="block mb-2 text-sm font-medium "
                htmlFor="loggingPassword"
              >
                Password
              </label>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2  border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type={showPassword ? 'text' : 'password'}
              />

              <div
                className="absolute top-10 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link to="/register" className="text-xs  uppercase hover:underline">
              or sign up
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
