import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../context/MyContext";
import { postData } from "../../utils/api";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = () => {
    context.openAlertBox("success", "Redirecting to Forgot Password");
    navigate("/forgot-password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.email.trim() || !formFields.password.trim()) {
      context.openAlertBox("error", "Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/user/login", formFields, {
        withCredentials: true,
      });

      if (res?.success) {
        context.openAlertBox("success", res.message || "Login successful");

        context.setIsLogin?.(true);

        if (res?.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        context.setUserData?.(res?.data?.user || res?.data);

        navigate("/");
      } else {
        context.openAlertBox("error", res?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      context.openAlertBox("error", "Something went wrong. Try again.");
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
                name="email"
                label="Email Id *"
                className="w-full"
                value={formFields.email}
                onChange={onChange}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                name="password"
                label="Password *"
                type={isPasswordShow ? "text" : "password"}
                className="w-full"
                value={formFields.password}
                onChange={onChange}
              />

              <Button
                type="button"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute top-[8px] right-[8px] !w-[35px] !h-[35px]"
              >
                {isPasswordShow ? (
                  <IoMdEye className="text-[22px]" />
                ) : (
                  <IoMdEyeOff className="text-[22px]" />
                )}
              </Button>
            </div>

            <button
              type="button"
              onClick={forgotPassword}
              className="link cursor-pointer text-[15px] font-[600]"
            >
              Forgot Password?
            </button>

            <Button
              className="btn-org w-full btn-lg mt-3"
              type="submit"
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={18} />}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center mt-3">
              Not Registered?{" "}
              <Link
                className="text-[14px] font-[600] text-primary"
                to="/register"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center font-[500] mt-2">
              Or continue with social account
            </p>

            <Button
              disabled={isLoading}
              className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black mt-2"
              type="button"
            >
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
