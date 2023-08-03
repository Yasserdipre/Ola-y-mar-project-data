import { Filters } from "./Filters";
import { BackButton } from "./Back_button";
import PropTypes from "prop-types";

export const Header = ({ name }) => {
   return (
      <header className="text-center">
         <div className="d-flex justify-content-start">
            <BackButton cant="-1" />
         </div>
         <h2>{name}</h2>
         <Filters />
      </header>
   );
};

Header.propTypes = {
   name: PropTypes.string, // Etiqueta debe ser una cadena (string).
};
