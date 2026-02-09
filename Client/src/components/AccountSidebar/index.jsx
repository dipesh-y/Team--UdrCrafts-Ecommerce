import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";

import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";

import { MyContext } from "../../context/MyContext";
import { uploadImage } from "../../utils/api";

const AccountSidebar = () => {
  const context = useContext(MyContext);

  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Load existing avatar
  useEffect(() => {
    if (context?.userData?.avatar) {
      setPreviews([context.userData.avatar]);
    }
  }, [context?.userData?.avatar]);

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
    ) {
      context.alertBox("error", "Please select a valid image file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await uploadImage("/api/user/user-avatar", formData);

      if (res?.data?.avatar) {
        setPreviews([res.data.avatar]);
      }
    } catch (error) {
      console.log(error);
      context.alertBox("error", "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {uploading ? (
            <CircularProgress size={40} />
          ) : (
            <img
              src={previews[0] || "/user.png"}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          )}

          {/* Upload overlay */}
          <div className="overlay absolute inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer reminder">
            <FaCloudUploadAlt className="text-white text-[25px]" />
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
        </div>


        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]">
          {context?.userData?.email}
        </h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li>
          <NavLink to="/my-account">
            <Button className="w-full !justify-start gap-2">
              <FaRegUser /> My Profile
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/address">
            <Button className="w-full !justify-start gap-2">
              <LuMapPin /> Address
            </Button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-list">
            <Button className="w-full !justify-start gap-2">
              <IoMdHeartEmpty /> My List
            </Button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-orders">
            <Button className="w-full !justify-start gap-2">
              <IoBagCheckOutline /> My Orders
            </Button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/logout">
            <Button className="w-full !justify-start gap-2">
              <IoIosLogOut /> Logout
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
