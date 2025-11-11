import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import CarCard from '../components/CarCard';
import { FaCar } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AddCar from './AddCar';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loading state
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
        setLoading(false); // 🔹 Stop loading in all cases
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

  // For AddCar to notify BrowseCars
  const handleCarAdded = (newCar) => {
    setCars((prev) => [...prev, newCar]);
  };

  // 🔹 Spinner Loader
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-center">
      <div className="text-center mt-12 mb-10 flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-600 flex items-center gap-3">
          <FaCar className="text-blue-600" />
          Explore Our Premium Cars
        </h2>
        <p className="mt-4 text-gray-600 md:text-xl max-w-xl">
          Explore our wide range of premium cars and find your perfect ride.
        </p>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 gap-8 m-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            onViewDetails={() => handleViewDetails(car._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
