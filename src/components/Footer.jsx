import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa';
import logo from '../assets/carLogo.png';

const Footer = () => {
  const links = ['Home', 'About', 'Teams', 'Privacy', 'Cookies'];
  const socialIcons = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaGithub />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 shadow-inner">
      <div className="container mx-auto px-6 py-10">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Rent To Ride" className="h-14 w-auto" />
            <span className="text-xl font-bold  dark:text-white">
              Rent To Ride
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center mt-6 gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href="#"
                className=" dark: hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className=" dark: text-sm">
            © 2025 Rent To Ride. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className=" dark: hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
