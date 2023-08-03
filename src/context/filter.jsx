import { createContext, useState } from "react";


export const FilterContext = createContext()

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        productType: 'All',
        minPrice: 0 
    })
return(
    <FilterContext.Provider value={{filters,setFilters}} >
    {children}
    </FilterContext.Provider>
)
}


















