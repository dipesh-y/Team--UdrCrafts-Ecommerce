import React, { createContext, useState , useEffect} from "react";

export const MyContext = createContext(null);

const MyContextProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

 useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsLogin(true);
    }
  }, []);

  // 2. Custom Login function to save to localStorage
  const handleLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data)); // Save to disk
    setUserData(data);
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear disk
    setUserData(null);
    setIsLogin(false);
  }; 
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
