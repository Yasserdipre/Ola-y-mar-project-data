import { createContext } from "react";
import { useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart.jsx"
import PropTypes from "prop-types";


export const CartContext = createContext()

function useCartReducer () {
   const [state, dispatch] = useReducer(cartReducer, cartInitialState)

   const addToCart = product => dispatch({
      type: "ADD_TO_CART",
      payload: product
   })

   const removeFromCart = product => dispatch({
      type: "REMOVE_FROM_CART",
      payload: product
   })

   const minusToCart = product => dispatch({
      type: "MINUS_FROM_CART", 
      payload: product
   })

   const clearCart = () => dispatch({ type: "CLEAR_CART" })

   return { state, addToCart, removeFromCart, clearCart, minusToCart }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider ({ children }) {
   const { state, addToCart, removeFromCart, clearCart, minusToCart } = useCartReducer()

   return (
      <CartContext.Provider value={{
         cart: state,
         addToCart,
         removeFromCart,
         clearCart,
         minusToCart
      }}
      >
         {children}
      </CartContext.Provider>
   )
}


CartProvider.propTypes = {
   children: PropTypes.node.isRequired // Reemplaza "node" con el tipo correcto si es necesario
};