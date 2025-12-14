import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../bannerBoxV2";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBoxV2
            info="top"
            image={
              "https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBoxV2
            info="bottom"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBoxV2
            info="top"
            image={
              "https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBoxV2
            info="bottom"
            image={
              "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
            }
            link={"/"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
