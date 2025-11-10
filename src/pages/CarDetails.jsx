import { useState } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const CarDetails = () => {
  const car = useLoaderData();
  const { _id, name, category, pricePerDay, image } = car;
  const [email, setEmail] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Enter your email!');

    const booking = {
      carId: _id,
      carName: name,
      category,
      rentPrice: pricePerDay,
      email,
      image,
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, booking);
      toast.success('Car booked successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to book car.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">
        {name} ({category})
      </h1>
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-lg font-bold mb-2">Price: ${pricePerDay}/day</p>
      <form onSubmit={handleBooking}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Book Car
        </button>
      </form>
    </div>
  );
};

export default CarDetails;
