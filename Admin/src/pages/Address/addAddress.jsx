import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import MyContext from "../../context/MyContext";
import { postData } from "../../utils copy/api";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddAddress = () => {
    const context = useContext(MyContext);
    const {userData} = context;
    const{ setIsOpenFullScreenPanel, openAlertBox } = context;

    const [formFields, setFormFields] = useState({
        address_line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        status: "",
        // userId: context?.userData?._id
    });

    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    // useEffect(()=>{
    //     setFormFields((prevState)=>({
    //         ...prevState,
    //         userId: context?.userData?._id
    //     }))
          
      

    // },[context?.userData]);

    //  useEffect(()=>{
    //      fetchDataFromApi('/api/address/get?${FormFields.userId}').then((res)=>{
    //         console.log(res)
    //     })
    //  },[])
    

   


      const handleChangeStatus = (event) => {
        const value = event.target.value;
        setStatus(value);
        setFormFields(prev => ({ ...prev, status: value }));
    };


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("FORM DATA:", formFields);
           
        postData('/api/address/add',formFields,{withCredentials:true}).then((res)=>{
            console.log(res)
            if(res?.error !==true){
                setIsLoading(false);
                context.alertBox("Success", res?.data?.message);

                context?.setIsOpenFullScreenPanel({
                    open:false
                })
                   fetchDataFromApi(
      `/api/address/get?userId=${context.userData._id}`
    ).then((res) => {
      context?.setAddress(res.data);
    })
      
               
            } else{
                context.alertBox("error",res?.data?.message);
                setIsLoading(false);
            }
        })

        console.log("PHONE:", phone);
        console.log("STATUS:", status);
        console.log("USER:", userData);

        if (!formFields.address_line1.trim()) {
            openAlertBox?.("error", "Address Line 1 is required");
            return;
        }

        try {
            const payload = {
                ...formFields,
                mobile: phone,
                status: status,
                userId: userData?._id,
            };

            console.log("FINAL PAYLOAD:", payload); 

            const res = await postData("/api/address/add", payload);

            console.log("API RESPONSE:", res); 

            if (!res?.error) {
                openAlertBox?.("success", "Address added successfully");
                setIsOpenFullScreenPanel({ open: false });
            } else {
                openAlertBox?.("error", res.message);
            }
        } catch (err) {
            console.error("API ERROR:", err);
            openAlertBox?.("error", "Failed to add address");
        }
    };



    return (
        <section
            className="p-5 bg-gray-50 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-md shadow"
            >
                <div className="max-h-[70vh] overflow-y-auto space-y-4">

                    {/* Address + City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Address Line 1 </label>
                            <input type="text"
                                name="address_line1"
                                value={formFields.address_line1}
                                onChange={onChange}
                                disabled={isLoading}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                                placeholder="Enter address"
                                
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">City</label>
                            <input type="text"
                                name="city"
                                value={formFields.city}
                                onChange={onChange}
                                disabled={isLoading}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* State + Pincode + Country */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formFields.state}
                                onChange={onChange}
                                disabled={isLoading}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formFields.pincode}
                                onChange={onChange}
                                disabled={isLoading}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formFields.country}
                                onChange={onChange}
                                disabled={isLoading}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Mobile No</label>
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                onChange={(value) => {
                                    setPhone(value);
                                    setFormFields(prev => ({ ...prev, mobile: value }));
                                }}

                                disabled={isLoading===true ? true : false}
                            />
                        </div>

                        <div className="col w-[100%]">
                            <h3 className="text-[14px] font-[[500] mb-1 text-black">Status</h3>
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }} size="small" className="w-full">
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        className="w-full flex gap-2 mt-4"
                    >
                        <FaCloudUploadAlt />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddAddress; 