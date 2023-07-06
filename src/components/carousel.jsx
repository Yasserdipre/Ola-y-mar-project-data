import React from 'react';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import CarouselIndicators from "./Carouselcantitems";

export const Carousel = ({ children }) => {
  const itemCount = React.Children.count(children);
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5500"
    >
      <CarouselIndicators itemCount={itemCount} />
      <div className="carousel-inner">
        {children}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        
      </button>
    </div>
  );
};

export const CarouselItem = ({ clases, src, title_princ, text, data, clase_text_titular }) => {
  const [t, i18n] = useTranslation();
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className={clases}>
      <div className="w-100 dt bg-dark text-white">
        <div
          className={`carousel-image-container ${isZoomed ? 'zoomed' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={src} className="img-fluid" alt="" />
        </div>
      </div>
      <div className="carousel-caption d-none d-md-block">
        <h1 className={clase_text_titular}>{title_princ}</h1>
        <div className="inline-block mt-5">
        <button type="button" className="btn btn-dark me-2 padding-y">{t("navbar.service")}</button>
        <button type="button" className="btn btn-primary ms-2 padding-y">{t("navbar.contact")}</button>
        </div>
      </div>
    </div>
  );
};
