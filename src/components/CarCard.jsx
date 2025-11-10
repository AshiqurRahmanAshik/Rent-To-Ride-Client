import { Link } from 'react-router';

const CarCard = ({ car }) => {
  const { category, model, name, pricePerDay, provider } = car || {};

  return (
    <div className="w-full border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden">
      {/* Car Image */}
      <div className="w-full h-60 sm:h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden relative">
        <img
          src={
            car?.image || 'https://via.placeholder.com/400x225?text=Car+Image'
          }
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

        <p className="text-sm text-gray-600 line-clamp-3">
          Experience the perfect blend of style and performance. Smooth rides,
          premium interiors, and reliable service.
        </p>

        <div className="flex justify-between items-center mt-2 text-gray-700 font-semibold">
          <span>Provider: {provider.name}</span>
          <span className="text-blue-600">${pricePerDay}/day</span>
        </div>

        <Link to={`/car/${car._id}`}>
          <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
