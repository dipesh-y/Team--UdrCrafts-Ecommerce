import React, { useContext } from 'react'
import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import Button from "../../components/Button";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import MyContext from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils copy/api';
import OtpBox from '../../components/OtpBox';
import { useLocation } from "react-router-dom";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const location = useLocation();
  const email = location.state?.email || "";

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const context = useContext(MyContext);


  // const verifyOTP = async (e) => {
  //   e.preventDefault();

  //   const actionType = location.state?.actionType;

  //   if (!email) {
  //     context.openAlertBox("error", "Missing email to verify.");
  //     return;
  //   }

  //   if (!otp || otp.length < 4) {
  //     context.openAlertBox("error", "Please enter the complete OTP.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     let res;

  //     if (actionType === "forgot-password") {
  //       // Forgot password OTP
  //       res = await postData("/api/user/verify-forgot-password-otp", {
  //         email,
  //         otp,
  //       });
  //     } else {
  //       //  Normal email verification
  //       res = await postData("/api/user/verifyEmail", {
  //         email,
  //         otp,
  //       });
  //     }

  //     if (res?.success) {
  //       context.openAlertBox("success", res.message || "Verification successful");

  //       if (actionType === "forgot-password") {
  //         navigate("/forgot-password", { state: { email } });
  //         return; //  STOP HERE
  //       }

  //       navigate("/login");
  //     } else {
  //       context.openAlertBox("error", res.message || "Invalid OTP");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     context.openAlertBox("error", "Verification failed. Try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



const verifyOTP = async (e) => {
    e.preventDefault();
    const email = location.state?.email || "";
    const actionType = location.state?.actionType || "verify-email";

    if (!email) {
      context.alertBox("error", "Missing email to verify.");
      return;
    }

    if (!/^\d{4,6}$/.test(otp)) {
      context.alertBox("error", "Please enter a valid OTP.");
      return;
    }

    setIsLoading(true);

    try {
      let res;

      if (actionType === "forgot-password") {
        res = await postData("/api/user/verify-forgot-password-otp", {
          email,
          otp,
        });
      } else {
        res = await postData("/api/user/verifyEmail", {
          email,
          otp,
        });
      }

      if (res?.success) {
        context.alertBox("success", res.message || "Verification successful");

        if (actionType === "forgot-password") {
          navigate("/change-password", { state: { email } });
          return;
        }

        navigate("/login");
      } else {
        context.alertBox("error", res?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      context.alertBox("error", "Invalid OTP , Please Try Again ");
    } finally {
      setIsLoading(false);
    }
  }

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
          <img src="/verified-icon-3d-rendering-illustration-vector.jpg" className="w-[100px] m-auto" />
        </div>

        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back!
          <br />
          Please Verify your Email
        </h1>

        <br />
        <p className="text-center text-[15px]">OTP send to  &nbsp;
          <span className="text-primary font-bold">{email}</span>
        </p>


        <br />
        {/* 
        <div className="text-center flex items-center justify-center flex-col">
          <OtpBox length={6} onChange={handleOtpChange}/>
        </div>

        <br />
        <div className="w-[300px] m-auto">
          <Button className="btn-blue w-full">Verify OTP</Button>
        </div>
 */}
        <form onSubmit={verifyOTP}>
          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange} />
          </div>

          <br/>
          <div className="w-[300px] m-auto">
            <Button type="submit" className="btn-blue w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </form>


      </div>
    </section>
  );
};

export default VerifyAccount;