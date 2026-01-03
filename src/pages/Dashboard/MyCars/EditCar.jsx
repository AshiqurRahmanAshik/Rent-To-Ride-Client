import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    pricePerDay: "",
    image: "",
    description: "",
    features: "",
  });

  const API_URL = "https://server-rent-to-go.vercel.app"; // Update with your API URL

  const categories = [
    "Sedan",
    "SUV",
    "Luxury",
    "Sports",
    "Van",
    "Truck",
    "Electric",
    "Hybrid",
  ];

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/car/${id}`);
      const car = response.data;

      setFormData({
        name: car.name || "",
        category: car.category || "",
        pricePerDay: car.pricePerDay || "",
        image: car.image || "",
        description: car.description || "",
        features: Array.isArray(car.features) ? car.features.join(", ") : "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch car:", error);
      alert("Failed to load car details");
      navigate("/dashboard/my-cars");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.pricePerDay ||
      !formData.image
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const carData = {
      ...formData,
      pricePerDay: Number(formData.pricePerDay),
      features: formData.features
        ? formData.features.split(",").map((f) => f.trim())
        : [],
    };

    try {
      setSubmitting(true);
      await axios.put(`${API_URL}/car/${id}`, carData);
      alert("Car updated successfully!");
      navigate("/dashboard/my-cars");
    } catch (error) {
      console.error("Failed to update car:", error);
      alert("Failed to update car. Please try again.");
      setSubmitting(false);
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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Car 🚗</h1>
        <p className="text-gray-600 mt-1">Update your car listing details</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        {/* Car Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Car Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Toyota Camry 2023"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Per Day */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Per Day ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="e.g., 50"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/car-image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {formData.image && (
            <div className="mt-3">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your car (optional)"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="e.g., GPS, Air Conditioning, Bluetooth"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple features with commas
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-cars")}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
