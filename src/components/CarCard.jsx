import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

const CarCard = ({ car }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    category,
    description,
    model,
    name,
    pricePerDay,
    provider,
    image,
    _id,
  } = car || {};

  // Handle View Details click
  const handleViewDetails = () => {
    if (!user) {
      toast.info('Please login to view car details!', { autoClose: 2000 });
      navigate('/login');
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
          <span className="text-xs font-semibold text-gray-500 uppercase">
            {model}
          </span>
          <span className="px-3 py-1 text-[10px] text-blue-800 uppercase bg-blue-100 rounded-full font-medium">
            {category}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-800">{name}</h2>

        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center mt-2 text-gray-700 font-semibold">
          <span>Provider: {provider?.name || 'N/A'}</span>
          <span className="text-blue-600">${pricePerDay}/day</span>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
