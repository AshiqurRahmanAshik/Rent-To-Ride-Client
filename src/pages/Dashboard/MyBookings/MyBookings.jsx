import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    bookingId: null,
  });

  const API_URL = "http://localhost:9000"; // Update with your API URL

  useEffect(() => {
    fetchMyBookings();
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/my-bookings?email=${user.email}`
      );
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}/bookings/${bookingId}`);
      setBookings(bookings.filter((b) => b._id !== bookingId));
      setDeleteModal({ show: false, bookingId: null });
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Bookings 📅</h1>
          <p className="text-gray-600 mt-1">Manage your car rental bookings</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Car Image */}
              <img
                src={booking.image}
                alt={booking.carName}
                className="w-full h-48 object-cover"
              />

              {/* Booking Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {booking.carName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {booking.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rent Price:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${booking.rentPrice}
                    </span>
                  </div>

                  {booking.startDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Start Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {booking.endDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">End Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Booked On:</span>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    setDeleteModal({ show: true, bookingId: booking._id })
                  }
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't made any car bookings yet. Start exploring our
            collection!
          </p>
          <a
            href="/cars"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Browse Cars
          </a>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cancel Booking?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, bookingId: null })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={() => handleCancelBooking(deleteModal.bookingId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
