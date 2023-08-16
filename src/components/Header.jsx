import { Filters } from "./Filters";
import { BackButton } from "./Back_button";
import PropTypes from "prop-types";
import { useDarkMode } from "../context/darkmode";

export const Header = ({ name, filter}) => {
   const { isDarkMode } = useDarkMode();
   return (
      <header className={`text-center ${isDarkMode ? "dark-mode" : ""}`}>
         <div className="d-flex justify-content-start">
            <BackButton cant="-1" />
         </div>
         <h2>{name}</h2>
         {filter !== false && <Filters isDarkMode={isDarkMode}/>}
      </header>
   );
};




Header.propTypes = {
   name: PropTypes.string,
   filter: PropTypes.bool,
   isDarkMode: PropTypes.bool
};
