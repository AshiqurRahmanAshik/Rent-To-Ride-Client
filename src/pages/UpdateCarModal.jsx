import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateCarModal = ({ car, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: car.name,
    description: car.description || '',
    category: car.category,
    pricePerDay: car.pricePerDay,
    status: car.status || 'Available',
    location: car.location || '',
    image: car.image || '',
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        ...formData,
        providerName: car.providerName, // keep original
        providerEmail: car.providerEmail, // keep original
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/car/${car._id}`,
        updatedCar
      );

      toast.success('Car updated successfully!');
      onUpdate({ ...car, ...updatedCar });
      onClose();
    } catch (error) {
      toast.error('Failed to update car.');
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-lg"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Update Car</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="w-full border p-3 rounded-md"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded-md"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
            <option>Electric</option>
          </select>
          <input
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="Rent Price per Day"
            className="w-full border p-3 rounded-md"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-3 rounded-md"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded-md"
          />

          {/* Provider info (read-only) */}
          <input
            type="text"
            value={car.providerName}
            readOnly
            className="w-full border p-3 rounded-md bg-gray-100"
          />
          <input
            type="email"
            value={car.providerEmail}
            readOnly
            className="w-full border p-3 rounded-md bg-gray-100"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          >
            <option>Available</option>
            <option>Booked</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;
