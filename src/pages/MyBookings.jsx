import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

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

  if (loading)
    return (
      <p className="text-center py-10">
        <LoadingSpinner />
      </p>
    );
  if (bookings.length === 0)
    return <p className="text-center py-10">No bookings found.</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full  border rounded-lg shadow-md">
          <thead>
            <tr className=" text-left">
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Car Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price/Day</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <img
                    src={b.image}
                    alt={b.carName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b">{b.carName}</td>
                <td className="px-4 py-2 border-b">{b.category}</td>
                <td className="px-4 py-2 border-b">
                  ${Number(b.rentPrice).toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleRemove(b._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Unbook
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
