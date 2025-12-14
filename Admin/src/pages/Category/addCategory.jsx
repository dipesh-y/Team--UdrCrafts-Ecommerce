import React from "react";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCategory = () => {
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8">
 
        <div className="scroll max-h-[72vh] overflow-y-auto pr-4 pt-4">
          
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full md:w-1/4 mb-4">
              <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>

              
              <textarea
                type="text" size="small"
                className="w-full h-10 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa] resize-none"
              />
            </div>
          </div>

          <h3 className="text-[18px] font-[500] mb-3">Category Image</h3>

         
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
           
            <div className="uploadBoxWrapper relative md:col-span-1">
              
              <button
                type="button"
                aria-label="remove-image"
                className="absolute top-2 right-2 z-50 w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center hover:opacity-90"
              >
                <IoClose className="text-white text-[14px]" />
              </button>

              <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt="category"
                  effect="blur"
                  wrapperProps={{ style: { transitionDelay: "1s" } }}
                  className="w-full h-full object-cover"
                  src="https://m.media-amazon.com/images/I/31mRxdcDb6L._SR290,290_.jpg"
                />
              </div>
            </div>

            
            <div className="md:col-span-6">
              <UploadBox multiple={true} />
            </div>
          </div>

          <div className="mt-6">
            <hr />
          </div>

          <div className="mt-4 w-full md:w-[250px]">
            <Button
              type="button"
              className="btn-blue btn-lg w-full flex gap-2"
              variant="contained"
            >
              Publish and View
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
