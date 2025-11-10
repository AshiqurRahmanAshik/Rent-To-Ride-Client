import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.pricePerDay ||
      !formData.location ||
      !formData.image
    ) {
      return toast.error('Please fill in all required fields!');
    }

    const newCar = {
      ...formData,
      providerName: user.displayName,
      providerEmail: user.email,
      status: 'Available',
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cars`, newCar);
      toast.success('Car added successfully!');
      setFormData({
        name: '',
        description: '',
        category: 'Sedan',
        pricePerDay: '',
        location: '',
        image: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add car.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Car</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Luxury</option>
          <option>Electric</option>
        </select>
        <input
          type="number"
          name="pricePerDay"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Price per day"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
