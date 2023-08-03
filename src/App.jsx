import { useState, useEffect} from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import FlagsSelect from "react-flags-select";
import { FaMoon, FaSun } from "react-icons/fa";
import { MainCarousel } from "./components/carouselMain";
import { Route, Routes } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { ProductData } from "./components/Products";
import { ProductCard } from "./components/Cards";
import "./Cards.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Details } from "./components/Products_detail";
import { Products_total } from "./components/All_products";
import { Header } from "./components/Header";
import { useFilters } from "./hooks/useFilters";
import { Cart } from "./components/cart";
import { useCart } from "./hooks/useCart";
import { FaShoppingCart, FaRegBookmark } from "react-icons/fa";
import { Save } from "./components/Save";
import { useSave } from "./hooks/useSave";
import images from "./components/import_images";
import PropTypes from "prop-types";

const responsive = {
   desktop: {
      breakpoint: { max: 3000, min: 1815 },
      items: 5,
   },
   tablet: {
      breakpoint: { max: 1045, min: 650 },
      items: 2,
   },
   mobile: {
      breakpoint: { max: 649, min: 0 },
      items: 1,
   },
   custom1: {
      breakpoint: { max: 1499, min: 1046 },
      items: 3,
   },
   custom2: {
      breakpoint: { max: 1814, min: 1500 },
      items: 4,
   },

   // Agrega más breakpoints personalizados si es necesario
};

export const App3 = () => {
   const Home = () => <h1>Home</h1>;
   const Service = () => {
      const { name } = useParams();
      return (
         <>
            <div>
               <h1>Divisiones</h1>
               {name}
            </div>
         </>
      );
   };
   const Services = () => {
      const name = ["Reparación", "Venta", "Diseño", "Pintura"];
      return (
         <div>
            <h1>Services</h1>
            <ul>
               {name.map((Services) => (
                  <li key={Services}>
                     <Link  to={`/service/${Services}`}>
                        {Services}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      );
   };

   return (
      <>
      Probando
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/service">Services</Link>
               </li>
            </ul>
         </nav>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/:name" element={<Service />} />
         </Routes>
      </>
   );
};

const Cards = () => {
   const { addToCart, cart, removeFromCart } = useCart();

   const checkProductInCart = (product) => {
      return cart.some((item) => item.id === product.id);
   };

   return (
      <Carousel responsive={responsive}>
         {ProductData.map((product) => (
            <div key={product.id}>
               <ProductCard
                  product={product}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  isProductInCart={checkProductInCart(product)}
                  clase="mt-5"
               />
            </div>
         ))}
      </Carousel>
   );
};

export const App = () => {
   // const Home = () => <h1>Home</h1>;
   // const Services = () => <h1>Servicios</h1>;

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-light navbar-light" id="navdata">
            <div className="container-fluid">
               <Link className="navbar-brand" to="/">
                  <img
                     src={images.Logo}
                     alt="Logo"
                     className="d-inline-block align-text-top img-fluid"
                     style={{ height: "35px" }}
                  />
               </Link>
               <button
                  className="navbar-toggler order-first"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <ul className="navbar-nav mx-auto" id="navbar">
                     <Navbaritems />
                  </ul>
               </div>
               <div className="d-flex">
                  <ul className="navbar-nav d-flex ms-auto" id="navbar2">
                     <Language />
                     <Btnlightdark />
                     <IconsNavbar />
                  </ul>
               </div>
            </div>
         </nav>


         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <App2 />
                     <Cards />
                     <Cart />
                  </>
               }
            />
            <Route
               path="/service"
               element={
                  <>
                     <All_products_filtered /> <Cart /> 
                  </>
               }
            />
            <Route path="/hombres/:product" element={
               <>
                  <Details products={ProductData}/>
                  <Cart />
               </>
            } />
            <Route
               path="/proyectos"
               element={
                  <>
                     <Cart />
                  </>
               }
            />
            <Route
               path="*"
               element={<h1 className="text-center mt-5">Not Found</h1>}
            />
            <Route
               path="/save"
               element={

                  <>
                     <Save/>
                     <All_products_saved/>
                     <Cart />
                  </>
               }
            />
         </Routes>
      </>
   );
};

//---------------------------------------------------------------------------------------------------------------------------------------------------

export const Navdata = ({ clase, nav, to }) => {
   clase === undefined ? (clase = "nav-link") : (clase += " nav-link ");
   return (
      <li className="nav-item">
         <Link to={to} className={clase} aria-current="page">
            {nav}
         </Link>
      </li>
   );
};

Navdata.propTypes = {
   clase: PropTypes.string,
   nav: PropTypes.string.isRequired,
   to: PropTypes.string.isRequired,
};


export const Language = () => {
   const { t, i18n } = useTranslation();
   const [language, setLanguage] = useState("ES");

   const handleLanguageChange = (countryCode) => {
      setLanguage(countryCode);
      countryCode === "ES" ? (countryCode = "es") : (countryCode = "en");
      i18n.changeLanguage(countryCode);
   };

   return (
      <li className="nav-item select-without-border">
         <FlagsSelect
            selected={language}
            onSelect={handleLanguageChange}
            countries={["ES", "US"]}
            customLabels={{
               ES: t("language.spain"),
               US: t("language.unitedStates"),
            }}
         />
      </li>
   );
};

export const Navbaritems = () => {
   const [t] = useTranslation();

   return (
      <>
         <Navdata nav={t("navbar.home")} clase="active" to="/" />
         <Navdata nav={t("navbar.service")} clase="" to="/service" />
         <Navdata nav={t("navbar.projects")} clase="" />
         <Navdata nav={t("navbar.contact")} clase="" />
      </>
   );
};

const IconsNavbar = () =>{
   return(
      <>
         <div className="navbar-icons mb-2 ms-2">
            <button
               className="btn btn-primary"
               type="button"
               data-bs-toggle="offcanvas"
               data-bs-target="#offcanvasRight"
               aria-controls="offcanvasRight"
               style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  outline: "none",
                  color: "black",
               }}
            >
               <FaShoppingCart aria-hidden="true" />
            </button>
            <Link to="/save">
               <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                     border: "none",
                     background: "none",
                     padding: 0,
                     outline: "none",
                     color: "black",
                  }}
               >
                  <FaRegBookmark aria-hidden="true" />
               </button>
            </Link>
         </div>
      </>
   )
}

export const App2 = () => {
   return (
      <>
         <div className="container-fluid  h-size">
            <MainCarousel />
         </div>
      </>
   );
};

export const Btnlightdark = () => {
   useEffect(() => {
      const handleChange = () => {
         const navdata = document.getElementById("navdata");
         navdata.classList.toggle("navbar-light");
         navdata.classList.toggle("navbar-dark");
         navdata.classList.toggle("bg-light");
         navdata.classList.toggle("bg-dark");
         document.body.classList.toggle("dark-mode");


         const label = document.querySelector(".label");
         label.classList.toggle("label-light");
         label.classList.toggle("label-dark");
      };

      const chk = document.getElementById("chk");
      chk.addEventListener("change", handleChange);

      return () => {
         chk.removeEventListener("change", handleChange);
      };
   }, []);

   return (
      <>
         <li className="btn-dl me-3 ms-3">
            <input type="checkbox" className="checkbox" id="chk" />
            <label className="label label-light" htmlFor="chk">
               <FaMoon />
               <FaSun color="#FFD700" style={{ color: "#FFD700" }} />
               <div className="ball"></div>
            </label>
         </li>
      </>
   );
};

const All_products_filtered = () => {
   const [products] = useState(ProductData);
   const { filterProducts } = useFilters();
   const filteredProducts = filterProducts(products);
   return (
      <>
         <Header name="Productos"/>
         <Products_total product_filter={filteredProducts} />
      </>
   );
};

const All_products_saved = () => {
   const { save } = useSave();
   const [products, setProducts] = useState(save);
   const { filterProducts } = useFilters();
   const filteredProducts = filterProducts(products);

   // Escuchar cambios en el estado 'save' utilizando useEffect
   useEffect(() => {
      setProducts(save);
   }, [save]);

   return (
      <>
         <Header  name="Favoritos"/>
         <Products_total product_filter={filteredProducts} />
      </>
   );
};


export const Itext = ({
   label,
   clase,
   readonly,
   hdn,
   type,
   value,
   onChange,
   min,
   max,
   id,
   htmlFor,
   clase2, 
   clase3
}) => {
   clase === undefined ? (clase = "me-2 ms-2") : (clase += " me-2 ms-2");
   type === undefined ? (type = "text") : (type += "");
   // defaultValue === undefined ? defaultValue=defaultValue : defaultValue = defaultValue;

   return (
      <>
         <div className={clase2}>
            <label htmlFor={htmlFor} className={clase3}>
               {label}
            </label>
            <input
               type={type}
               name=""
               id={id}
               className={clase}
               hidden={hdn}
               readOnly={readonly}
               value={value}
               onChange={onChange}
               min={min}
               max={max}
      
            />
         </div>
      </>
   );
};



Itext.propTypes = {
   label: PropTypes.string.isRequired, // Etiqueta debe ser una cadena (string).
   clase: PropTypes.string, // Clase debe ser una cadena (string).
   readonly: PropTypes.bool, // Readonly debe ser un booleano (true/false).
   hdn: PropTypes.bool, // Hdn debe ser un booleano (true/false).
   type: PropTypes.string, // Tipo debe ser una cadena (string).
   value: PropTypes.string, // Valor debe ser una cadena (string).
   onChange: PropTypes.func, // onChange debe ser una función (func).
   min: PropTypes.number, // Min debe ser un número (number).
   max: PropTypes.number, // Max debe ser un número (number).
   id: PropTypes.string, // Id debe ser una cadena (string).
   htmlFor: PropTypes.string, // HtmlFor debe ser una cadena (string).
   clase2: PropTypes.string, // Clase2 debe ser una cadena (string).
   clase3: PropTypes.string, // Clase3 debe ser una cadena (string).
};