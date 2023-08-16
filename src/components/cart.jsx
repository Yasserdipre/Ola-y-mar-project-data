import { FaShoppingCart } from "react-icons/fa";
import "../cart.css";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { request } from "./Axios";
import { Linkname } from "../../link";

const link = Linkname()

const CartItem = ({ image, price, quantity, name, addToCart, minusToCart }) => {
   return (
      <li className="mb-4">
         <img className="img-fluid w-50" src={`${link}${image}`} alt="homero.png" />
         <div className="w-100 text-center">
            <strong>{name}</strong> - {price}€
         </div>
         <footer>
            <button className="btn btn-dark" onClick={() => minusToCart()}>
          -
            </button>
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
   addToCart: PropTypes.func.isRequired,
   minusToCart: PropTypes.func.isRequired
};

export const Cart = () => {
   const { cart, clearCart, addToCart, minusToCart } = useCart();
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



   const handleBuy = () => {
      console.log(cart)
      // Define los datos del cuerpo de la petición
      const requestData = {
         products: cart.map(item => ({
            name: item.name,
            description: item.productType[0],
            currency: "usd",
            unit_amount: item.price,
            quantity: item.quantity
         }))
      };
   
      // Realiza la petición POST utilizando la función genérica "request"
      request("post", `${link}/create-checkout-session`, requestData)
         .then(response => {
            // Maneja la respuesta
            console.log("Respuesta:", response);
            const checkoutUrl = response.url;
            window.location.href = checkoutUrl;

         })
         .catch(error => {
            // Maneja el error
            console.error("Error al hacer la solicitud:", error);
         });
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
                     <CartItem key={product.id} {...product} addToCart={() => addToCart(product)} minusToCart={() => minusToCart(product)}/>
                  ))}
               </ul>
            </div>

            <div className="offcanvas-footer d-flex justify-content-between">
               <div>
                  {showButton && (
                     <button className="btn btn-dark pe-3 ms-3 mb-2 mt-1 w-100" type="button" onClick={handleClearCart}>
                        Limpiar Carro <FaShoppingCart aria-hidden="true" />
                     </button>
                  )}
               </div>
               <div>
                  {/* Agrega el segundo botón aquí */}
                  {showButton && (
                     <button className="btn btn-primary me-5 ps-3 pe-3 mt-1 text-center" type="button" onClick={handleBuy}>
                        Comprar
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};
