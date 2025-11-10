import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-bookings?email=${user.email}`
      );
      setBookings(data);
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>Car</th>
              <th>Category</th>
              <th>Rent Price</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="py-2 px-4 border-b flex items-center justify-center gap-2">
                  <img
                    src={b.image}
                    alt={b.carName}
                    className="w-16 h-10 object-cover rounded"
                  />
                  {b.carName}
                </td>
                <td className="py-2 px-4 border-b">{b.category}</td>
                <td className="py-2 px-4 border-b">${b.rentPrice}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(b.startingDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(b.endDate).toLocaleDateString()}
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
