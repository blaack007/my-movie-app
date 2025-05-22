import React, { useState, useEffect, useRef } from 'react';
import ItemCard from './ItemCard'; 
import '../styles/components/Slider.css';

export default function ShowsSlider({ shows, title, mediaType = 'tv' }) {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const sliderRef = useRef(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      setShowLeftButton(container.scrollLeft > 10);
      const atEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10;
      setShowRightButton(!atEnd && shows && shows.length > 0);
    }
  };

  useEffect(() => {
    handleScroll();
    const currentSliderRef = sliderRef.current;
    if (currentSliderRef) {
      currentSliderRef.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);
    return () => {
      if (currentSliderRef) {
        currentSliderRef.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [shows]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = direction === 'left' ? -container.clientWidth * 0.8 : container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!shows || shows.length === 0) {
    return (
      <div className="app-slider-section">
        <p>No items to display in this section.</p>
      </div>
    );
  }

  return (
    <div className="app-slider-section">
      {showLeftButton && (
        <button 
          className="app-slider__nav-button left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ←
        </button>
      )}
      
      {showRightButton && (
        <button 
          className="app-slider__nav-button right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          →
        </button>
      )}

      <div 
        ref={sliderRef}
        className="app-slider"
      >
        {shows.map((item) => (
          <div key={item.id} className="app-slider__item-wrapper">
            <ItemCard item={item} mediaType={mediaType} />
          </div>
        ))}
      </div>
    </div>
  );
} 