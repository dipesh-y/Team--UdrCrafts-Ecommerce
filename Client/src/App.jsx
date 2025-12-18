import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import ProductZoom from "./components/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductDetailsComponent from "./components/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";

import toast, { Toaster } from "react-hot-toast";
import { MyContext } from "./context/MyContext";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";


// app-level alert helper will be defined inside component

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [fullWidth, _setFullWidth] = useState(true);
  const [maxWidth, _setMaxWidth] = useState("lg");
  const [isLogin, setIsLogin] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const [openCartPanel, setOpenCartPanel] = React.useState(false);

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

  const values = {
    setOpenProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    login: isLogin,
    setIsLogin 
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
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

      <Toaster />

      <Dialog
        open={openProductDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              onClick={handleCloseProductDetailsModal}
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[5px] !bg-[#f1f1f1]"
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>

            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


export default App;