import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const testimonials = [
  { name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  {
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Mike Johnson',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Emily Davis',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Robert Brown',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    name: 'Sophia Wilson',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'James Lee',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Olivia Martinez',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
  },
];

export default function TrustedTestimonials() {
  return (
    <div className=" py-20 px-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Images Grid */}
        <div className="flex flex-wrap justify-center -space-x-4 sm:-space-x-6 -space-y-8 sm:-space-y-10 z-10 relative">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{
                y: [0, index % 2 === 0 ? -15 : 15, 0], // floating
                scale: [1, 1.03, 1], // slight scaling
                rotate: [0, index % 2 === 0 ? 2 : -3, 0], // slight rotation
                opacity: [0, 1, 0], // fade in & fade out
              }}
              transition={{
                y: {
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                },
                scale: {
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                },
                rotate: {
                  duration: 6 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                },
                opacity: {
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                },
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Text Block */}
        <div className="mt-16 sm:mt-20 text-center max-w-2xl mx-auto px-4">
          <span className="text-sm  uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
            Trusted by industry leaders worldwide
          </h2>
          <p className=" mt-4 text-base sm:text-lg md:text-lg">
            Professionals choose our solutions to streamline their customer
            journeys and grow their businesses.
          </p>
          <Link to="/success-stories">
            <button className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300">
              Read Success Stories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
