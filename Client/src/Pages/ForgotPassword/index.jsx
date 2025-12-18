import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../context/MyContext";

const ForgotPassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);

  const context = useContext(MyContext);
  const histoty = useNavigate();

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Forgot Password
          </h3>

          <form className="w-full mt-5">
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? "text" : "password"}
                id="password"
                label=" New Password *"
                variant="outlined"
                className="w-full"
                name="name"
              />

              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute top-[8px] !text-black right-[8px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full"
              >
                {isPasswordShow ? (
                  <IoMdEye className="opacity-75 text-[25px]" />
                ) : (
                  <IoMdEyeOff className="opacity-75 text-[25px]" />
                )}
              </Button>
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                id="confirm_password"
                label=" Confirm Password *"
                variant="outlined"
                type={isPasswordShow2 ? "text" : "password"}
                className="w-full"
                name="password"
              />

              <Button
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
                className="!absolute top-[8px] !text-black right-[8px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full"
              >
                {isPasswordShow2 ? (
                  <IoMdEye className="opacity-75 text-[25px]" />
                ) : (
                  <IoMdEyeOff className="opacity-75 text-[25px]" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org w-full btn-lg">Change Password</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
