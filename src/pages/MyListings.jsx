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

  // ✅ Fetch cars
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
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  // ✅ Delete car (toast-based confirmation)
  const handleDelete = async (id) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>🗑️ Are you sure you want to delete this car?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/car/${id}`);
                setCars((prevCars) => prevCars.filter((c) => c._id !== id));
                toast.dismiss();
                toast.success('Car deleted successfully!');
              } catch (error) {
                console.error(error);
                toast.dismiss();
                toast.error('Failed to delete car.');
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 text-black px-3 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  // ✅ Update modal close & success toast
  const handleUpdate = (updated) => {
    setCars((prevCars) =>
      prevCars.map((c) => (c._id === updated._id ? updated : c))
    );
    setSelectedCar(null);
    toast.success('Car updated successfully!');
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
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Car Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Rent Price</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Provider</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{car.name}</td>
                  <td className="py-2 px-4 border-b">{car.category}</td>
                  <td className="py-2 px-4 border-b">${car.pricePerDay}</td>
                  <td className="py-2 px-4 border-b">
                    {car.status || 'Available'}
                  </td>
                  <td className="py-2 px-4 border-b">{car.providerName}</td>
                  <td className="py-2 px-4 border-b flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        toast.info('Editing car details...');
                      }}
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

      {/* ✅ Update Modal */}
      {selectedCar && (
        <UpdateCarModal
          car={selectedCar}
          onClose={() => {
            setSelectedCar(null);
            toast.info('Update canceled.');
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyListings;
