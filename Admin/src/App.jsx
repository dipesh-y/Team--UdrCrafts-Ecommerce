import React, { createContext, useState,useEffect, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MyContext from "./context/MyContext";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; 
import Product from "./pages/Products";
import AddProduct from "./pages/Products/addProduct";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import { FaDoorClosed } from "react-icons/fa6";
import Typography from '@mui/material/Typography';
import Dashboard from "./pages/Dashboard/Index";
import HomeSliderBanners from "./pages/HomeSliderBanners";
import AddHomeSlide from "./pages/HomeSliderBanners/addHomeSlide";
import CategoryList from "./pages/Category";
import AddCategory from "./pages/Category/addCategory";
import SubCategoryList from "./pages/Category/subCatList";
import AddSubCategory from "./pages/Category/addSubCategory";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyAccount from "./pages/VerifyAccount";
import ChangePassword from "./pages/ChangePassword";
import OtpBox from "./components/OtpBox";
import { TbCodeAsterisk } from "react-icons/tb";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import toast, { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import AddAddress from "./pages/Address/addAddress";
import EditCategory from "./pages/Category/editCategory";

// ---- MOVED OUTSIDE App ----{Resolved Error}
// {Because there was an error comming : that after edit/upload the category page become non responsive freezes}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MainLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useContext(MyContext);
  return (
    <section className="main">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="contentMain flex">
        <div
          className={`sidebarWrapper transition-all duration-300 ${
            isSidebarOpen ? "w-[18%]" : "w-0 opacity-0"
          }`}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>

        <div
          className={`contentRight py-5 px-5 transition-all duration-300 ${
            isSidebarOpen ? "w-[82%]" : "w-full"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  
  {
    path: "/verify-account",
    element: <VerifyAccount />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/", 
    element: <MainLayout><Dashboard /></MainLayout>,
  },
  {
    path: "/products", 
    element: <MainLayout><Product /></MainLayout>,
  },
  {
    path: "/product/upload",
    exact:true,
    element:(
      <>
      <AddProduct/>
      </>
    ),
  },
  {
    path: "/homeSlider/list", 
    element: <MainLayout><HomeSliderBanners /></MainLayout>,
  },
  {
    path: "/category/list", 
    element: <MainLayout><CategoryList /></MainLayout>,
  },
  {
    path: "/subCategory/list", 
    element: <MainLayout><SubCategoryList /></MainLayout>,
  },
  {
    path: "/users", 
    element: <MainLayout><Users /></MainLayout>,
  },
  {
    path: "/profile", 
    element: <MainLayout><Profile /></MainLayout>,
  },
   
]);

function createData(
  id,
  name,
  category,
  subCategory,
  oldPrice,
  newPrice,
  stock
) {
  return { id, name, category, subCategory, oldPrice, newPrice, stock };
}

// ---- END MOVED OUTSIDE App ----

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model : "",
    id:""
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const [productRows, setProductRows] = useState([ 
    createData(
      1,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      85
    ),
    createData(
      2,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      35
    ),
    createData(
      3,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      75
    ),
    createData(
      4,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      55
    ),
    createData(
      5,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      15
    ),
    createData(
      6,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      5
    ),
    createData(
      7,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      40
    ),
    createData(
      8,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      20
    ),
    createData(
      9,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      90
    ),
    createData(
      10,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      70
    ),
    createData(
      11,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      40
    ),
    createData(
      12,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      39
    ),
    createData(
      13,
      "Vegetable Steamer for Cooking",
      "Kitchen Appliances",
      "Steamers",
      "₹499",
      "₹299",
      69
    ),
  ]);

 const alertBox=(type,msg)=>{
  if(type==='success'){
    toast.success(msg);
  }
  if(type==='error'){
    toast.error(msg);
  }
 }

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    productRows,
    alertBox,
    userData,
    setUserData,
    setAddress,
    address,
    refreshKey,
    triggerRefresh,
  };

useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setIsLogin(false);
    setUserData(null);
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/user/user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUserData(res.data.data);
        setIsLogin(true);
      }
    } catch (err) {
      setUserData(null);
      setIsLogin(false);
    }
  };

  fetchUser();
}, []);



  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
        <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={()=>setIsOpenFullScreenPanel({
          open: false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpenFullScreenPanel({
                open: false,
              })}
              aria-label="close"
            >
              <FaDoorClosed   />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isOpenFullScreenPanel ?.model}
            </Typography>
         
          </Toolbar>
        </AppBar>
     
        {
          isOpenFullScreenPanel ?.model === "Add Product" && <AddProduct/>
        }
       
       {
          isOpenFullScreenPanel ?.model === "Add Home Slide" && <AddHomeSlide/>
        }
          {
          isOpenFullScreenPanel ?.model === "Add New Category" && <AddCategory/>
        }

         {
          isOpenFullScreenPanel ?.model === "Add New Sub Category" && <AddSubCategory/>
        }

        {
          isOpenFullScreenPanel ?.model === "Add New Address" && <AddAddress/>
        }
        
        {
          isOpenFullScreenPanel ?.model === "Edit Category" && <EditCategory/>
        }
      </Dialog>
      
      <Toaster/>

    </MyContext.Provider>
  );
};

export default App;