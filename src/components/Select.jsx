
export const ISelect =({label, opcion, clase,clasediv, onChange, id}) =>{
    
    return(
        <div className={clasediv}>
        <label>{label}</label>
        <select className={clase} onChange={onChange}><Option opc = {opcion} id={id}/></select>
        </div>
    );

}


const Option = ({opc}) => {
    let data =[];
    for (let i= 0; i< opc.length ; i++) {
        
        data.push(<option  value={opc[i]} key={opc[i]}>{opc[i]}</option>);
    }
    return data;
}

