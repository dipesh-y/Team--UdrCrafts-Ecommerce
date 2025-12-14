import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const cartPanel = () => {
  return (
    <>
      <div className="sroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>

        <div className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="product/45875" className="block group">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462485033_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-0-202304220521.webp"
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <Link to="product/45875" className="link transition-all ">
              <h4 className="text-[14px] font-[500]">
                Chikankari Kurta with plazoo
              </h4>
            </Link>
            <p className="flex item-center gap-5 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-bold">Price : $25</span>
            </p>
            <MdOutlineDeleteOutline className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all" />
          </div>
        </div>
      </div>

      <br />

      <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
        <div className="bottonInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">1 item</span>
            <span className="text-primary font-bold">$86.00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Shipping </span>
            <span className="text-primary font-bold">$8.00</span>
          </div>
        </div>

        <div className="bottonInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total(tax excl.)</span>
            <span className="text-primary font-bold">$93.00</span>
          </div>

          <br />
          <div className="flex items-center  justify-between w-full gap-5">
            <Link to="/cart" className=" w-[50%]">
              {" "}
              <Button className="btn-org btn-lg w-full"> View Cart</Button>
            </Link>
            <Link to="/checkout" className=" w-[50%]">
              <Button className="btn-org btn-border btn-lg w-full">
                {" "}
                CheckOut
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default cartPanel;
