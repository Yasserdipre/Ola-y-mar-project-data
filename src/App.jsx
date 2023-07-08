import { useState, useEffect } from 'react';
import './App.css'
import { useTranslation } from 'react-i18next';
import FlagsSelect from 'react-flags-select';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MainCarousel } from './components/carouselMain';
import { Route, Routes } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { ProductData } from './components/Products';
import { CardProducts } from './components/Cards';
import './Cards.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Details } from './components/Products_detail';
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

  const Home = () => <h1>Home</h1>
  const Service = () =>{
    const { name } = useParams()
    return(
      <>
      <div>
      <h1>Divisiones</h1>
      {name}
      </div>
      </>
    )
  } 
  const Services = () => {
    const name = [
      'Reparación',
      'Venta',
      'Diseño',
      'Pintura'
    ]
    return(
      <div>
        <h1>Services</h1>
        <ul>
        {name.map(Services => (
          
            <li><Link key={Services} to={`/service/${Services}`}>{Services}</Link></li>
          
        ))}
        </ul>
      </div>
    )
  } 

  return (
    <>
      Probando
      
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/service'>Services</Link></li>
        </ul>
      </nav>

      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/service' element={<Services/>} />
      <Route path='/service/:name' element={<Service/>} />
      </Routes>
    </>
  )
}

const Cards = () =>{
  return(
<Carousel responsive={responsive}>
      {ProductData.map((product) => (
        <div key={product.id}>
          <CardProducts
            image={product.image}
            name={product.name}
            price={product.price}
            totalSales={product.totalSales}
            timeLeft={product.timeLeft}
            rating={product.rating}
          />
        </div>
      ))}
    </Carousel>
            )
}


export const App = () => {

  const Home = () => <h1>Home</h1>
  const Services = () => <h1>Servicios</h1>



  return(
    <>
    <nav className="navbar navbar-expand-lg bg-light navbar-light" id="navdata"> 
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button className="navbar-toggler order-first" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
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
          <Btnlightdark/>
          </ul>
        </div>
      </div>
    </nav>
    
    <Routes>
      <Route path='/' element={
        <>
      <App2/> 
      <Cards/>
      </>} />
      <Route path='/service' element={<Services/>} />
      <Route path='/hombres/:product' element={<Details/>} />
      <Route path='*' element={<h1 className='text-center mt-5'>Not Found</h1>}/>
    </Routes>
    </>
  )
}

//---------------------------------------------------------------------------------------------------------------------------------------------------


export const Navdata = ({clase, nav, to}) => {
  clase === undefined ? clase='nav-link' : clase+= ' nav-link ' 
  return(<li className="nav-item">
    <Link to={to} className={clase} aria-current="page" >{nav}</Link>
    </li> )
}

export const Language = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('ES');

  const handleLanguageChange = (countryCode) => {
    setLanguage(countryCode);
    countryCode === 'ES' ? countryCode = "es" : countryCode ='en'
    i18n.changeLanguage(countryCode);
  };

  return (
 
            <li className="nav-item select-without-border">
               <FlagsSelect
                selected={language}
                onSelect={handleLanguageChange}
                countries={['ES', 'US']}
                customLabels={{ ES: t('language.spain'), US: t('language.unitedStates') }}
              />
            </li>

  );
};

export const Navbaritems = () =>{
  const [t, i18n] = useTranslation();
  
  return(
    <>
    <Navdata nav={t("navbar.home")} clase="active" to="/"/>
    <Navdata nav={t("navbar.service")} clase="" to="/service"/>
    <Navdata nav={t("navbar.projects")} clase=""/>
    <Navdata nav={t("navbar.contact")} clase=""/>
    </>
  )
}

export const App2 = () => {
  const [t, i18n] = useTranslation();
  return (
    <>
    <div className="container-fluid  h-size">
      <MainCarousel/>
    </div>
    </>
  );
}


export const Btnlightdark = () => {

  useEffect(() => {
    const handleChange = () => {
      const navdata = document.getElementById('navdata');
      navdata.classList.toggle('navbar-light');
      navdata.classList.toggle('navbar-dark');
      navdata.classList.toggle('bg-light');
      navdata.classList.toggle('bg-dark');

      const label = document.querySelector('.label');
      label.classList.toggle('label-light');
      label.classList.toggle('label-dark');

    };

    

    const chk = document.getElementById('chk');
    chk.addEventListener('change', handleChange);

    return () => {
      chk.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <li className='btn-dl me-3 ms-3'>
        <input type="checkbox" className="checkbox" id="chk" />
        <label className="label label-light" htmlFor="chk">
          <FaMoon />
          <FaSun  color="#FFD700" style={{ color: '#FFD700' }}/>
          <div className="ball"></div>
        </label>
      </li>
    </>
  );
};



export const Itext = ({label, clase, readonly,type, value, onChange, min, max, id}) => {
  clase === undefined ? clase='me-2 ms-2' : clase+= ' me-2 ms-2'
  type === undefined ? type='text' : type+="";
 // defaultValue === undefined ? defaultValue=defaultValue : defaultValue = defaultValue;

  return(
      <>
      
      <label className='rojo'>{label}</label>
      <input type={type} name="" id={id} className={clase} readOnly={readonly} value={value} onChange={onChange} min={min} max={max}/>
      
      </>
  )
}


