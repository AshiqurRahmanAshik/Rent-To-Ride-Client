import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('You must be logged in to update profile.');

    try {
      setLoading(true);
      await updateUserProfile(displayName, photoURL); // ✅ Use AuthContext function
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full input input-bordered dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium mb-1 dark:text-gray-300"
            >
              Profile Photo URL
            </label>
            <input
              id="photo"
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full input input-bordered dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter photo URL"
              required
            />
          </div>

          {/* Profile Preview */}
          {photoURL && (
            <div className="flex justify-center my-4">
              <img
                src={photoURL}
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-blue-400 shadow-sm object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
