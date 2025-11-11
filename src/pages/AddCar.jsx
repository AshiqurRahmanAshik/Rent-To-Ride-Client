import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCar = ({ onCarAdded }) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    description: '',
    category: 'Select Category',
    pricePerDay: '',
    location: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, model, description, category, pricePerDay, location, image } =
      formData;

    if (
      !name ||
      !model ||
      !description ||
      !pricePerDay ||
      !location ||
      !image ||
      category === 'Select Category'
    ) {
      return toast.error(
        'Please fill in all required fields and select a category!'
      );
    }

    const newCar = {
      ...formData,
      providerName: user?.displayName,
      providerEmail: user?.email,
      status: 'Available',
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cars`,
        newCar
      );

      toast.success('Car added successfully!');
      if (onCarAdded) onCarAdded(data);

      setFormData({
        name: '',
        model: '',
        description: '',
        category: 'Select Category',
        pricePerDay: '',
        location: '',
        image: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add car.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Add New Car</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-md shadow-md space-y-4"
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
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model Name"
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
          required
        >
          <option>Select Category</option>
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
          placeholder="Rent Price per Day"
          className="w-full border p-2 rounded"
          required
          min="1"
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
          placeholder="Hosted Image URL"
          className="w-full border p-2 rounded"
          required
        />

        {/* Provider Info */}
        <div className="space-y-2 border p-4 rounded bg-gray-50">
          <h2 className="text-center font-bold text-xl">
            Provider Information
          </h2>
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
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
