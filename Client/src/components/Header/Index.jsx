import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import Navigation from "./Navigation";
import { MyContext } from "../../context/MyContext";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdGitCompare } from "react-icons/io";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { userData } = useContext(MyContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    context.setIsLogin(false);
    context.openAlertBox("success", "Logged out successfully");

    handleMenuClose();
    navigate("/");
  };

  return (
    <header className="bg-white">
      {/* Top strip */}
      <div className="border-y border-gray-200">
        <div className="container py-3 flex justify-between">
          <p className="text-[13px] font-[500]">
            Get up to 50% off new season styles, limited time only
          </p>

          <div className="flex gap-4">
            <Link to="/help-center" className="text-[13px] font-[500] link">
              Help Center
            </Link>
            <Link to="/order-tracking" className="text-[13px] font-[500] link">
              Order Tracking
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="w-[25%]">
            <img src={logo} alt="Logo" />
          </Link>

          <div className="w-[40%]">
            <Search />
          </div>

          <div className="w-[35%] flex justify-end">
            <ul className="flex items-center gap-3">
              {!context.isLogin ? (
                <li className="text-[15px] font-[500]">
                  <Link to="/login" className="link">
                    Login
                  </Link>{" "}
                  |{" "}
                  <Link to="/register" className="link">
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  {/* Account button */}
                  <Button
                    onClick={handleMenuOpen}
                    className="!text-black flex items-center gap-2"
                  >
                    <div className="w-[40px] h-[40px] rounded-full border flex items-center justify-center">
                      <FaRegUser />
                    </div>

                    <div className="text-left">
                      <h4 className="text-[14px] font-[500] leading-4">
                        {userData?.name || "User"}
                      </h4>
                      <span className="text-[13px] opacity-70">
                        {userData?.email || ""}
                      </span>
                    </div>
                  </Button>

                  {/* Account menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/my-account" className="flex gap-2">
                        <FaRegUser /> My Account
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/my-orders" className="flex gap-2">
                        <IoBagCheckOutline /> Orders
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/my-list" className="flex gap-2">
                        <IoMdHeartEmpty /> My List
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleLogout} className="flex gap-2">
                      <IoIosLogOut /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* Compare */}
              <Tooltip title="Compare">
                <IconButton>
                  <StyledBadge badgeContent={0} color="secondary">
                    <IoMdGitCompare />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              {/* Wishlist */}
              <Tooltip title="Wishlist">
                <IconButton>
                  <StyledBadge badgeContent={0} color="secondary">
                    <FaRegHeart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              {/* Cart */}
              <Tooltip title="Cart">
                <IconButton onClick={() => context.setOpenCartPanel(true)}>
                  <StyledBadge badgeContent={0} color="secondary">
                    <MdOutlineShoppingCart />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
