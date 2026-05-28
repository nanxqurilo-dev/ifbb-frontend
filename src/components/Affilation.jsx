// src/components/Affilation.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Affilation = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchimage = async () => {
      try {
        const token = localStorage.getItem("user-auth-token");
        const res = await fetch("https://api.ifbb.qurilo.com/api/admin/affiliations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        setImages([...data, ...data, ...data]);
        setLoading(false);
      } catch (error) {
        console.error("FETCH ERROR ❌", error);
        setImages([]);
        setLoading(false);
      }
    };

    fetchimage();
  }, []);

  if (loading) {
    return (
      <div className='h-full w-full md:py-20 py-10 text-center'>
        <h1 className='md:text-5xl sm:text-3xl text-2xl font-bold text-center roboto mb-10'>
          Affiliation And Recognition
        </h1>
        <div className="flex items-center justify-center">
          <img className='w-52 h-52'
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="loading"
          />
        </div>
        {/* <div className="flex justify-center items-center gap-8 animate-pulse">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
          ))}
        </div> */}
      </div>
    );
  }

  return (
    <div className='h-full w-full pt-9 bg-white overflow-hidden'>
      <h1 className='md:text-5xl sm:text-4xl text-2xl font-bold text-center roboto pb-6 text-gray-800'>
        Affiliation And Recognition
      </h1>

      <style jsx>{`
        .aff-img {
          -webkit-user-drag: none;
          user-drag: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          pointer-events: none;
          image-rendering: -webkit-optimize-contrast;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .swiper {
          padding: 10px 0;
        }
      `}</style>

      {/* Padding hata diya – ab full width */}
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        freeMode={{
          enabled: true,
          momentum: false
        }}
        allowTouchMove={false}
        slidesPerView={2}
        spaceBetween={20}
        centeredSlides={false}
        grabCursor={false}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: { slidesPerView: 3, spaceBetween: 25 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
          1280: { slidesPerView: 6, spaceBetween: 50 },
          1536: { slidesPerView: 7, spaceBetween: 60 },
        }}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img._id}-${index}`} className="flex items-center justify-center">
            <div className="flex  items-center justify-center p-1">
              <img
                src={img.imageUrl}
                alt={`Affiliation ${index + 1}`}
                className="w-full   aff-img filter drop-shadow-md hover:drop-shadow-xl transition-all duration-500"
                loading="lazy"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Affilation;