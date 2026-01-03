import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "../../context/MyContext";
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

            <form className="mt-5 ">
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
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
                  />
                </div>
              </div>

              <br />

              <div className="flex items-center gap-4">
                <Button className="btn-org btn-lg w-[100px]">Save</Button>
                <Button className="btn-org btn-border btn-lg w-[100px]">
                  Cancel
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
