import axios from 'axios';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import CarCard from '../components/CarCard';
import { FaCar } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AddCar from './AddCar';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(''); // 🔹 Search state
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars`
        );
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
        toast.error('Failed to fetch cars.');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleViewDetails = (carId) => {
    if (!user) {
      toast.info('Please login to view car details!', { autoClose: 2000 });
      navigate('/login');
    } else {
      navigate(`/car/${carId}`);
    }
  };

  // 🔹 Filter cars based on search query
  const filteredCars = useMemo(() => {
    const query = search.toLowerCase();
    return cars.filter(
      (car) =>
        car.name?.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query) ||
        car.model?.toLowerCase().includes(query)
    );
  }, [cars, search]);

  const handleCarAdded = (newCar) => {
    setCars((prev) => [...prev, newCar]);
  };

  // 🔹 Loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-center px-6 py-10">
      {/* Heading */}
      <div className="text-center mt-12 mb-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-600 flex items-center gap-3">
          <FaCar className="text-blue-600" />
          Explore Our Premium Cars
        </h2>
        <p className="mt-4 text-gray-600 md:text-xl max-w-xl">
          Explore our wide range of premium cars and find your perfect ride.
        </p>
      </div>

      {/* 🔹 Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cars by name, brand or model..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>

      {/* 🔹 Show count / message */}
      {search && (
        <p className="text-gray-600 font-medium mb-6">
          {filteredCars.length > 0 ? (
            <>
              {filteredCars.length} car{filteredCars.length > 1 ? 's' : ''}{' '}
              found.
            </>
          ) : (
            <span className="text-red-500">No cars found.</span>
          )}
        </p>
      )}

      {/* 🔹 Cars Grid */}
      <div className="grid grid-cols-1 gap-8 xl:mt-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              onViewDetails={() => handleViewDetails(car._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-red-500 font-semibold text-lg">
              No cars found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
