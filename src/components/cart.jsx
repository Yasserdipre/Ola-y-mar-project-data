import { FaShoppingCart } from "react-icons/fa";
import "../cart.css";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartItem = ({ image, price, quantity, name, addToCart }) => {
   return (
      <li className="mb-4">
         <img className="img-fluid w-50" src={image} alt="homero.png" />
         <div className="w-100 text-center">
            <strong>{name}</strong> - {price}€
         </div>
         <footer>
            <small>Qty: {quantity}</small>
            <button className="btn btn-dark" onClick={() => addToCart()}>
          +
            </button>
         </footer>
      </li>
   );
};

CartItem.propTypes = {
   image: PropTypes.string.isRequired, // image debe ser una cadena (string) y es obligatorio.
   price: PropTypes.number.isRequired, // price debe ser un número (number) y es obligatorio.
   quantity: PropTypes.number.isRequired, // quantity debe ser un número (number) y es obligatorio.
   name: PropTypes.string.isRequired, // name debe ser una cadena (string) y es obligatorio.
   addToCart: PropTypes.func.isRequired, // addToCart debe ser una función (func) y es obligatorio.
};

export const Cart = () => {
   const { cart, clearCart, addToCart } = useCart();
   const cartInitialState = JSON.parse(window.localStorage.getItem("cart")) || [];
   const [showButton, setShowButton] = useState(cart.length !== 0 && cart !== cartInitialState);

   useEffect(() => {
      if (cart.length !== 0 && cart !== cartInitialState) {
         setShowButton(true);
      } else {
         setShowButton(false);
      }
   }, [cart, cartInitialState]);

   const handleClearCart = () => {
      clearCart();
      setShowButton(false);
   };

   return (
      <>
         <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header text-center my-offcanvas-header">
               <h5 className="offcanvas-title w-100">Products Cart</h5>
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body cart">
               <ul className="text-center">
                  {cart.map((product) => (
                     <CartItem key={product.id} {...product} addToCart={() => addToCart(product)} />
                  ))}
               </ul>
               <div className="w-100 d-flex justify-content-center mt-2">
                  {showButton && (
                     <button className="btn btn-dark" type="button" onClick={handleClearCart}>
                        <FaShoppingCart aria-hidden="true" />
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};