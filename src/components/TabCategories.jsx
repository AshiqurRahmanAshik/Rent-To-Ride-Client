// TabCategories.jsx
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CarCard from './CarCard';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';

const TabCategories = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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

  const handleViewDetails = (id) => {
    navigate(`/car/${id}`);
  };

  // ✅ Filtered cars based on search input
  const filteredCars = useMemo(() => {
    return cars.filter(
      (car) =>
        car.name?.toLowerCase().includes(search.toLowerCase()) ||
        car.model?.toLowerCase().includes(search.toLowerCase()) ||
        car.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [cars, search]);

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">
          Browse Cars By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center">
          Explore different types of rental cars available for your trip. Use
          the search bar or click on the tabs below.
        </p>

        {/* Search Input */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            placeholder="Search cars by name, model, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ✅ Display number of matches */}
          <p className="mt-2 text-sm text-gray-600">
            {search
              ? filteredCars.length > 0
                ? `🔍 ${filteredCars.length} car${
                    filteredCars.length > 1 ? 's' : ''
                  } found`
                : '❌ No cars found'
              : `Total Cars: ${cars.length}`}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <TabList>
            <Tab>All Cars</Tab>
            <Tab>Top Rated Cars</Tab>
            <Tab>Featured Cars</Tab>
          </TabList>
        </div>

        {/* All Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onViewDetails={() => handleViewDetails(car._id)}
              />
            ))}
          </div>
        </TabPanel>

        {/* Featured Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars
              .filter((c) => c.type?.toLowerCase() === 'featured')
              .map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  onViewDetails={() => handleViewDetails(car._id)}
                />
              ))}
          </div>
        </TabPanel>

        {/* Top Rated Cars */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars
              .filter((c) => c.type?.toLowerCase() === 'top rated')
              .map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  onViewDetails={() => handleViewDetails(car._id)}
                />
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
