import React from 'react';

const successStories = [
  {
    customer: 'John Doe',
    location: 'New York',
    car: 'BMW X5',
    story:
      'I rented a BMW X5 for my business trip, and the experience was seamless. The car was spotless and delivered on time!',
  },
  {
    customer: 'Emily Davis',
    location: 'Los Angeles',
    car: 'Toyota Camry',
    story:
      'Great service! The Toyota Camry was very comfortable and fuel-efficient. Highly recommend this rental service.',
  },
  {
    customer: 'Michael Brown',
    location: 'Chicago',
    car: 'Audi A6',
    story:
      'The booking process was smooth, and the Audi A6 made my weekend trip unforgettable. Will rent again!',
  },
  {
    customer: 'Sophia Wilson',
    location: 'San Francisco',
    car: 'Mercedes GLE',
    story:
      'Excellent experience! The car was in perfect condition, and customer support was very helpful.',
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center">
          Customer Success Stories
        </h1>
        <p className=" mt-4 text-center max-w-2xl mx-auto">
          See how our clients enjoy their trips and get the best experience with
          our cars.
        </p>

        {/* Stories Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className=" p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold">
                {story.customer}
              </h2>
              <p className=" text-sm mt-1">{story.location}</p>
              <p className="mt-3 ">{story.story}</p>
              <p className="mt-3  font-medium">Car Rented: {story.car}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
