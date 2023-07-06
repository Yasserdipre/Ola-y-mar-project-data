import React from 'react';

const CarouselIndicators = ({ itemCount }) => {
  const indicators = [];

  for (let i = 0; i < itemCount; i++) {
    const isActive = i === 0; // Determina si el indicador actual es el activo
    const indicator = (
      <button
        key={i}
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={i}
        className={isActive ? "active" : ""}
        aria-current={isActive}
        aria-label={`Slide ${i + 1}`}
      ></button>
    );

    indicators.push(indicator);
  }

  return (
    <div className="carousel-indicators d-none">
      {indicators}
    </div>
  );
};

export default CarouselIndicators;
