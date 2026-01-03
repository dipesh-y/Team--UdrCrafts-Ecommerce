import React, { useState, useContext, useEffect } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { MyContext } from "../../context/MyContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    if (location?.state?.email) setEmail(location.state.email);
  }, [location]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  // const verifyOTP = async (e) => {
  //   e.preventDefault();
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
  //     const res = await postData("/api/user/verifyEmail", { email, otp })
  //     if (res && res.success) {
  //       context.openAlertBox("success", res.message || "Email verified successfully");
  //       navigate('/login');
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

    const actionType = location.state?.actionType;

    if (!email) {
      context.openAlertBox("error", "Missing email to verify.");
      return;
    }

    if (!otp || otp.length < 4) {
      context.openAlertBox("error", "Please enter the complete OTP.");
      return;
    }

    setIsLoading(true);

    try {
      let res;

      if (actionType === "forgot-password") {
        // Forgot password OTP
        res = await postData("/api/user/verify-forgot-password-otp", {
          email,
          otp,
        });
      } else {
        //  Normal email verification
        res = await postData("/api/user/verifyEmail", {
          email,
          otp,
        });
      }

      if (res?.success) {
        context.openAlertBox("success", res.message || "Verification successful");

        if (actionType === "forgot-password") {
          navigate("/forgot-password", { state: { email } });
          return; //  STOP HERE
        }

        navigate("/login");
      } else {
        context.openAlertBox("error", res.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", "Verification failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/verify3.png" width="80" />
          </div>

          <h3 className="text-center text-[18px] text-black mt-4 mb-1">Verify OTP</h3>

          <p className="text-center mt-0 mb-5">
            OTP sent to {" "}
            <span className="text-primary font-bold">{email || 'your email'}</span>
          </p>

          <form onSubmit={verifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items center justify-center mt-5 px-3">
              <Button type="submit" className="w-full btn-org btn-lg" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
