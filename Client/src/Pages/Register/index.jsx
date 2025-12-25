import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../context/MyContext";

const Register = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formFields).every(
    (el) => el.trim() !== ""
  );

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formFields.name.trim()) {
    context.openAlertBox("error", "Please enter full name");
    return;
  }

  if (!formFields.email.trim()) {
    context.openAlertBox("error", "Please enter email id");
    return;
  }

  if (!formFields.password.trim()) {
    context.openAlertBox("error", "Please enter password");
    return;
  }

  setIsLoading(true);

  try {
    const response = await postData("/api/user/register", formFields);

    if (response?.success) {
      context.openAlertBox(
        "success",
        "Registration successful. Please verify your email."
      );
      navigate("/verify", { state: { email: formFields.email } });
    } else {
      context.openAlertBox(
        "error",
        response?.message || "Registration failed"
      );
    }
  } catch (error) {
    console.error("Register Error:", error);
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
            Register with a new account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                name="name"
                label="Full Name *"
                className="w-full"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                name="email"
                label="Email Id *"
                className="w-full"
                value={formFields.email}
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                name="password"
                label="Password *"
                type={isPasswordShow ? "text" : "password"}
                className="w-full"
                value={formFields.password}
                onChange={onChangeInput}
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

            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="btn-org w-full btn-lg"
              startIcon={isLoading && <CircularProgress size={18} />}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link className="text-primary font-[600]" to="/login">
                Login
              </Link>
            </p>

            <p className="text-center font-[500] mt-2">
              Or continue with a social account
            </p>

            <Button
              disabled={isLoading}
              className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black mt-3"
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

export default Register;
