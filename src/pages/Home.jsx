import React from 'react';
import Carousel from '../components/Carousel';
import TabCategories from '../components/TabCategories';
import { useLoaderData } from 'react-router';

const Home = () => {
  const cars = useLoaderData();

  return (
    <div>
      <Carousel />
      <TabCategories cars={cars} />
    </div>
  );
};

export default Home;
