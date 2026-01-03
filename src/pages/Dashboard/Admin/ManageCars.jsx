import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, car: null });
  const [filter, setFilter] = useState("all"); // all, available, booked

  const API_URL = "https://server-rent-to-go.vercel.app"; // Update with your API URL

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cars`);
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
      setDeleteModal({ show: false, car: null });
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Failed to delete car:", error);
      alert("Failed to delete car. Please try again.");
    }
  };

  const filteredCars = cars.filter((car) => {
    if (filter === "all") return true;
    if (filter === "available") return car.status === "Available";
    if (filter === "booked") return car.status === "Booked";
    return true;
  });

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
          <h1 className="text-3xl font-bold text-gray-800">Manage Cars 🚙</h1>
          <p className="text-gray-600 mt-1">View and manage all car listings</p>
        </div>
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

      {/* Filter Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          All ({cars.length})
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "available"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Available ({cars.filter((c) => c.status === "Available").length})
        </button>
        <button
          onClick={() => setFilter("booked")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "booked"
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Booked ({cars.filter((c) => c.status === "Booked").length})
        </button>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Car
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Price/Day
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {car.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {car.providerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.providerEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {car.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    ${car.pricePerDay}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        car.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setDeleteModal({ show: true, car })}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No cars found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.car && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Delete Car?
            </h3>

            <div className="mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <img
                  src={deleteModal.car.image}
                  alt={deleteModal.car.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {deleteModal.car.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {deleteModal.car.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {deleteModal.car.providerName}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, car: null })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCar(deleteModal.car._id)}
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

export default ManageCars;
