import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router";

const MyCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, carId: null });

  const API_URL = "http://localhost:9000"; // Update with your API URL

  useEffect(() => {
    fetchMyCars();
  }, [user]);

  const fetchMyCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/my-cars?providerEmail=${user.email}`
      );
      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`${API_URL}/car/${carId}`);
      setCars(cars.filter((car) => car._id !== carId));
      setDeleteModal({ show: false, carId: null });
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Failed to delete car:", error);
      alert("Failed to delete car. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Cars 🚗</h1>
          <p className="text-gray-600 mt-1">Manage your car listings</p>
        </div>
        <Link
          to="/dashboard/add-car"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          + Add New Car
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Cars</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {cars.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              🚗
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {cars.filter((car) => car.status === "Available").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Booked</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {cars.filter((car) => car.status === "Booked").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              📅
            </div>
          </div>
        </div>
      </div>

      {/* Cars List */}
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Car Image */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      car.status === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {car.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {car.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Price per Day:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ${car.pricePerDay}
                    </span>
                  </div>

                  {car.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {car.description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/edit-car/${car._id}`}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      setDeleteModal({ show: true, carId: car._id })
                    }
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Cars Listed Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start adding your cars to rent them out and earn money!
          </p>
          <Link
            to="/dashboard/add-car"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add Your First Car
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Delete Car?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this car? This action cannot be
              undone and will remove the car from your listings.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, carId: null })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCar(deleteModal.carId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
