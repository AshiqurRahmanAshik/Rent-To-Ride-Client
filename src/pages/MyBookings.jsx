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

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
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
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border rounded-lg p-4 shadow-md flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={b.image}
                alt={b.carName}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{b.carName}</h2>
                <p className="text-gray-600">{b.category}</p>
                <p className="text-gray-600">
                  ${Number(b.rentPrice).toFixed(2)}/day
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(b._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Unbook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
