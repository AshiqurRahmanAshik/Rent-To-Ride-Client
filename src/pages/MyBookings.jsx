import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-bookings?email=${user.email}`
        );
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleRemove = async (bookingId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`
      );
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success('Booking cancelled successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel booking.');
    }
  };

  if (loading) return <p className="text-center py-10">Loading bookings...</p>;
  if (bookings.length === 0)
    return <p className="text-center py-10">No bookings found.</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      {/* Large screen table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Car</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Rent Price</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="py-2 px-4 flex items-center justify-center gap-2">
                  <img
                    src={b.image}
                    alt={b.carName}
                    className="w-16 h-10 object-cover rounded"
                  />
                  {b.carName}
                </td>
                <td className="py-2 px-4">{b.category}</td>
                <td className="py-2 px-4">${b.rentPrice.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleRemove(b._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={b.image}
                alt={b.carName}
                className="w-20 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{b.carName}</h2>
                <p className="text-gray-600">{b.category}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">${b.rentPrice.toFixed(2)}</p>
              <button
                onClick={() => handleRemove(b._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Unbook
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
