import { Link, useNavigate } from "react-router";
import bgImg from "../../assets/loginImg.png";
import logo from "../../assets/sport-car.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, setUser } =
    useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
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
      name: "",
      photo: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setAuthError("");

    // Password validation
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (!uppercasePattern.test(data.password)) {
      const errorMsg = "Password must contain at least one uppercase letter";
      setError("password", { type: "manual", message: errorMsg });
      toast.error(errorMsg);
      return;
    }

    if (!lowercasePattern.test(data.password)) {
      const errorMsg = "Password must contain at least one lowercase letter";
      setError("password", { type: "manual", message: errorMsg });
      toast.error(errorMsg);
      return;
    }

    if (data.password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setError("password", { type: "manual", message: errorMsg });
      toast.error(errorMsg);
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photo);
      setUser({ ...result.user, photoURL: data.photo, displayName: data.name });
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      let errorMessage = "";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          setError("email", { type: "manual", message: errorMessage });
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          setError("email", { type: "manual", message: errorMessage });
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          setError("password", { type: "manual", message: errorMessage });
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Try again later.";
          break;
        default:
          errorMessage =
            err.message || "Something went wrong. Please try again.";
      }

      setAuthError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signin Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      let errorMessage = "";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Try again later.";
          break;
        case "auth/popup-closed-by-user":
          errorMessage = "Google sign-in popup closed. Try again.";
          break;
        default:
          errorMessage =
            err.message || "Something went wrong. Please try again.";
      }

      setAuthError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Demo credential handlers
  // const handleDemoUser = () => {
  //   setValue("name", "Demo User");
  //   setValue("photo", "https://i.ibb.co/2yL5LJ8/user-avatar.png");
  //   setValue("email", "user@gmail.com");
  //   setValue("password", "User@gmail.com");
  //   setAuthError("");
  //   setShowPass(false);
  // };

  // const handleDemoAdmin = () => {
  //   setValue("name", "Admin");
  //   setValue("photo", "https://i.ibb.co/7X8zQKP/admin-avatar.png");
  //   setValue("email", "admin@gmail.com");
  //   setValue("password", "Admin@gmail.com");
  //   setAuthError("");
  //   setShowPass(false);
  // };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="Logo" />
          </div>

          <p className="mt-3 text-xl text-center">Get Your Free Account Now.</p>

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
          {/* <div className="mt-4 space-y-2">
            <p className="text-xs text-center text-gray-500 mb-2">
              Quick Demo Access:
            </p> */}

          {/* Demo User Button */}
          {/* <button
              type="button"
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>🎭</span>
              <span>Demo User Login</span>
            </button> */}

          {/* Demo Admin Button */}
          {/* <button
              type="button"
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <span>👑</span>
              <span>Demo Admin Login</span>
            </button>
          </div> */}

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center uppercase hover:underline">
              or Register with Email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          {authError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="text-sm">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="name">
                Username
              </label>
              <input
                id="name"
                autoFocus
                {...register("name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                onChange={(e) => {
                  setAuthError("");
                  register("name").onChange(e);
                }}
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                }`}
                type="text"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="photo">
                Photo URL
              </label>
              <input
                id="photo"
                {...register("photo", {
                  required: "Photo URL is required",
                  pattern: {
                    message: "Please enter a valid image URL",
                  },
                })}
                onChange={(e) => {
                  setAuthError("");
                  register("photo").onChange(e);
                }}
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none ${
                  errors.photo ? "border-red-500" : ""
                }`}
                type="text"
              />
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.photo.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
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
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none ${
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
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
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
                className={`block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPass ? "text" : "password"}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-9 right-3 cursor-pointer text-xl"
              >
                {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
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
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link to="/login" className="text-xs uppercase hover:underline">
              or sign in
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>

        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>
      </div>
    </div>
  );
};

export default Registration;
