import { Link, useLocation, useNavigate } from "react-router";
import bgImg from "../../assets/loginImg.png";
import logo from "../../assets/sport-car.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue, // Added setValue for demo buttons
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    setAuthError("");
    try {
      await signInWithGoogle();
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      let errorMessage = "";

      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many login attempts. Please try again later.";
      } else if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Google sign-in popup closed. Try again.";
      } else {
        errorMessage = "Something went wrong. Please try again.";
      }

      setAuthError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const onSubmit = async (data) => {
    setAuthError("");
    try {
      await signIn(data.email, data.password);
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      let errorMessage = "";

      if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
        setError("email", { type: "manual", message: errorMessage });
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No user found with this email";
        setError("email", { type: "manual", message: errorMessage });
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
        setError("password", { type: "manual", message: errorMessage });
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many login attempts. Please try again later.";
      } else {
        errorMessage = "Something went wrong. Please try again.";
      }

      setAuthError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Demo credential handlers
  const handleDemoUser = () => {
    setValue("email", "user@gmail.com");
    setValue("password", "User@gmail.com");
    setAuthError("");
    setShowPassword(false);
  };

  const handleDemoAdmin = () => {
    setValue("email", "admin@gmail.com");
    setValue("password", "Admin@gmail.com");
    setAuthError("");
    setShowPassword(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center">Welcome back!</p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <FcGoogle />
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          {/* Demo Credential Buttons */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-center text-gray-500 mb-2">
              Quick Demo Access:
            </p>

            {/* Demo User Button */}
            <button
              type="button"
              onClick={handleDemoUser}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>🎭</span>
              <span>Demo User Login</span>
            </button>

            {/* Demo Admin Button */}
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>👑</span>
              <span>Demo Admin Login</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center uppercase hover:underline">
              or login with email
            </div>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          {authError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-sm">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                onChange={(e) => {
                  setAuthError("");
                  register("email").onChange(e);
                }}
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4 relative">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="loggingPassword"
              >
                Password
              </label>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onChange={(e) => {
                  setAuthError("");
                  register("password").onChange(e);
                }}
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
              />

              <div
                className="absolute top-10 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link to="/register" className="text-xs uppercase hover:underline">
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
