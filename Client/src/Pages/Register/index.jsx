import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../context/MyContext"; 
const Register = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
const isFormValid = Object.values(formFields).every((el) => String(el).trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formFields.name ===""){
      context.openAlertBox("error","Please enter full name");
      return false;
    }
    if(formFields.email ===""){
      context.openAlertBox("error","Please enter email id");
      return false;

    }
    if(formFields.password === ""){
      context.openAlertBox("error","Please enter password");
      return false;
    }
    setIsLoading(true);
    try {
      const response = await postData("/api/register", formFields);
      console.log("register response", response);
      context.openAlertBox("success", "Registration successful. Please verify your email.");
      navigate('/verify', { state: { email: formFields.email } });
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Registration failed. Please try again.");
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
                type="text"
                id="name"
                name="name"
                label="Full Name*"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
                value={formFields.name}
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
                value={formFields.email}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                id="password"
                name="password"
                label="Password *"
                variant="outlined"
                type={isPasswordShow ? "text" : "password"}
                className="w-full"
                onChange={onChangeInput}
                value={formFields.password}
              />

              <Button
                onClick={() => setIsPasswordShow(!isPasswordShow)}
                className="!absolute top-[8px] !text-black right-[8px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full"
                type="button"
              >
                {isPasswordShow ? (
                  <IoMdEye className="opacity-75 text-[25px]" />
                ) : (
                  <IoMdEyeOff className="opacity-75 text-[25px]" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`btn-org w-full btn-lg ${isLoading ? 'opacity-60' : ''}`}
                startIcon={isLoading ? <CircularProgress size={18} /> : null}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
            <p className="text-center">
              Alredy have an account? {" "}
              <Link className="link text-[14px] font-[600] text-primary" to="/login">
                Login {" "}
              </Link>
            </p>

            <p className=" text-center font-[500]"> Or continue with a social account</p>

            <Button className="flex gap-3 w-full  !bg-[#f1f1f1] btn-lg !text-black" type="button">
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
