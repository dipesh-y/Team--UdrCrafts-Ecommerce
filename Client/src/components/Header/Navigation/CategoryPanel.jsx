import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { IoCloseSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

import CategoryCollapse from "../../CategoryCollapse";

const CategoryPanel = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="CategoryPanel">
      <div className="p-3">
        <Link to="/" className="flex justify-center">
          <img
            src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
            alt="Logo"
            className="w-[170px]"
          />
        </Link>
      </div>
      <h3 className="p-3 text-[18px] font-[500] flex items-center justify-between px-3">
        Shop By Categories
        <IoCloseSharp
          onClick={() => props.openCategoryPanel(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>
      <CategoryCollapse />
    </Box>
  );

  return (
    <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
