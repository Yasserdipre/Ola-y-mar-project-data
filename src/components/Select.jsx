import PropTypes from "prop-types";

export const ISelect =({label, opcion, clase,clasediv, onChange, id, htmlFor}) =>{
   return(
      <div className={clasediv}>
         <label htmlFor={htmlFor}>{label}</label>
         <select className={clase} onChange={onChange}><Option opc = {opcion} id={id}/></select>
      </div>
   );

}

ISelect.propTypes = {
   label: PropTypes.string.isRequired, // label debe ser una cadena (string) y es obligatorio.
   opcion: PropTypes.array.isRequired, // opcion debe ser un array (array) y es obligatorio.
   clase: PropTypes.string, // clase debe ser una cadena (string).
   clasediv: PropTypes.string, // clasediv debe ser una cadena (string).
   onChange: PropTypes.func, // onChange debe ser una función (func).
   id: PropTypes.string, // id debe ser una cadena (string).
   htmlFor: PropTypes.string, // htmlFor debe ser una cadena (string).
};

const Option = ({opc}) => {
   let data =[];
   for (let i= 0; i< opc.length ; i++) {
        
      data.push(<option  value={opc[i]} key={opc[i]}>{opc[i]}</option>);
   }
   return data;
}

