import PropTypes from "prop-types"

export const Button = ({name, clase, modaltoggle, modaltarget, onClick}) => {
    
   clase === undefined ? clase="btn" : clase+= " btn" 
   return <button className={clase} onClick={onClick} data-bs-toggle={modaltoggle} data-bs-target={modaltarget}> {name}  </button>
}

Button.propTypes = {
   name: PropTypes.string.isRequired, // name debe ser una cadena (string) y es obligatorio.
   clase: PropTypes.string, // clase debe ser una cadena (string).
   modaltoggle: PropTypes.string, // modaltoggle debe ser una cadena (string).
   modaltarget: PropTypes.string, // modaltarget debe ser una cadena (string).
   onClick: PropTypes.func, // onClick debe ser una función (func).
};

Button.propTypes = {
   text: PropTypes.string
}

Button.defaultProps = {
   name: "Botón"
}








