import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { uploadImage, editData, postData } from "../../utils copy/api";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";

const Profile = () => {
  const { userData, setUserData, openAlertBox, setIsOpenFullScreenPanel } = useContext(MyContext);
  const navigate = useNavigate();

  /* ------------------ States ------------------ */
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [phone, setPhone] = useState("");
  const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });



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

  /* ------------------ Auth Guard ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ------------------ Load User ------------------ */
  useEffect(() => {
    if (!userData?._id) return;

    setUserId(userData._id);

    setFormFields({
      name: userData.name || "",
      email: userData.email || "",
      mobile: userData.mobile ? `+${userData.mobile}` : "",
    });

    setPhone(userData.mobile ? `+${userData.mobile}` : "");

    if (userData.avatar) {
      setPreviews([userData.avatar]);
    }
  }, [userData]);

  /* ------------------ Avatar Upload ------------------ */
  const onChangeFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      openAlertBox("error", "Only image files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);

    try {
      const res = await uploadImage("/api/user/user-avatar", formData);
      const avatarUrl = res?.data?.avatar;

      if (avatarUrl) {
        setPreviews([`${avatarUrl}?t=${Date.now()}`]); // cache bust
        setUserData((prev) => ({ ...prev, avatar: avatarUrl }));
        alertBox("success", "Avatar updated successfully");
      }
    } catch {
      openAlertBox("error", "Avatar upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ------------------ Input Change ------------------ */
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const onChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------ Validation ------------------ */
  const valideValue =
    formFields.name.trim() !== "" &&
    formFields.email.trim() !== "" &&
    formFields.mobile.trim() !== "";

  /* ------------------ Submit Profile ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valideValue) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await editData("/api/user/update-profile", {
        name: formFields.name,
        email: formFields.email,
        mobile: formFields.mobile,
      });

      if (!res?.error) {
        setUserData(res.user);

        setSnackbar({
          open: true,
          message: res.message, 
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: res.message,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------ Change Password ------------------ */
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    if (!changePassword.oldPassword) {
      setSnackbar({
        open: true,
        message: "Please enter old password",
        severity: "error",
      });
      return;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Password and Confirm Password do not match",
        severity: "error",
      });
      return;
    }

    setIsLoading2(true);

    try {
      const res = await postData("/api/user/reset-password", {
        email: formFields.email,
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword,
      });



      if (!res?.error) {
        setSnackbar({
          open: true,
          message: "Password changed successfully",
          severity: "success",
        });

        setChangePassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setIsChangePasswordFormShow(false); // auto close form
      }
      else {
        setSnackbar({
          open: true,
          message: res.message,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          "Password change failed. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: "8px", fontWeight: 500 }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>


      <div className="card my-4 pt-5 w-[65%] shadow-md rounded-lg bg-white px-5 pb-5">
        <h2 className="text-[18px] font-[600] mb-4">User Profile</h2>
        <div className="mt-4 flex justify-end">
          <Button
            variant="text"
            color="primary"
            onClick={() =>
              setIsChangePasswordFormShow((prev) => !prev)
            }
          >
            {isChangePasswordFormShow ? "Cancel" : "Change Password"}
          </Button>
        </div>


        {/* Avatar */}
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-6 relative group flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress />
          ) : (
            <img
              src={previews[0] || "/user.png"}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          )}

          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <FaCloudUploadAlt className="text-white text-[25px]" />
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={onchangeInput}
              className="border p-2 rounded"
              placeholder="Full Name"
              disabled={isLoading}
            />

            <input
              type="email"
              name="email"
              value={formFields.email}
              className="border p-2 rounded bg-gray-100"
              disabled
            />
          </div>

          <div className="mt-4 w-[50%]">
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
          <br />
          {!isChangePasswordFormShow && (
  <div
    className="flex item-center justify-center p-5 border border-dashed
    border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
    onClick={() =>
      setIsOpenFullScreenPanel({
        open: true,
        model: "Add New Address",
      })
    }
  >
    <span className="text-[14px] font-[500]">Add Address</span>
  </div>
)}

          <br />
          <div className="mt-6">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!valideValue || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "UPDATE PROFILE"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <Collapse isOpened={isChangePasswordFormShow}>
        <div className="card w-[65%] bg-white p-5 shadow-md rounded-md mt-6">
          <h2 className="text-[20px] font-[600] mb-4">Change Password</h2>

          <form onSubmit={handleSubmitChangePassword}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextField
                type="password"
                label="Old Password"
                name="oldPassword"
                value={changePassword.oldPassword}
                onChange={onChangePasswordInput}
                disabled={isLoading2}
                size="small"
                fullWidth
              />

              <TextField
                type="password"
                label="New Password"
                name="newPassword"
                value={changePassword.newPassword}
                onChange={onChangePasswordInput}
                disabled={isLoading2}
                size="small"
                fullWidth
              />

              <TextField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={onChangePasswordInput}
                disabled={isLoading2}
                size="small"
                fullWidth
              />
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading2}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
