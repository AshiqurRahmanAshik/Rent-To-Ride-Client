// TabCategories.jsx
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CarCard from './CarCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const TabCategories = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars`
        );
        console.log('Fetched cars:', data);
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    getData();
  }, []);

  // ✅ Fix for View Details
  const handleViewDetails = (id) => {
    navigate(`/car/${id}`);
  };

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center  capitalize lg:text-3xl">
          Browse Cars By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center">
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

        {/* Featured Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {cars
              .filter((c) => c.type?.toLowerCase() === 'featured')
              .map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  onViewDetails={() => handleViewDetails(car._id)} // ✅ fixed
                />
              ))}
          </div>
        </TabPanel>

        {/* Top Rated Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {cars
              .filter((c) => c.type?.toLowerCase() === 'top rated')
              .map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  onViewDetails={() => handleViewDetails(car._id)} // ✅ fixed
                />
              ))}
          </div>
        </TabPanel>

        {/* All Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onViewDetails={() => handleViewDetails(car._id)} // ✅ fixed
              />
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
