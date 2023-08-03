import { useContext } from "react"
import { FilterContext } from "../context/filter"

export const useFilters = () =>{
    const {filters, setFilters} = useContext(FilterContext)
    const filterProducts = (products) =>{
      return products.filter(productdeslg =>{
        return(
          productdeslg.price >= filters.minPrice && (
            filters.productType === 'All' || productdeslg.productType === filters.productType
          )
        )
      })
    }
  
    return {filterProducts, setFilters, filters}
  }