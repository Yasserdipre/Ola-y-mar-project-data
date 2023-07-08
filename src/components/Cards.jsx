import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
import '../Cards.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const CardProducts = ({name, id, image, price, totalSales, timeLeft, rating}) =>{
    const [t, i18n] = useTranslation();
    return(
        <Link to={`/hombres/${name.replace(/\s+/g, '')}`} className='link'>
        <div className='productList'>
      <div key={id} className='productCard'>
        <img src={image} alt='product-img' className='w-100' />

        <Link to='/cart' className='productCard__cart'>
          <FaShoppingCart />
        </Link>
        <Link to='/wishlist' className='productCard__wishlist'>
          <FaRegBookmark />
        </Link>
        <Link to='/popular' className='productCard__fastSelling'>
          <FaFireAlt />
        </Link>

        <div className='productCard__content'>
          <h3 className='productName text-center'>{t(`man_data.electronic.${name.replace(/\s+/g, '')}.name`)}</h3>
          <div className='displayStack__1'>
            <div className='productPrice'>{t(`man_data.electronic.${name.replace(/\s+/g, '')}.price`)}€</div>
            <div className='productSales'>{totalSales} {t(`man_data.units.units-sold`)}</div>
          </div>
          <div className='displayStack__2'>
            <div className='productRating'>
              {[...Array(rating)].map((index) => (
                <FaStar id={index + 1} key={index} />
              ))}
            </div>
            <div className='productTime'>{timeLeft} {t(`man_data.units.days`)}</div>
          </div>
        </div>
      </div>
    </div>
    </Link>
    )



}


