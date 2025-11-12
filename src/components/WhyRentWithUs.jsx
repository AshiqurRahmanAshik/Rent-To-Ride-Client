import React from 'react';
import {
  FaCarSide,
  FaShieldAlt,
  FaHeadset,
  FaMoneyBillWave,
} from 'react-icons/fa';

const features = [
  {
    id: 1,
    icon: <FaCarSide className="text-4xl text-blue-600 mb-4" />,
    title: 'Wide Range of Vehicles',
    description:
      'Choose from economy to luxury cars — perfectly suited for business trips, family vacations, or weekend adventures.',
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-4xl text-blue-600 mb-4" />,
    title: 'Safe & Reliable',
    description:
      'Every car is regularly inspected and maintained to ensure safety, comfort, and reliability on every journey.',
  },
  {
    id: 3,
    icon: <FaMoneyBillWave className="text-4xl text-blue-600 mb-4" />,
    title: 'Affordable Pricing',
    description:
      'We offer transparent pricing with no hidden charges — rent confidently with flexible daily or weekly plans.',
  },
  {
    id: 4,
    icon: <FaHeadset className="text-4xl text-blue-600 mb-4" />,
    title: '24/7 Customer Support',
    description:
      'Our friendly support team is available around the clock to assist you with any questions or travel needs.',
  },
];

const WhyRentWithUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          Why Rent With Us
        </h2>
        <p className=" max-w-2xl mx-auto mb-12">
          At <strong>Rent To Ride</strong>, we don’t just provide cars — we
          provide peace of mind. Here’s what makes us your best choice for car
          rentals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-8"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className=" text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRentWithUs;
