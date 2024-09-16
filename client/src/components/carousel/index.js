import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length,
    );
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer"
        onClick={prevSlide}
      >
        <IoIosArrowBack className="text-white text-4xl" />
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
        onClick={nextSlide}
      >
        <IoIosArrowForward className="text-white text-4xl" />
      </div>
      <div className="overflow-hidden h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div className="w-full flex-shrink-0">{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
