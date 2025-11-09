import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Root;
