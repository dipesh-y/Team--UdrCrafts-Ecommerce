import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full rounded-md overflow-hidden rounded-md group relative ">
      <img
        src={props.image}
        className="w-full transition-all duration-150 group-hover:scale-105"
      />

      <div
        className={`info absolute p-8 top-0 ${
          props.info === "top" ? "right-0" : "bottom-0"
        }     ${
          props.info === "bottom" ? "-right-4" : "bottom-2"
        }  w-[70%] h-[100%] z-50 flex items-center justify-center flex-col gap-3`}
      >
        <h2 className="text-[20px] font-[600]">Buy women with low price</h2>
        <span className=" text-[25px] font-[600] text-primary w-full flex justify-center">
          $ 99.00
        </span>

        <div className="w-full">
          <Link
            to="/"
            className="text-[16px] font-[600] flex justify-center link "
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
