import { useState, useContext } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const {
    _id,
    name,
    description,
    image,
    category,
    pricePerDay,
    location,
    status: initialStatus,
    providerEmail,
    provider,
  } = car;

  const [status, setStatus] = useState(initialStatus);

  // Check if logged-in user is the provider
  const isOwnCar = user?.email === providerEmail;

  const handleBooking = async () => {
    if (!user?.email) return toast.error('Please log in to book a car!');

    if (isOwnCar) return toast.error('You cannot book your own car!');

    const booking = {
      carId: _id,
      carName: name,
      category,
      rentPrice: Number(pricePerDay),
      email: user.email,
      image,
      location,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, booking);
      toast.success('Car booked successfully!');
      setStatus('Booked');
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.message ||
        'Failed to book car. Please try again.';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover rounded-lg mb-6 shadow"
      />

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
          <span className="font-semibold">Rent Price:</span> $
          {Number(pricePerDay).toFixed(2)}/day
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

      {/* Booking Button */}
      {status === 'Available' ? (
        <button
          onClick={handleBooking}
          disabled={isOwnCar}
          className={`mt-6 w-full py-2 rounded transition ${
            isOwnCar
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isOwnCar ? 'Cannot Book Own Car' : 'Book Now'}
        </button>
      ) : (
        <button
          disabled
          className="mt-6 text-red-500 font-semibold border border-red-500 w-full py-2 rounded cursor-not-allowed"
        >
          Already Booked
        </button>
      )}
    </div>
  );
};

export default CarDetails;
