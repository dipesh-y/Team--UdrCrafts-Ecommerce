import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Index";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";

import ProductZoom from "./components/ProductZoom";
import ProductDetailsComponent from "./components/ProductDetails";

import { IoCloseSharp } from "react-icons/io5";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { MyContext } from "./context/MyContext";



function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/user/user-details`,
          { withCredentials: true }
        );


        if (res.data.success) {
          setUserData(res.data.data);
          setIsLogin(true);
          window.location.href = "/login";
        }
      } catch (err) {
        setUserData(null);
        setIsLogin(false);
      }
    };

    fetchUser();
  }, []);



  const contextValues = {
    API_URL,
    userData,
    setUserData,
    setOpenProductDetailsModal,
    openCartPanel,
    setOpenCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={contextValues}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productListing" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-orders" element={<Orders />} />
          </Routes>

          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster position="top-right" />

      {/* Product Details Modal */}
      <Dialog
        open={openProductDetailsModal}
        fullWidth
        maxWidth="lg"
        onClose={handleCloseProductDetailsModal}
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex w-full relative productDetailsModalContainer">
            <Button
              onClick={handleCloseProductDetailsModal}
              className="!absolute top-[15px] right-[5px] !w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]"
            >
              <IoCloseSharp className="text-[20px] text-black" />
            </Button>

            <div className="w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="w-[60%] py-8 px-8 pr-16">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
