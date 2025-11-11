import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider'; // adjust path

const CarCard = ({ car }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!car) return null;

  const {
    _id,
    category,
    description,
    model,
    name,
    pricePerDay,
    providerName,
    image,
  } = car;

  const handleViewDetails = () => {
    if (!user) {
      // Redirect to login and save intended path
      navigate('/login', { state: `/car/${_id}` });
    } else {
      navigate(`/car/${_id}`);
    }
  };

  return (
    <div className="w-full md:min-h-120 lg:min-h-130 flex flex-col lg:justify-between border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden">
      {/* Car Image */}
      <div className="w-full h-60 sm:h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden relative">
        <img
          src={image || 'https://via.placeholder.com/400x225?text=Car+Image'}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase">{model}</span>
          <span className="px-3 py-1 text-[10px] text-blue-800 uppercase bg-blue-100 rounded-full font-medium">
            {category}
          </span>
        </div>

        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm line-clamp-3">{description}</p>

        <div className="flex justify-between items-center my-2 font-semibold">
          <span>Provider: {providerName || 'N/A'}</span>
          <span className="text-blue-600">${pricePerDay}/day</span>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-center block hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
