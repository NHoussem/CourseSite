import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  console.log(length);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider '>
      <FaArrowAltCircleLeft className={`left-arrow  ${length!==1 ? "left-arrow":"hidden"}`} onClick={prevSlide} />
      <FaArrowAltCircleRight className={`right-arrow  ${length!==1 ? "right-arrow":"hidden"}`} onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            key={index} 
          >
            {index === current && (
              <div className="overflow-hidden h-96">
                <img src={'http://127.0.0.1:8000' + slide.image} alt='travel image' className='object-contain w-full' />
              </div>
              
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Slider;