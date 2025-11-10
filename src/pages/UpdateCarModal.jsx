import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateCarModal = ({ car, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: car.name,
    category: car.category,
    pricePerDay: car.pricePerDay,
    status: car.status || 'Available',
    image: car.image,
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/car/${car._id}`,
        formData
      );
      toast.success('Car updated successfully!');
      onUpdate({ ...car, ...formData });
    } catch (error) {
      toast.error('Failed to update car.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 font-bold text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Update Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;
