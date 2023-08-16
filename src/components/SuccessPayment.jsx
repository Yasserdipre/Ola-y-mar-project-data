import "../css/success.css"
import { FloatingButtons } from "./Socialmedia";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "../hooks/useCart";
import {  useState, useEffect } from "react";

export const SuccessPage = () => {
   const { cart, clearCart } = useCart();
   const [cartData, setCartData] = useState(cart);
   const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
   useEffect(() => {
      if (cart.length > 0) {
         // Mantén una copia de los datos del carrito antes de borrarlo
         setCartData([...cart]);
 
         const timer = setTimeout(() => {
            clearCart();
         }, 3000);
 
         return () => clearTimeout(timer);
      }
   }, [cart, clearCart]);
 
   return (
      <>
         <div className="container">
            <div className="success-page w-75">
               <div className="w-100 text-center">
                  <FaCheckCircle className="success-icon" />
               </div>
               <h2>¡Compra Exitosa!</h2>
               <p>¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.</p>
               <p>Recibirás un correo electrónico de confirmación con los detalles de tu compra.</p>
               <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
            </div>
         </div>
           
         <div className="container mt-4">
            <div className="w-100 text-center mb-4"><h3 className="mt-5">Detalles de la Compra</h3></div>
            <table className="table table-striped-columns mt-3">
               <thead>
                  <tr>
                     <th>Producto</th>
                     <th>Descripción</th>
                     <th>Cantidad</th>
                     <th>Precio unitario</th>
                     <th>Total</th>
                  </tr>
               </thead>
               <tbody>
                  {cartData.map(item => (
                     <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.productType[0]}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${(Math.round(item.price * item.quantity)).toFixed(2)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <div className="d-flex justify-content-end mt-3">
               <strong>Total: ${total.toFixed(2)}</strong>
            </div>
         </div>
  
         <FloatingButtons />
      </>
   );
};



















