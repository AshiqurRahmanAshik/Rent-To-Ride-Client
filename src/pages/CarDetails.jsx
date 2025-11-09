import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';

const CarDetails = () => {
  const car = useLoaderData();
  const { _id, category, model, name, pricePerDay, providerName } = car || {};

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carId = _id;
    const comment = form.comment.value;
    const email = form.email.value;
    const status = 'pending';

    // Validation
    if (!email) {
      return toast.error('Please enter your email!');
    }

    // Booking object
    const booking = {
      carId,
      email,
      startingDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      comment,
      status,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        booking
      );

      console.log('Booking response:', data);
      toast.success('Car reserved successfully!');
      form.reset();
    } catch (error) {
      console.error('Error reserving car:', error);
      toast.error('Failed to reserve car. Please try again!');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto px-4 py-10">
      {/* Car Info Section */}
      <div className="flex-1 px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800">
            Provider: {providerName}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full">
            {category}
          </span>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            {name} ({model})
          </h1>

          <p className="mt-6 text-lg font-bold text-gray-600">
            Price: ${pricePerDay}/day
          </p>

          <div className="mt-4 rounded-md overflow-hidden w-full h-64 md:h-80 bg-gray-100 flex items-center justify-center">
            {/* Add your car image if available */}
            <p className="text-gray-400 italic">Car image goes here</p>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <section className="flex-1 p-6 bg-white rounded-md shadow-md md:min-h-[350px] w-full">
        <h2 className="text-lg font-semibold text-gray-700 capitalize mb-4">
          Reserve This Car
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Start Date */}
            <div>
              <label className="text-gray-700">Start Date</label>
              <DatePicker
                className="border p-2 rounded-md w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-gray-700">End Date</label>
              <DatePicker
                className="border p-2 rounded-md w-full"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Comment Field */}
            <div className="sm:col-span-2">
              <label className="text-gray-700">Message (Optional)</label>
              <input
                type="text"
                name="comment"
                placeholder="Any notes or requests?"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
            >
              Reserve
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CarDetails;
