import React from 'react';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Carter',
    role: 'Founder & CEO',
    image: 'https://i.ibb.co.com/zWtmXJGJ/photo-1530268729831-4b0b9e170218.png',
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 2,
    name: 'Sophia Lee',
    role: 'Head of Operations',
    image: 'https://i.ibb.co.com/WWYSwndv/photo-1507003211169-0a1dd7228f2d.png',
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 3,
    name: 'Daniel Smith',
    role: 'Fleet Manager',
    image: 'https://i.ibb.co.com/chNKyWT4/photo-1500648767791-00dcc994a43e.png',
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'Marketing Specialist',
    image: 'https://i.ibb.co.com/RRw2Zqw/images.png',
    linkedin: '#',
    facebook: '#',
    instagram: '#',
  },
];

const Team = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Our dedicated professionals work tirelessly to make your car rental
          experience smooth, reliable, and enjoyable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className=" rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-500 text-sm mb-4">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
