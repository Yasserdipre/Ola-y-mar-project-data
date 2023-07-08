import { Route, Routes, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import images from "./import_images";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "./Button";

export const Details = () => {
  const { product } = useParams();
  const productImage = images[product];
  return (
    <>
      <Dashboard productImage={productImage} name={product} />
    </>
  );
};

const Dashboard = ({ productImage, name }) => {
  const [t, i18n] = useTranslation();
  const history = useNavigate()

  return (
    <>
    <div className="ms-3 mt-3"><Button clase="btn btn-dark" name={t(`man_data.btn-back.text`)} onClick={()=> history(-1)}/></div>
      <div className="container mt-x">
        <div className="row justify-content-center">
          <div className="col-4 img-lg">
            <div className="img-fluid">
              {productImage && (
                <img src={productImage} alt="" className="w-100" />
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="product-details">
              <h2 className="product-name">
                {t(`man_data.electronic.${name}.name`)}
              </h2>
              <h4 className="product-type">
                {t(`man_data.electronic.${name}.type`)}
              </h4>
              <h3 className="product-price">
                {t(`man_data.electronic.${name}.price`)}€
              </h3>
            </div>
            <TallaSelector/>
            <div className="product-actions mt-3">
              <div className="d-inline">
                <button className="btn btn-dark d-block mt-1">
                  {t(`man_data.btn-cart.text1`)}
                </button>
                <button className="btn btn-light d-block mt-2">
                  {t(`man_data.btn-cart.text2`)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const TallaSelector = () => {
    const [selectedTalla, setSelectedTalla] = useState(null);
  
    const tallas = ["S", "M", "L", "XL"];
  
    const handleTallaSelect = (talla) => {
      setSelectedTalla(talla);
    };
  
    return (
      <div className="talla-selector mt-3">
        <h3>Selecciona tu talla</h3>
        <div className="talla-options mt-4">
          {tallas.map((talla) => (
            <div
              key={talla}
              className={`talla-option ${selectedTalla === talla ? "selected" : ""}`}
              onClick={() => handleTallaSelect(talla)}
            >
              {talla}
            </div>
          ))}
        </div>
        {selectedTalla && <p>Talla seleccionada: {selectedTalla}</p>}
      </div>
    );
  };
