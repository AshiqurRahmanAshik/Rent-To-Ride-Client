import { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If loader returns null or fetch fails
  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Car Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    _id,
    name,
    description,
    image,
    category,
    pricePerDay,
    location,
    status: initialStatus,
    providerName,
    providerEmail,
  } = car;

  const [status, setStatus] = useState(initialStatus || 'Available');
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
      toast.error(error?.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img
        src={image || 'https://via.placeholder.com/800x400?text=Car+Image'}
        alt={name}
        className="w-full h-72 object-cover rounded-lg mb-6 shadow"
      />

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p>{description}</p>
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

        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Provider Information</h2>
          <p>
            <span className="font-semibold">Name:</span> {providerName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {providerEmail}
          </p>
        </div>
      </div>

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
