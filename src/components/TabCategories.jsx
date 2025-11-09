import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CarCard from './CarCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TabCategories = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
      setCars(data);
    };
    getData();
  }, []);

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Cars By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Explore different types of rental cars available for your trip. Click
          on the tabs below to browse cars by categories.
        </p>

        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Featured Cars</Tab>
            <Tab>Top Rated Cars</Tab>
            <Tab>All Cars</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
            {cars
              .filter((c) => c.category === 'Featured Cars')
              .map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {cars
              .filter((c) => c.category === 'Top Rated Cars')
              .map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
