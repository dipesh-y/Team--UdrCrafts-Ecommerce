import React from 'react'
import { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from "../../components/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import MyContext from "./../../context/MyContext";
import { useContext } from 'react';
import { postData } from '../../utils/api';
import CircularProgress from "@mui/material/CircularProgress";
const ChangePassword = () => {


  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
      oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();


  const { alertBox } = useContext(MyContext);


  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formFields.email.trim()) {
    alertBox("error", "Please enter email");
    return;
  }

  if (!formFields.oldPassword.trim()) {
  alertBox("error", "Please enter old password");
  return;
}


  if (!formFields.newPassword.trim()) {
    alertBox("error", "Please enter new password");
    return;
  }

  if (!formFields.confirmPassword.trim()) {
    alertBox("error", "Please confirm password");
    return;
  }

  if (formFields.newPassword !== formFields.confirmPassword) {
    alertBox("error", "Passwords do not match");
    return;
  }

  setIsLoading(true);

  try {
    const res = await postData("/api/user/reset-password", {
      email: formFields.email,
        oldPassword: formFields.oldPassword,
      newPassword: formFields.newPassword,
      confirmPassword: formFields.confirmPassword,
    });

    if (res?.success) {
      alertBox("success", res.message || "Password reset successful");
      navigate("/login");
    } else {
      alertBox("error", res?.message || "Reset failed");
    }
  } catch (err) {
    alertBox("error", err.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};



 /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.email.trim()) {
  openAlertBox("error", "Please enter email");
  return;
}
if (!formFields.email.trim()) {
  openAlertBox("error", "Please enter email");
  return;
}

if (!formFields.newPassword.trim()) {
  openAlertBox("error", "Please enter new password");
  return;
}

if (!formFields.confirmPassword.trim()) {
  openAlertBox("error", "Please confirm your password");
  return;
}

if (formFields.newPassword !== formFields.confirmPassword) {
  openAlertBox("error", "Passwords do not match");
  return;
}


    if (formFields.newPassword === "") {
      openAlertBox("error", "Please enter new password");
      return;
    }

    if (formFields.confirmPassword === "") {
      openAlertBox("error", "Please enter confirm password");
      return;
    }

    if (formFields.newPassword !== formFields.confirmPassword) {
      openAlertBox("error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/user/reset-password", {
        email: formFields.email,
        newPassword: formFields.newPassword,
        confirmPassword: formFields.confirmPassword,
      });

      if (res?.success) {
        openAlertBox("success", res.message || "Password reset successful");

        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");

        navigate("/login");
      } else {
        openAlertBox("error", res.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      openAlertBox(
        "error",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
*/

  return (
    <section className="bg-white w-full ">
      <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>
        <Link to="/">
          <img
            src="https://isomorphic-furyroad.vercel.app/_next/static/media/logo.a795e14a.svg"
            className="w-[200px]"
          />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink to="/login" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <CgLogIn className="text-[18px]" />Login
            </Button>
          </NavLink>

          <NavLink to="/sign-up" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px]" />Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img src="/pattern.webp" alt="" className="w-full fixed top-0 left-0 opacity-5 " />

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/icon.svg" className="m-auto" />
        </div>

        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back!
          <br />
          You can change your password from here
        </h1>


        <br />


        <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              className="w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
    focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              name="email"
              value={formFields.email}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>

          <div className='form-group mb-4 w-full'>
            <h4 className='text-[14px] font-[500] mb-1'> Old Password</h4>
            <div className='relative w-full'>
              <input
                type={isPasswordShow === false ? 'password' : 'text'}
                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
              focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                name="oldPassword"
                value={formFields.oldPassword}
                onChange={onChange}
                disabled={isLoading === true ? true : false}
              />
              <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
              !h-[35px] !min-w-[35px] !text-gray-600" onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {
                  isPasswordShow === false ? (
                    <FaRegEye className='text-[16px] text-blue-600' />
                  ) : (
                    <FaEyeSlash className='text-[16px] text-blue-600' />
                  )}
              </Button>
            </div>
          </div>

          <div className='form-group mb-4 w-full'>
            <h4 className='text-[14px] font-[500] mb-1'> New Password</h4>
            <div className='relative w-full'>
              <input
                type={isPasswordShow === false ? 'password' : 'text'}
                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
              focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChange}
                disabled={isLoading === true ? true : false}
              />
              <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
              !h-[35px] !min-w-[35px] !text-gray-600" onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {
                  isPasswordShow === false ? (
                    <FaRegEye className='text-[16px] text-blue-600' />
                  ) : (
                    <FaEyeSlash className='text-[16px] text-blue-600' />
                  )}
              </Button>
            </div>
          </div>
          <div className='form-group mb-4 w-full'>
            <h4 className='text-[14px] font-[500] mb-1'> Confirm Password</h4>
            <div className='relative w-full'>
              <input
                type={isPasswordShow2 === false ? 'password' : 'text'}
                className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md
              focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChange}
                disabled={isLoading === true ? true : false}
              />
              <Button className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px]
              !h-[35px] !min-w-[35px] !text-gray-600" onClick={() => setIsPasswordShow2(!isPasswordShow2)}>
                {
                  isPasswordShow2 === false ? (
                    <FaRegEye className='text-[16px] text-blue-600' />
                  ) : (
                    <FaEyeSlash className='text-[16px] text-blue-600' />
                  )}
              </Button>
            </div>
          </div>
          <Button
            className="btn-blue btn-lg uppercase w-full"
            type="submit"
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={18} />}
          >
            {isLoading ? "Changing password..." : "Change Password"}
          </Button>

        </form>
      </div>
    </section>
  );
};

export default ChangePassword;