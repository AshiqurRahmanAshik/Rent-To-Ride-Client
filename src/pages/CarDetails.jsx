import { useState } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const CarDetails = () => {
  const car = useLoaderData();
  const {
    _id,
    name,
    description,
    image,
    category,
    pricePerDay,
    location,
    status: initialStatus,
    provider,
  } = car;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState(initialStatus); // Local status state

  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailPattern.test(e.target.value)) {
      setEmailError('Enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Enter your email!');
    }

    if (!emailPattern.test(email)) {
      return toast.error('Enter a valid email!');
    }

    const booking = {
      carId: _id,
      carName: name,
      category,
      rentPrice: pricePerDay,
      email,
      image,
      location,
      provider,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, booking);
      toast.success('Car booked successfully!');
      setEmail('');
      setStatus('Booked'); // Update status locally
    } catch (error) {
      console.error(error);
      toast.error('Failed to book car.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Car Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover rounded-lg mb-6 shadow"
      />

      {/* Car Info */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-gray-700">{description}</p>

        <p className="text-lg">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Rent Price:</span> ${pricePerDay}/day
        </p>
        <p
          className={`text-lg font-semibold ${
            status === 'Available' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          Status: {status}
        </p>

        {/* Provider Info */}
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Provider Information</h2>
          <p>
            <span className="font-semibold">Name:</span> {provider.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {provider.email}
          </p>
        </div>
      </div>

      {/* Booking Form */}
      {status === 'Available' && (
        <form onSubmit={handleBooking} className="mt-6">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full border p-2 rounded mb-1 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 mb-2 text-sm">{emailError}</p>
          )}
          <button
            type="submit"
            className=" cursor-pointer w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Book Now
          </button>
        </form>
      )}

      {status === 'Booked' && (
        <button
          className="mt-6 text-red-500 font-semibold text-center border border-red-500 w-full py-2 rounded cursor-not-allowed"
          disabled
        >
          Already Booked
        </button>
      )}
    </div>
  );
};

export default CarDetails;
