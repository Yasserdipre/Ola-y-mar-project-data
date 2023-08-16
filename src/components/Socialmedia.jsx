import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "../css/FloatingButtons.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";


export const FloatingButtons = ({ onTableRender }) => {
   const whatsappLink = "https://api.whatsapp.com/send?phone=34604050471&text=Hola+tengo+una+duda%2C+espero+que+me+la+puedan+resolver";
   const instagramLink = "https://instagram.com/galicustom?igshid=MmU2YjMzNjRlOQ==";
  
   useEffect(() => {
      // Llama a la función onTableRender para indicar que los componentes en la tabla se han renderizado
      if (onTableRender) {
         onTableRender();
      }
   }, [onTableRender]);
   return (
      <div className="floating-buttons">
         <Link to={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-button">
            <FaWhatsapp className="icon" />
         </Link>
         <Link to={instagramLink} target="_blank" rel="noopener noreferrer" className="floating-button instagram">
            <FaInstagram className="icon" />
         </Link>
      </div>
   );
};


FloatingButtons.propTypes = {
   onTableRender: PropTypes.func
};
