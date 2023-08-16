import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { BackButton } from "./Back_button";
import PropTypes from "prop-types";
import { request } from "./Axios";
import { Linkname } from "../../link";

const link = Linkname()

export const Details = () => {
   const [products, setProducts] = useState([]);
   const { product } = useParams();
   const { addToCart, cart, removeFromCart } = useCart();
   useEffect(() => {
      request("get", "/products")
         .then(response => {
            setProducts(response);
         })
         .catch(error => {
            console.error("Error al hacer la solicitud:", error);
         });
   }, []);

   const selectedProduct = products.find((p) => p.name.replace(/\s+/g, "") === product);

   const isProductInCart = cart.some(item => item.id === selectedProduct?.id);

   const handleAddToCart = () => {
      if (isProductInCart) {
         removeFromCart(selectedProduct);
      } else {
         addToCart(selectedProduct);
      }
   };

   useEffect(() => {
      // El segundo efecto se ejecuta cuando selectedProduct se actualiza
      if (selectedProduct) {
         console.log("Otra lógica con selectedProduct:", selectedProduct);
         // Realiza cualquier otra lógica que dependa de selectedProduct aquí
      }
   }, [selectedProduct]);

   return (
      <>
         {/* Renderizar el componente Dashboard con los datos del producto */}
         {selectedProduct && (
            <Dashboard
               productImage={selectedProduct.image}
               newname={selectedProduct.name}
               price={selectedProduct.price}
               isProductInCart={isProductInCart}
               handleAddToCart={handleAddToCart}
            />
         )}
      </>
   );
};

Details.propTypes = {
   products: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
      // Aquí agrega más propiedades si es necesario
      })
   ).isRequired,
};


const Dashboard = ({ productImage, price, newname, isProductInCart, handleAddToCart }) => {
   const [t] = useTranslation();
   const name = newname.replace(/\s+/g, "");

   return (
      <>
         <BackButton cant="-2"/>
         <div className="container mt-x">
            <div className="row justify-content-center">
               <div className="col-4 img-lg">
                  <div className="img-fluid">
                     {productImage && <img src={`${link}${productImage}`} alt="" className="w-100" />}
                  </div>
               </div>
               <div className="col-4">
                  <div className="product-details">
                     <h2 className="product-name">{t(`man_data.electronic.${name}.name`)}</h2>
                     <h4 className="product-type">{t(`man_data.electronic.${name}.type`)}</h4>
                     <h3 className="product-price">{price}€</h3>
                  </div>
                  <TallaSelector />
                  <div className="product-actions mt-3">
                     <div className="d-inline">
                        <button className="btn btn-dark d-block mt-1" onClick={handleAddToCart}>
                           {isProductInCart ? t("man_data.btn-cart.text3") : t("man_data.btn-cart.text1")}
                        </button>
                        <button className="btn btn-light d-block mt-2">{t("man_data.btn-cart.text2")}</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

Dashboard.propTypes = {
   productImage: PropTypes.string, // productImage debe ser una cadena (string).
   price: PropTypes.number,
   newname: PropTypes.string, // name debe ser una cadena (string).
   isProductInCart: PropTypes.bool, // isProductInCart debe ser un booleano (true/false).
   handleAddToCart: PropTypes.func, // handleAddToCart debe ser una función (func).
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
