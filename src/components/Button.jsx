import PropTypes from 'prop-types'

export const Button = ({name, clase, modaltoggle, modaltarget}) => {
    
    clase === undefined ? clase='btn' : clase+= ' btn' 
    return <button className={clase} data-bs-toggle={modaltoggle} data-bs-target={modaltarget}> {name}  </button>
}


Button.propTypes = {
    text: PropTypes.string
}

Button.defaultProps = {
    name: 'Botón'
}








