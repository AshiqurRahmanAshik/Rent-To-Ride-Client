import { Link } from 'react-router';

const CarCard = ({ car }) => {
  console.log(car);
  const { category, model, name, pricePerDay, providerName } = car || {};
  return (
    <div className="w-full border px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">{model}</span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">{name}</h1>
        <p className="mt-2 text-sm text-gray-600 ">
          Dramatically redefine bleeding-edge infrastructures after
          client-focused value. Intrinsicly seize user-centric partnerships
          through out-of-the-box architectures. Distinctively.
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Name of the Provider: {providerName}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Price Per Day: {pricePerDay}$
        </p>
        <Link
          to={`/cars/${car._id}`}
          className="inline-block mt-4 text-sm w-full
          text-blue-600 hover:underline "
        >
          <button className="w-full border rounded p-1">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
