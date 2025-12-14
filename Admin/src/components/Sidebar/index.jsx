import { Button } from "@mui/material";
import React,{useContext, useState} from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { RiMenu2Line } from "react-icons/ri";
import { PiDiamondLight } from "react-icons/pi";
import MyContext from "../../context/MyContext";


const Sidebar = ({ toggleSidebar }) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if(submenuIndex===index){
      setSubmenuIndex(null);
    }
    else{
      setSubmenuIndex(index);
    }
  };

  const context = useContext(MyContext)

  return (
      <div className="sidebar fixed top-0 left-0 bg-[#fff] h-screen w-[18%] border-r border-[rgba(0,0,0,0.1)] shadow-md transition-all duration-300">
        <div className="relative w-full">
          <div className="py-2 w-full px-4">
            <Link to="/">
              <img
                src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
                className="w-[0px]"
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <ul className="mt-4 px-4">
          <li>
            <Link to="/">
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]">
              <RxDashboard className="text-[18px]" /> <span>Dashboard</span>
            </Button>
            </Link>
          </li>

          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]" 
            onClick={() => isOpenSubMenu(1)}>
              <FaRegImage className="text-[18px]" /> <span>Home Slide</span>
              <span
                className="ml-auto w-[30px] h-[30px] flex items-center justify-center"
                
              >
                <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`}/>
              </span>
            </Button>
            <Collapse isOpened={submenuIndex===1 ? true:false}>
              <ul className="w-full">
                <li className="w-full">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add Home Banner Slides
                </Button>
                </li>

                <li className="w-full">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Home Banner List
                </Button>
                </li>
              </ul> 

            </Collapse>



            </li>

            <li>
              <Link to="/users">
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]">
              <FiUsers className="text-[18px]" /> <span>Users</span>
            </Button>
            </Link>
          </li>

          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]" 
            onClick={() => isOpenSubMenu(3)}>
              <FaRegImage className="text-[18px]" /> <span>Products</span>
              <span
                className="ml-auto w-[30px] h-[30px] flex items-center justify-center"
                
              >
                <FaAngleDown className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`}/>
              </span>
            </Button>
            <Collapse isOpened={submenuIndex===3 ? true:false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                 
                  <Button className="w-full !capitalize !items-center !justify-start !text-[14px] !font-[400] !text-[rgba(0,0,0,0.8)] !py-3 !px-4 !pl-10 !rounded-md hover:!bg-[rgba(0,0,0,0.05)] transition-all gap-3" onClick={()=>context.setIsOpenFullScreenPanel({
                      open: true,
                      model:"Add Product"
                    })}>
                      <PiDiamondLight />
                      <span>
                        Product Upload
                      </span>
                    </Button>
                
                </li>
              </ul> 

            </Collapse>
            </li>


          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]" 
            onClick={() => isOpenSubMenu(4)}>
              <TbCategory className="text-[18px]" /> <span>Category</span>
              <span
                className="ml-auto w-[30px] h-[30px] flex items-center justify-center"
                
              >
                <FaAngleDown className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`}/>
              </span>
            </Button>
            <Collapse isOpened={submenuIndex===4 ? true:false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "   onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Category",
                  })
                }> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                      Add a Category
                    </Button>
                  
                </li>

                <li className="w-full">
                  <Link to="/subCategory/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                      Sub Category List
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3" onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Sub Category",
                  })
                }> <span className="block w-[5px] h-[10px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add a Sub Category
                </Button>
              
                </li>



              </ul> 

            </Collapse>
           
          </li>
          <li>
            <Link to="/orders">
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]">
              <IoBagCheckOutline className="text-[20px]" /> <span>Orders</span>
            </Button>
          </Link>
          </li>

          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:bg-[#f1f1f1]">
              <IoMdLogOut className="text-[20px]" /> <span>Logout</span>
            </Button>
          </li>
        </ul>
      </div>

  );
};

export default Sidebar;
