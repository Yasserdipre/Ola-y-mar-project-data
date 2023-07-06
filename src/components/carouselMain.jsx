import { Carousel, CarouselItem } from "./carousel";
import imgcoche from '../img/lamborghini-autentica-2024_7680x4320_xtrafondos.com.jpg'
import { useTranslation } from 'react-i18next';

export const MainCarousel = () =>{
    const { t } = useTranslation();
    const carouselItems = [
        {
            data: 'a',
            clases: 'carousel-item active carousel-zoom',
            clase_text_titular: 'title_style',
            title_princ: 'Construcciones Ola y Mar',
            text: 'Some representative placeholder content for the first slide.',
            src: 'https://hips.hearstapps.com/hmg-prod/images/p90505000-highres-the-new-bmw-i5-edriv-646e0dfd26462.jpg'
          },
          {
            data: 'b',
            clases: 'carousel-item',
            clase_text_titular: 'title_style_2',
            title_princ: t('text.carousel_text'),
            text: 'Some representative placeholder content for the first slide.',
            src: imgcoche
          }
    ];
    console.log(t('text.carousel_text'))

    return(
        <Carousel>
      {carouselItems.map((item, index) => (
        <CarouselItem
          key={index}
          data={item.data}
          clases={item.clases}
          clase_text_titular={item.clase_text_titular}
          title_princ={item.title_princ}
          text={item.text}
          src={item.src}
        />
      ))}
    </Carousel>
    )
}