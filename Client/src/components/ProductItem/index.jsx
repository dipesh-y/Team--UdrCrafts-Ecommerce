import React, { useContext } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App";

const ProductItem = () => {
  const context = useContext(MyContext);

  return (
    <div className="productItem rounded-md shadow-lg overflow-hidden border border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper w-[100%] h-[220px] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className="img h-[220px] overflow-hidden">
            <img
              src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
              className="w-full"
              alt="product"
            />
            <img
              src="https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              alt="product hover"
            />
          </div>
        </Link>

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
          10%
        </span>

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-black"
            onClick={() => context.setOpenProductDetailsModal(true)}
          >
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-black">
            <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>

          <Button className="!w-[35px] !h-[35px] !min-w-[40px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-black">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5">
        <h6 className="text-[13px] !font-[400]">
          <Link to="/" className="link">
            Tikhi Imli
          </Link>
        </h6>

        <h3 className="text-[13px] title mt-1 font-[500] mb-1 text-[#000]">
          <Link to="/" className="link transition-all">
            Embellished Sequinned Ready to Wear Saree
          </Link>
        </h3>

        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $58.00
          </span>
          <span className="price text-primary font-[600]">$58.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
