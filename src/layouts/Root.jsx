import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from './../components/Footer';

const Root = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className="min-h-[calc(100vh-320px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
