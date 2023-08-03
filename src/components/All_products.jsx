import "../products.css"
import { CardProducts } from "./Cards"
import PropTypes from "prop-types";

export const Products_total = ({product_filter}) =>{



   return(
      <CardProducts
         products={product_filter}/>

   )
}



Products_total.propTypes = {
   product_filter: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
      // Agrega más propiedades si es necesario
      })
   ).isRequired,
};