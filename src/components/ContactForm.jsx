import { useState, useEffect } from "react";
import "../css/ContactForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FloatingButtons } from "./Socialmedia";
import { Linkname } from "../../link";

const link = Linkname()

function ContactForm() {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      reason: "",
      message: "",
   });

   const [missingFields, setMissingFields] = useState([]);
   const [isSent, setIsSent] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const getMissingFieldNames = () => {
      const missingFieldNames = missingFields.map(fieldName => {
         return t(`contact_form.${fieldName}`);
      });
      return missingFieldNames;
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      const missing = Object.keys(formData).filter((key) => formData[key] === "");
      if (missing.length > 0) {
         setMissingFields(missing);
         return;
      }

      setMissingFields([]);
      setIsSent(false);
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const jsonData = {
         "firstName": formData.firstName,
         "lastName": formData.lastName,
         "email": formData.email,
         "phone": formData.phone,
         "reason": formData.reason,
         "message": formData.message,
      };

      try {
         const response = await axios.post(`${link}/send-contact-form`, jsonData, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         console.log("Respuesta del servidor:", response.data);
         setIsLoading(false);
         setIsSent(true);
         setTimeout(() => {
            navigate("/");
         }, 1500);
      } catch (error) {
         console.error("Error al enviar el formulario:", error);
         setError("Error al enviar los datos");
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (isSent) {
         const timer = setTimeout(() => setIsSent(false), 3000);
         return () => clearTimeout(timer);
      }
   }, [isSent]);

   return (
      <>
         <div className="contact-form-container mt-5">
            <div className="w-100 text-center">
               <h1>{t("contact_form.h1")}</h1>
            </div>
            {missingFields.length > 0 && (
               <div className="row bg-danger border rounded mb-2">
                  <div className="col-12 text-center mt-3">
                     <p className="missing-fields-alert text-white">
                        <p className="missing-fields-alert text-white">
                           {t("contact_form.missingFields", { fields: getMissingFieldNames().join(", ") })}
                        </p>

                     </p>
                  </div>
               </div>
            )}
            {error && (
               <div className="row bg-danger border rounded mb-2">
                  <div className="col-12 text-center mt-3">
                     <p className="error-message text-white">{t("contact_form.errorSending")}</p>
                  </div>
               </div>
            )}
            {isSent && (
               <div className="row bg-success border rounded mb-2">
                  <div className="col-12 text-center mt-3">
                     <p className="missing-fields-alert text-white">{t("contact_form.sentSuccessfully")}</p>
                  </div>
               </div>
            )}
            {isLoading && (
               <div className="row">
                  <div className="col-12 text-center mt-3">
                     <div className="loading-spinner"></div>
                  </div>
               </div>
            )}
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor="firstName">{t("contact_form.firstName")}</label>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor="lastName">{t("contact_form.lastName")}</label>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor="phone">{t("contact_form.phone")}</label>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor="email">{t("contact_form.email")}</label>
                  </div>
               </div>
               <div className="col-12">
                  <div className="form-group">
                     <input
                        type="text"
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        required
                     />
                     <label htmlFor="reason">{t("contact_form.reason")}</label>
                  </div>
               </div>
               <div className="col-12">
                  <div className="form-group">
                     <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        required
                     ></textarea>
                     <label htmlFor="message">{t("contact_form.message")}</label>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12 text-center">
                  {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin  size="2x" style={{ color: "green" }}/> : <button type="submit" className={`submit-button w-100 ${isLoading ? "loading" : ""}`} onClick={handleSubmit} disabled={isLoading}>Enviar Mensaje</button>}
               
               </div>
            </div>
         </div>

         <FloatingButtons />
      </>
   );
}

export default ContactForm;
