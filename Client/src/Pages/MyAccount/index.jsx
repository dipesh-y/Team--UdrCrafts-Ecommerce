<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> 8ba69ef (changes in accountsiderbar & myaccount)
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../context/MyContext";
<<<<<<< HEAD
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
const MyAccount = () => {

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(()=>{
      alert(context?.isLogin)
      if(context?.isLogin==false){
        setTimeout(()=>{
           history("/");
        },2000);
       
      }
    
      const token =localStorage.getItem("accessToken");
      if(token==null){
        history("/");
      }
     console.log(token)
    },[context?.isLogin])
    
//     useEffect(() => {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     history("/");
//     return;
//   }

//   if (context?.isLogin === false) {
//     history("/");
//   }
// }, [context?.isLogin, history]);

    
=======
import { useNavigate } from "react-router-dom";
import { editData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";


const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const { setUserData, openAlertBox, setIsLogin } = useContext(MyContext);


const context = useContext(MyContext);
const navigate = useNavigate();

useEffect(() => {

  const token = localStorage.getItem("accessToken");
  if (token === null){
    navigate("/");
  }
},[context?.isLogin]);

useEffect(() => {
    if(context?.userData?._id !== "" && context?.userData?._id !== undefined){
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile
      })
    }
  }, [context?.userData]);


 const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.name === "") {
      openAlertBox("error", "Please enter Full Name");
      return;
    }

    if (!formFields.email === "") {
      openAlertBox("error", "Please enter email id");
      return;
    }

    if (!formFields.moblie === "") {
      openAlertBox("error", "Please enter mobile number");
      return;
    }

    setIsLoading(true);

    try {
      const res = await editData(`/api/user/${userId}`, formFields, {
        withCredentials: true,
      });
console.log(res);
      if (res?.success) {
        openAlertBox("success", res?.data?.message );

        setIsLogin(false);
       

      } else {
        openAlertBox("error", res?.data?.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      openAlertBox("error", "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

>>>>>>> 8ba69ef (changes in accountsiderbar & myaccount)

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3"> My Profile</h2>
            <hr />

            <form className="mt-5 " onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                onChange={onChange}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                  type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                onChange={onChange}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="mobile"
                    value={formFields.mobile}
                onChange={onChange}
                  />
                </div>
              </div>

              <br />

              <div className="flex items-center gap-4">
                <Button className="btn-org  btn-sm w-[150px]"
                type="submit"
                              disabled={isLoading}
                              startIcon={isLoading && <CircularProgress size={18} /> }
                >
                                {isLoading ? "Updating..." : "Update Profile"}

                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyAccount;
