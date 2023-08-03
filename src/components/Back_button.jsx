import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import PropTypes from "prop-types";

export const BackButton = ({cant}) =>{
   const [t] = useTranslation();
   const history = useNavigate();
   const intNumber = parseInt(cant)
   return(
      <>
         <div className="ms-3 mt-3">
            <Button clase="btn btn-dark" name={t("man_data.btn-back.text")} onClick={() => history(intNumber)} />
         </div>
      </>
   )
}

BackButton.propTypes = {
   cant: PropTypes.string, // Etiqueta debe ser una cadena (string).
};








