import {
   FaShoppingCart,
   FaRegBookmark,
   FaStar,
   FaFireAlt,
   FaTimes
} from "react-icons/fa";
import { BsFillCartXFill } from "react-icons/bs";
import "../Cards.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useSave } from "../hooks/useSave";
import PropTypes from "prop-types";
import { Linkname } from "../../link";
const link = Linkname()

export const CardProducts = ({ products }) => {
   const { addToCart, cart, removeFromCart } = useCart();
   const { addToSave, save, removeFromSave } = useSave();
   const checkProductInCart = (product) => cart.some((item) => item.id === product.id);
   const checkProductInSave = (product) => save.some((item) => item.id === product.id);

   // Ajustar la cantidad de cards a mostrar dependiendo del ancho de la pantalla
   const cardCols = {
      xxl:3,
      xl:4,
      lg: 4, // Muestra 4 cards por línea en pantallas grandes
      md: 6, // Muestra 3 cards por línea en pantallas medianas
      sm: 12, // Muestra 2 cards por línea en pantallas pequeñas
   };

   return (
      <div className="container-fluid mt-5">
         <div className="row">
            {products.slice(0, 10).map((product) => {
               const isProductInCart = checkProductInCart(product);
               const isProductInSave = checkProductInSave(product);
               return (
                  <div key={product.id} className={`col-lg-${cardCols.lg} col-xxl-${cardCols.xxl} col-xl-${cardCols.xl} col-md-${cardCols.md} col-sm-${cardCols.sm} mb-4`}>
                     <ProductCard
                        product={product}
                        isProductInCart={isProductInCart}
                        isProductInSave={isProductInSave}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        addToSave={addToSave}
                        removeFromSave={removeFromSave}
                     />
                  </div>
               );
            })}
         </div>
      </div>
   );
};

CardProducts.propTypes = {
   products: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
      // Agrega más propiedades si es necesario
      })
   ).isRequired,
};

export const ProductCard = ({
   product,
   isProductInCart,
   addToCart,
   removeFromCart,
   clase,
   addToSave,
   isProductInSave,
   removeFromSave
}) => {
   const [t] = useTranslation();
   const navigate = useNavigate();

   return (
      <div className={`productList ${clase}`}>
         <div key={product.id} className="productCard">
            <Link
               to="#"
               style={{ cursor: "default" }}
               className="productCard__cart"
            >
               <button
                  className=""
                  onClick={() =>
                     isProductInCart ? removeFromCart(product) : addToCart(product)
                  }
                  style={{
                     border: "none",
                     background: "none",
                     padding: 0,
                     outline: "none",
                     cursor: "pointer",
                     pointerEvents: "auto",
                  }}
               >
                  {isProductInCart ? <BsFillCartXFill /> : <FaShoppingCart />}
               </button>
            </Link>
            <button
               onClick={() => isProductInSave ? removeFromSave(product) :  addToSave(product)}
               className="productCard__wishlist"
               style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  outline: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
               }}
            >
               {isProductInSave ?  <FaTimes /> : <FaRegBookmark />  }
            </button>
            <Link to="/popular" className="productCard__fastSelling">
               <FaFireAlt />
            </Link>
            <Link
               to={`/hombres/${product.name.replace(/\s+/g, "")}`}
               className="link"
               onClick={() =>
                  navigate(`/hombres/${product.name.replace(/\s+/g, "")}`, {
                     state: product,
                  })
               }
            >
               <img src={`${link}${product.image}`} alt="product-img" className="w-100" />
               <div className="productCard__content">
                  <h3 className="productName text-center">
                     {t(
                        `man_data.electronic.${product.name.replace(/\s+/g, "")}.name`
                     )}
                  </h3>
                  <div className="displayStack__1">
                     <div className="productPrice">
                        {product.price}
                €
                     </div>
                     <div className="productSales">
                        {product.totalSales} {t("man_data.units.units-sold")}
                     </div>
                  </div>
                  <div className="displayStack__2">
                     <div className="productRating">
                        {[...Array(product.rating)].map((index) => (
                           <FaStar id={index + 1} key={index} />
                        ))}
                     </div>
                     <div className="productTime">
                        {product.timeLeft} {t("man_data.units.days")}
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </div>
   );
};

ProductCard.propTypes = {
   product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      totalSales: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      timeLeft: PropTypes.number.isRequired,
      // Agrega más propiedades si es necesario
   }).isRequired,
   isProductInCart: PropTypes.bool.isRequired,
   addToCart: PropTypes.func.isRequired,
   removeFromCart: PropTypes.func.isRequired,
   clase: PropTypes.string, // clase debe ser una cadena (string).
   addToSave: PropTypes.func.isRequired,
   isProductInSave: PropTypes.bool.isRequired,
   removeFromSave: PropTypes.func.isRequired,
};




