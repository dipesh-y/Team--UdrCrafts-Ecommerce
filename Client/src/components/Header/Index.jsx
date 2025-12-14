import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);

  return (
    <header className="bg-white">
      {/* top head */}
      <div className="top-strip border-t-[1px] border-b-[1px] border-gray-250">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[13px] font-[500]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="help-center"
                    className="text-[13px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[13px] link font-[500] transition"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* sec head */}
      <div className="header py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="col2 w-[40%]">
            <Search />
          </div>

          <div className="col3 w-[35%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-3 w-full">
              {context.login === false ? (
                <li className="list-none">
                  <Link
                    to="/login"
                    className="link transition text-[15px] font-[500]"
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transition text-[15px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  {/* Account Button */}
                  <Button
                    className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <div className="!w-[40px] !h-[40px] !min-w-[40px] rounded-full border border-[#f1f1f1] flex items-center justify-center">
                      <FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    </div>

                    <div className="info flex flex-col">
                      <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left">
                        Rinku Verma
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-[400] capitalize text-left">
                        rinkuv.planetc@gmail.com
                      </span>
                    </div>
                  </Button>

                  {/* Account Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/my-account" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <FaRegUser />{" "}
                        <span className="text-[18px]"> My account</span>
                      </MenuItem>{" "}
                    </Link>
                    <Link to="/my-orders" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <IoBagCheckOutline />{" "}
                        <span className="text-[18px]"> Orders</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-list" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <IoMdHeartEmpty />{" "}
                        <span className="text-[18px]"> My List</span>
                      </MenuItem>
                    </Link>

                    <MenuItem
                      onClick={handleClose}
                      className="flex gap-2 !py-2"
                    >
                      <IoIosLogOut />{" "}
                      <span className="text-[18px]"> Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* compare */}
              <li>
                <Tooltip title="Compare" placement="bottom">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoMdGitCompare />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* wishlist */}
              <li>
                <Tooltip title="Wishlist" placement="bottom">
                  <IconButton aria-label="wishlist">
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Cart */}
              <li>
                <Tooltip title="Cart" placement="bottom">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge badgeContent={4} color="secondary">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
