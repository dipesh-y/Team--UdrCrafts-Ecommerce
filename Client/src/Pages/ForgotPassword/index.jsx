import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { postData } from "../../utils/api";


const ForgotPassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

   const [formFields, setFormFields] = useState({
    email: "",
      newPassword: "",
      confirmPassword: "",
    });


      const {  openAlertBox } = useContext(MyContext);

    useEffect(() => {
  if (location.state?.email) {
    setFormFields((prev) => ({
      ...prev,
      email: location.state.email,
    }));
  } else {
    navigate("/forgot-password"); // safety redirect
  }
}, []);

    
  

   const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

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


  
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Forgot Password
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? "text" : "password"}
                id="password"
                label=" New Password *"
                variant="outlined"
                className="w-full"
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChange}
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
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChange}
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

            <Button
              className="btn-org w-full btn-lg mt-3"
              type="submit"
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={18} />}
            >
              {isLoading ? "Changing password..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
