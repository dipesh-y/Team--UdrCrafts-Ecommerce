import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import CategoryPanel from "./CategoryPanel";
import "../Navigation/style.css";
import { LiaAngleDownSolid } from "react-icons/lia";
import { RiMenu2Fill } from "react-icons/ri";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = (value) => {
    setIsOpenCatPanel(value !== undefined ? value : !isOpenCatPanel);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button className="!text-black gap-2 w-full" onClick={openCategoryPanel}>
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold " />
            </Button>
          </div>

          <div className="col_2 w-[50%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </li>
              <li className="list-none relative">
                <Link to="/ProductListing">
                  <Button>Fashion</Button>
                </Link>
                {/* Submenu items */}
              </li>
              {/* Add other menu items similarly */}
            </ul>
          </div>

          <div className="col_3 w-[30%]">
            <p className="text-[14px] font-bold flex items-center gap-3 mb-0 mt-0">
              <MdOutlineRocketLaunch className="text-[14px]" /> Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel component */}
      <CategoryPanel
        setIsOpenCatPanel={setIsOpenCatPanel}
        isOpenCatPanel={isOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
