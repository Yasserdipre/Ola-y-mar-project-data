import axios from "axios";
import { Linkname } from "../../link";
const link = Linkname()

// Configura una instancia de Axios con la base URL
const instance = axios.create({
   baseURL: `${link}`,
});

// Función reutilizable para hacer solicitudes GET
export const request = async (method, url, data = null) => {
   let promise;

   switch (method.toLowerCase()) {
   case "get":
      promise = instance.get(url);
      break;
   case "post":
      promise = instance.post(url, data);
      break;
      // Agrega otros casos según las demás peticiones que necesites (PUT, DELETE, etc.)

   default:
      throw new Error(`Método no admitido: ${method}`);
   }

   return promise
      .then(response => response.data)
      .catch(error => {
         console.error("Error en la solicitud:", error);
         throw error;
      });
};


