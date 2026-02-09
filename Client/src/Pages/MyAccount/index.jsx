import React, { useContext, useEffect, useState } from "react";
import { editData, postData } from "../../utils/api.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar/index.jsx";
import { Collapse } from "react-collapse";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const navigate = useNavigate();
  const { userData, setUserData, openAlertBox, isLogin } =
    useContext(MyContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] =
    useState(false);
      const [phone, setPhone] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ------------------ AUTH GUARD ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/login");
  }, [isLogin, navigate]);

  /* ------------------ LOAD USER ------------------ */
  useEffect(() => {
    if (!userData?._id) return;

    setUserId(userData._id);
    setFormFields({
      name: userData.name || "",
      email: userData.email || "",
      mobile: userData.mobile || "",
    });
    setPhone(userData.mobile ? `+${userData.mobile}` : "");
  }, [userData]);

  /* ------------------ INPUT HANDLER ------------------ */
  const onchangeInput = (e) => {
    const { name, value } = e.target;

    if (name in formFields) {
      setFormFields((prev) => ({ ...prev, [name]: value }));
    }

    if (name in changePassword) {
      setChangePassword((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ------------------ VALIDATION ------------------ */
  const valideProfile =
    formFields.name && formFields.email && formFields.mobile;

  /* ------------------ UPDATE PROFILE ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valideProfile) {
      openAlertBox("error", "Please fill all profile fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await editData(`/api/user/${userId}`, formFields);

      if (!res?.error) {
        setUserData(res?.data?.user);
        openAlertBox("success", "Profile updated successfully");
      } else {
        openAlertBox("error", res?.data?.message);
      }
    } catch {
      openAlertBox("error", "Profile update failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------ CHANGE PASSWORD ------------------ */
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = changePassword;

    if (!oldPassword || !newPassword || !confirmPassword) {
      openAlertBox("error", "All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      openAlertBox("error", "Passwords do not match");
      return;
    }

    setIsLoading2(true);
    try {
      const res = await postData(`/api/user/reset-password`, {
        oldPassword,
        newPassword,
      });

      if (!res?.error) {
        openAlertBox("success", "Password changed successfully");
        setIsChangePasswordFormShow(false);
        setChangePassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        openAlertBox("error", res?.message);
      }
    } catch (err) {
      openAlertBox(
        "error",
        err?.response?.data?.message || "Password change failed"
      );
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="w-full lg:w-[50%]">
          {/* PROFILE CARD */}
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center">
              <h2 className="text-[20px] font-[600]">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() =>
                  setIsChangePasswordFormShow((prev) => !prev)
                }
              >
                {isChangePasswordFormShow ? "Cancel" : "Change Password"}
              </Button>
            </div>
            <hr className="my-4" />

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  label="Full Name"
                  name="name"
                  value={formFields.name}
                  onChange={onchangeInput}
                  size="small"
                  fullWidth
                />

                <TextField
                  label="Email"
                  value={formFields.email}
                  disabled
                  size="small"
                  fullWidth
                />

               <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setFormFields((prev) => ({ ...prev, mobile: value }));
                  }}
                  disabled={isLoading}
                />
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="!bg-orange-600 !text-white hover:!bg-black"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>



          

          {/* CHANGE PASSWORD */}
          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <h2 className="text-[20px] font-[600] mb-4">
                Change Password
              </h2>

              <form onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TextField
                    label="Old Password"
                    type="password"
                    name="oldPassword"
                    value={changePassword.oldPassword}
                    onChange={onchangeInput}
                    size="small"
                    fullWidth
                  />

                  <TextField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={changePassword.newPassword}
                    onChange={onchangeInput}
                    size="small"
                    fullWidth
                  />

                  <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={changePassword.confirmPassword}
                    onChange={onchangeInput}
                    size="small"
                    fullWidth
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    className="!bg-orange-600 !text-white hover:!bg-black"
                    disabled={isLoading2}
                  >
                    {isLoading2 ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
