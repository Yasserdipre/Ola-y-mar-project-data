import { useContext } from "react"
import { FilterContext } from "../context/filter"

export const useFilters = () => {
   const { filters, setFilters } = useContext(FilterContext);

   const filterProducts = (products) => {
      return products.filter((product) => {
         const meetsMinPrice = product.price >= filters.minPrice;

         if (filters.productType === "All") {
            return meetsMinPrice;
         } else {
            const productTypes = Array.isArray(filters.productType)
               ? filters.productType
               : [filters.productType];
            
            return (
               meetsMinPrice &&
               productTypes.some((type) =>
                  product.productType.includes(type)
               )
            );
         }
      });
   };

   return { filterProducts, setFilters, filters };
};