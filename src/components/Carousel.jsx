import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Slide from './Slide';

import bgimg2 from '../assets/car1.png';
import bgimg1 from '../assets/car2.png';
import bgimg3 from '../assets/car3.png';

export default function Carousel() {
  return (
    <div className="container px-6 py-10 mx-auto ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={bgimg1} text="Your Journey, Our Cars" />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgimg2} text="Affordable Luxury, Anytime, Anywhere" />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bgimg3} text="Ride With Comfort" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
