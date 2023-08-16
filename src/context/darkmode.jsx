import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState(false);
 
   const toggleDarkMode = () => {
      setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
   };
 
   return (
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
         {children}
      </DarkModeContext.Provider>
   );
};
 

export const useDarkMode = () => {
   return useContext(DarkModeContext);
};

DarkModeProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ]).isRequired
};
