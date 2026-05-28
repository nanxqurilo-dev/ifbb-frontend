import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TrainerImg1 from "../assets/TrainerImg1.jpg";
import TrainerImg2 from "../assets/TrainerImg2.jpg";
import TrainerImg3 from "../assets/TrainerImg3.jpg";
import TrainerImg4 from "../assets/TrainerImg4.jpg";

const slides = [
  {
    image: TrainerImg1,
    title: "Dr. Rafael Santonja",
    description: "Sport Nutrition - Spain",
  },
  {
    image: TrainerImg2,
    title: "Dr. Nieves Lopes Cillanueva",
    description: "Sport Nutrition – Spain",
  },
  {
    image: TrainerImg3,
    title: "Prof. Dr. Mauricio de ArrudaCampos",
    description: "Sports Kinesiology and Biomechanics - Brazil",
  },
  {
    image: TrainerImg4,
    title: "Prof. Dr. Adolfo Morán",
    description: "Medical Doctor (Cardiology) – Spain",
  },



];

const Trainers = () => {
  const [current, setCurrent] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);


  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsToShow(4);
      else if (width >= 640) setItemsToShow(2);
      else setItemsToShow(1);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const total = slides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + itemsToShow) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - itemsToShow + total) % total);
  };

  let visibleSlides = slides.slice(current, current + itemsToShow);
  if (visibleSlides.length < itemsToShow) {
    visibleSlides = [
      ...visibleSlides,
      ...slides.slice(0, itemsToShow - visibleSlides.length),
    ];
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {visibleSlides.map((slide, idx) => (
          <div
            key={idx}
            className="relative w-full sm:w-[48%] lg:w-[23%] h-[500px] transition-all duration-300"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover  "
            />
            <div className="absolute bottom-0 left-0 bg-black/60 text-white px-3 py-2  w-full text-sm">
              <h1 className="font-bold">{slide.title}</h1>
              <p className="text-xs">— {slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-0 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-0 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Trainers;
