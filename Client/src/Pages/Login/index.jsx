import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../context/MyContext";
import { postData } from "../../utils/api";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = () => {
    context.openAlertBox("success", "OTP sent (use Forgot Password flow)");
    navigate("/forgot-password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.email || !formFields.password) {
      context.openAlertBox("error", "Please enter email and password");
      return;
    }
    setIsLoading(true);
    try {
      const res = await postData('/api/login', formFields);
      if (res && res.success) {
        context.openAlertBox('success', res.message || 'Login successful');
        if (typeof context.setIsLogin === 'function') context.setIsLogin(true);
        navigate('/');
      } else {
        context.openAlertBox('error', res.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox('error', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Login to your account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
                name="email"
                onChange={onChange}
                value={formFields.email}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                id="password"
                label="Password *"
                variant="outlined"
                type={isPasswordShow ? "text" : "password"}
                className="w-full"
                name="password"
                onChange={onChange}
                value={formFields.password}
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

            <a className="link cursor-pointer text-[15px] font-[600]" onClick={forgotPassword}>
              Forget Password?
            </a>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org w-full btn-lg" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <p className="text-center">
              Not Registered?{" "}
              <Link
                className="link text-[14px] font-[600] text-primary"
                to="/register"
              >
                Sign Up{" "}
              </Link>
            </p>
            <p className=" text-center font-[500]">
              {" "}
              Or continue with social account
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
