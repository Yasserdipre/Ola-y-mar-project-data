import "../Footer.css"
import { useCart } from "../hooks/useCart"
import { useSave } from "../hooks/useSave"

export const Footer = () => {
   // const { filters } = useFilters()
   const {addToCart, cart} = useCart()
   const {addToSave, save} = useSave()
   return (
      <footer className='footer'>
      
         {
            JSON.stringify(save, null, 2)
         }
      </footer>
   )
}
