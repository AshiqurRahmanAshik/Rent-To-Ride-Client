import { Link, useNavigate } from "react-router";
import bgImg from "../../assets/loginImg.png";
import logo from "../../assets/sport-car.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile, setUser } =
    useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;

    // Password validation
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (!uppercasePattern.test(pass)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!lowercasePattern.test(pass)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await createUser(email, pass);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, photoURL: photo, displayName: name });
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        default:
          toast.error(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Signin Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        default:
          toast.error(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="Logo" />
          </div>

          <p className="mt-3 text-xl text-center ">
            Get Your Free Account Now.
          </p>

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

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center uppercase hover:underline">
              or Register with Email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium " htmlFor="name">
                Username
              </label>
              <input
                id="name"
                name="name"
                autoFocus
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                type="text"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium "
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id="photo"
                name="photo"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                type="text"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium "
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                autoComplete="email"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                type="email"
              />
            </div>

            <div className="mt-4 relative">
              <label
                className="block mb-2 text-sm font-medium "
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                type={showPass ? "text" : "password"}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-9 right-3 cursor-pointer text-xl"
              >
                {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
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
