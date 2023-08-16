import { Itext } from "../App"
import { ISelect } from "./Select"
import { ProductData } from "./Products"
import "../filters.css"
import { useId } from "react"
import { useFilters } from "../hooks/useFilters"
import PropTypes from "prop-types";
import { useDarkMode } from "../context/darkmode"

export const Filters = () => {
   const { filters, setFilters } = useFilters();
   const minPriceFilterId = useId();
   const productTypeId = useId();
   const { isDarkMode } = useDarkMode();

   const handleChangeminPrice = (event) => {
      setFilters((prevState) => ({
         ...prevState,
         minPrice: event.target.value,
      }));
   };

   const handleCategory = (event) => {
      setFilters((prevState) => ({
         ...prevState,
         productType: event.target.value,
      }));
   };

   const options = ["All", ...Array.from(new Set(ProductData.map((product) => product.productType)))];
   
   return (
      <section className={`filters container ${isDarkMode ? "dark-mode" : ""}`}>
         <div className={`text-center ms-4 ${isDarkMode ? "dark-mode" : ""}`}>
            <Itext htmlFor={minPriceFilterId} value={filters.minPrice} clase="form-range" clase2="d-block" clase3="ms-5" type="range" min="0" max="1000" onChange={handleChangeminPrice} label="Price" id={minPriceFilterId} />
            <span className="mt-3 pt-1 ms-2">{filters.minPrice}€</span>
         </div>
         <div className={`text-center me-4 ${isDarkMode ? "dark-mode" : ""}`}>
            <ISelect htmlFor={productTypeId} onChange={handleCategory} clase="form-select" label="Categoría" id={productTypeId} opcion={options} />
         </div>
      </section>
   );
};

Filters.propTypes = {
   isDarkMode: PropTypes.bool
};