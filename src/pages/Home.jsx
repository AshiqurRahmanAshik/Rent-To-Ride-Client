import React from 'react';
import Carousel from '../components/Carousel';
import TabCategories from '../components/TabCategories';
import TestimonialSwiper from '../components/TestimonialSwiper';
import CarRentFAQ from '../components/CarRentFAQ';

const Home = () => {
  return (
    <div>
      <Carousel />
      <TabCategories />
      <TestimonialSwiper />
      <CarRentFAQ />
    </div>
  );
};

export default Home;
