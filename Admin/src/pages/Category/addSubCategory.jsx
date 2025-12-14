import React from "react";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const AddSubCategory = () => {
  const [productCat, setProductCat] = React.useState("");


    const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8">
 
        <div className="scroll max-h-[72vh] overflow-y-auto pr-4 pt-4">
          
          <div className="grid grid-cols-4 mb-3 gap-5">

             <div className="col ">
              <h3 className="text-[14px] font-[500] !mb-2">Product Category</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={10}>Suits</MenuItem>
                <MenuItem value={20}>West Wear</MenuItem>
                <MenuItem value={30}>Co-Ords</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] !mb-2">Sub Category Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa]"
              />
            </div>


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

export default AddSubCategory;
