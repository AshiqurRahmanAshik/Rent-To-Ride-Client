import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import UpdateCarModal from './UpdateCarModal';
import { toast } from 'react-toastify';

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-cars?providerEmail=${user.email}`
        );
        setCars(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch your listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this car?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id}`);
      setCars((prevCars) => prevCars.filter((c) => c._id !== id));
      toast.success('Car deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete car.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">My Listings</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading your listings...</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Car Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Rent Price</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Provider</th> {/* Added */}
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="text-center">
                  <td className="py-2 px-4 border-b">{car.name}</td>
                  <td className="py-2 px-4 border-b">{car.category}</td>
                  <td className="py-2 px-4 border-b">${car.pricePerDay}</td>
                  <td className="py-2 px-4 border-b">
                    {car.status || 'Available'}
                  </td>
                  <td className="py-2 px-4 border-b">{car.providerName}</td>{' '}
                  {/* Added */}
                  <td className="py-2 px-4 border-b flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCar && (
        <UpdateCarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onUpdate={(updated) => {
            setCars((prevCars) =>
              prevCars.map((c) => (c._id === updated._id ? updated : c))
            );
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

export default MyListings;
