/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';

const TopRatedCard = ({ car }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
        <p className="text-gray-500 mt-1">{car.type}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-5 w-5 ${
                i < car.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 mt-2 font-medium">${car.price}/day</p>
        <Link
          to={`/cars/${car._id}`}
          className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TopRatedCard;
