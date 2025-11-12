import React from 'react';
import { FaCar, FaHandshake, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-sky-400 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">
          About Our Car Rental Service
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          We make car rentals simple, affordable, and accessible — ensuring you
          drive your journey with comfort and confidence.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-600 flex items-center gap-2">
            <FaCar /> Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to revolutionize car rental experiences by offering
            transparent pricing, easy booking, and top-quality vehicles for
            everyone. Whether you need a car for business, travel, or weekend
            getaways — we’ve got you covered.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-blue-600 flex items-center gap-2">
            <FaHandshake /> Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where transportation is hassle-free and
            sustainable. Our goal is to integrate eco-friendly options and
            digital convenience for modern travelers.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-600">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-2xl shadow">
              <FaCar className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wide Range of Cars</h3>
              <p>
                Choose from economy to luxury cars to match your journey and
                budget.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl shadow">
              <FaHandshake className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Transparent Service
              </h3>
              <p>No hidden charges — what you see is what you pay.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl shadow">
              <FaLeaf className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Eco-Friendly Options
              </h3>
              <p>
                We’re introducing hybrid and electric cars to support a greener
                planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="text-center py-12 bg-blue-600 text-white">
        <h2 className="text-2xl font-semibold mb-2">
          Drive with Comfort. Ride with Confidence.
        </h2>
        <p>Thank you for trusting us to be a part of your journey!</p>
      </section>
    </div>
  );
};

export default About;
