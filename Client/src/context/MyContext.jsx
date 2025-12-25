import React, { createContext, useState } from "react";

export const MyContext = createContext(null);

const MyContextProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const openAlertBox = (status, msg) => {
    setAlert({ open: true, type: status, message: msg });
    setTimeout(() => {
      setAlert({ open: false, type: "", message: "" });
    }, 3000);
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  return (
    <MyContext.Provider
      value={{
        API_URL,
        alert,
        openAlertBox,
        openCartPanel,
        setOpenCartPanel,
        toggleCartPanel,
        openProductDetailsModal,
        setOpenProductDetailsModal,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
