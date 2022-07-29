import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

interface Props {
  images: any[];
}

const SwiperSlider = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <>
      <Swiper
        loop={true as boolean}
        spaceBetween={10}
        navigation={true as boolean}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mainSwiper"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <img
              src={`${import.meta.env.VITE_API_URL}${image.replace('src', '')}`}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        loop={true as boolean}
        freeMode={true as boolean}
        slidesPerView={images.length}
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbSniper"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <img
              src={`${import.meta.env.VITE_API_URL}${image.replace('src', '')}`}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
