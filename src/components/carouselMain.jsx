import { Carousel, CarouselItem } from "./carousel";
import imgcoche from "../img/lamborghini-autentica-2024_7680x4320_xtrafondos.com.jpg"
import { useTranslation } from "react-i18next";


export const MainCarousel = () =>{
   const { t } = useTranslation();
   const carouselItems = [
      {
         data: "a",
         clases: "carousel-item active carousel-zoom",
         clase_text_titular: "title_style",
         title_princ: (
            <>
                Gali<span className="name_edit">C</span>ustom
            </>
         ),
         text: "Some representative placeholder content for the first slide.",
         src: "https://cdn.shopify.com/s/files/1/0751/1552/8534/files/entrada_web_logo_negro_izda.jpg?v=1683569861"
      },
      {
         data: "b",
         clases: "carousel-item",
         clase_text_titular: "title_style_2",
         title_princ: t("text.carousel_text"),
         text: "Some representative placeholder content for the first slide.",
         src: imgcoche
      }
   ];

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