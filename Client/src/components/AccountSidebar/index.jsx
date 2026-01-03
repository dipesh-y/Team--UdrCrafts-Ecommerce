import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import CircularProgress from "@mui/material/CircularProgress";
import { editData } from "../../utils/api";

const AccountSidebar = () => {

      const [previews, setPreviews] = useState([]);
      const[uploading, setUploading]= useState(false);
      const context = userContext(MyContext);

       useEffect(()=>{
        const userAvtar = [];
        if(context?.userData?.avatar !=="" && context?.userData?.avatar !==undefined){

        userAvtar.push(context?.userData?.avatar);
        setPreviews(userAvtar)
}
       },[context?.userData])

      let img_arr=[];
      let uniqueArray=[];
      let selectedImages = [];
      const formdata = new FormData();
      const onchangeFile = async(e,apiEndPoint)=>{
         try{
             setPreviews([]);
            
             const files = e.target.files;
             setUploading(true);
             console.log(files);
             for(var i= 0; i<files.length; i++){
              if(
                     files[i]
                     &&

                     (
                      files[i].type === "image/jpeg" ||
                       files[i].type === "image/jpeg" ||
                        files[i].type === "image/png" ||
                         files[i].type === "image/webp" )

                     
              ){
                  const file =files[i];
                  selectedImages.push(file);
                  formdata.append('avatar', file);

                //  editData("/api/user/user-avatar",formdata).then((res))=>{
                //         console.log(res)
                //     })
                  editData("/api/user/user-avatar", formdata)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

              } else{
                context.alertBox("error","Please select a valid JPG or PNG image file.");
                 setUploading(false);
                return false;
              }
             }
             editData("/api/user/user-avatar",formdata).then((res)=>{
              setUploading(false);
              
              avatar.push(res?.data?.avtar);
                setPreviews(avatar);
              console.log(res)
             })
         } catch (error){
          console.log(error);
         }
      }

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group
        flex item-center justify-center bg-grey-200">
             {
              uploading===true ? <CircularProgress color="inherit"/> :
              <>
              {
                previews?.length!==0 && previews?.map((img,index)=>{
                  // console.log(img);
                  return(
                        
            <img
              src={img}
              key={index}
            className="w-full h-full object-cover"
          /> 
                  )
                }) 

              
              
              
          }
              </>
              

              
          
           }
            
          
          {/* // <img
          //   src="https://thumbs.dreamstime.com/b/portrait-happy-ambitious-indian-top-
          //                   manager-modern-office-businessman-proud-career-achievement-
          //                   smiling-young-man-339154938.jpg"
          //   className="w-full h-full object-cover"
          /> */}
          <CircularProgress color="inherit"/>
          <div
            className="overlay w-[100%] h-[100%] absolute
                             top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center
                              justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100"
          >
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              on change={(e)=>
                onchangeFile(e,"/api/user/user-avatar")
              }
              name="avatar"
            />
          </div>
        </div>
        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="w-full !text-left !py-2 !px-3 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <FaRegUser className="text-[15px]" />
              My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-list" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="w-full !text-left !py-2  !px-3 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoMdHeartEmpty className="text-[17px]" /> My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="w-full !text-left !py-2  !px-3 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoBagCheckOutline className="text-[17px]" />
              My Orders
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/logout" className={({ isActive }) => (isActive ? "isActive" : undefined)}>
            <Button className="w-full !text-left !py-2  !px-3 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoIosLogOut className="text-[17px]" />
              Logout
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
