import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const ProductZoom = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="flex gap-3">
        {/* LEFT THUMBNAILS */}
        <div className="slider w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[500px]"
          >
            <SwiperSlide>
              <div
                className={`rounded-md overflow-hidden cursor-pointer border h-24
                  transition-all duration-300 
                  ${
                    slideIndex === 0
                      ? "border-gray-600 opacity-100"
                      : "border-transparent opacity-40"
                  }
                `}
                onClick={() => goto(0)}
              >
                <img
                  src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                  className="w-full object-cover rounded-md"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className={`rounded-md overflow-hidden cursor-pointer h-24
      transition-all duration-300 
      ${slideIndex === 1 ? "opacity-100" : "opacity-40"}
    `}
                onClick={() => goto(1)}
              >
                <img
                  src="https://api.spicezgold.com/download/file_1734529363003_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-1-202310141511.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className={`rounded-md overflow-hidden cursor-pointer border h-24
                  transition-all duration-300 
                  ${
                    slideIndex === 2
                      ? "border-gray-600 opacity-100"
                      : "border-transparent opacity-40"
                  }
                `}
                onClick={() => goto(2)}
              >
                <img
                  src="https://api.spicezgold.com/download/file_1734529363005_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-2-202310141511.jpg"
                  className="w-full object-cover rounded-md"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* BIG IMAGE */}
        <div className="zoomContainer w-[85%] h-[500px] rounded-md overflow-hidden">
          <Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0}>
            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1.5}
                src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
              />
            </SwiperSlide>

            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1.5}
                src="https://api.spicezgold.com/download/file_1734529363003_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-1-202310141511.jpg"
              />
            </SwiperSlide>

            <SwiperSlide>
              <InnerImageZoom
                zoomType="hover"
                zoomScale={1.5}
                src="https://api.spicezgold.com/download/file_1734529363005_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-2-202310141511.jpg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
