import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="name"
                label="Full Name*"
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                id="password"
                label="Password *"
                variant="outlined"
                type={isPasswordShow ? "text" : "password"}
                className="w-full"
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

            {/* <a className='link cursor-pointer text-[15px] font-[600]'> Forget Password?</a> */}

            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org w-full btn-lg">Register</Button>
            </div>
            <p className="text-center">
              Alredy have an account?{" "}
              <Link
                className="link text-[14px] font-[600] text-primary"
                to="/login"
              >
                Login{" "}
              </Link>
            </p>

            <p className=" text-center font-[500]">
              {" "}
              Or continue with a social account
            </p>

            <Button className="flex gap-3 w-full  !bg-[#f1f1f1] btn-lg !text-black">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
