import { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings`
        );
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 bg-white shadow-md rounded-md"
            >
              <h2 className="text-lg font-bold text-blue-600">
                Car ID: {booking.carId}
              </h2>
              <p className="text-gray-700">Email: {booking.email}</p>
              <p className="text-gray-700">
                Start: {new Date(booking.startingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                End: {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 italic">
                Comment: {booking.comment || 'N/A'}
              </p>
              <p className="mt-2 font-semibold text-green-600">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
