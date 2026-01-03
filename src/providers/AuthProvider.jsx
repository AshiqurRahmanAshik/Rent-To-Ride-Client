/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios"; // ✅ Added

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Backend API URL - আপনার backend URL দিন
const API_URL = "http://localhost:9000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ NEW: Sync user to backend and fetch role
  const syncUserToBackend = async (firebaseUser) => {
    if (!firebaseUser) return firebaseUser;

    try {
      console.log("🔄 Syncing user to backend...");

      // Create/Update user in backend
      await axios.post(`${API_URL}/users`, {
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        photoURL: firebaseUser.photoURL || "",
        role: "user", // Default role
      });

      // Fetch user with role from backend
      const response = await axios.get(`${API_URL}/user/${firebaseUser.email}`);

      // Add role to user object
      const userWithRole = {
        ...firebaseUser,
        role: response.data.role || "user",
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };

      console.log("✅ User synced successfully. Role:", userWithRole.role);
      return userWithRole;
    } catch (error) {
      console.error("❌ Failed to sync user:", error.message);
      // If sync fails, return user without role
      return {
        ...firebaseUser,
        role: "user", // Default role
      };
    }
  };

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(async () => {
      // Refresh user instantly after update
      await auth.currentUser.reload();
      const updatedUser = await syncUserToBackend(auth.currentUser);
      setUser(updatedUser);
    });
  };

  // 🔄 Refresh user manually (for use in other components if needed)
  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const refreshedUser = await syncUserToBackend(auth.currentUser);
      setUser(refreshedUser);
    }
  };

  // ✅ Listen for auth changes with backend sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Sync user to backend and get role
        const userWithRole = await syncUserToBackend(currentUser);
        setUser(userWithRole);
        console.log("CurrentUser -->", userWithRole);
      } else {
        setUser(null);
        console.log("User logged out");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
