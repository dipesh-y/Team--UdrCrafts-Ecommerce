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
    const { userData, setIsOpenFullScreenPanel, openAlertBox } = context;

    const [formData, setFormData] = useState({
        address_line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        status: "",
        userId: context?.userData?._id
    });

    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const handleChangeStatus = (event) => {
        const value = event.target.value;
        setStatus(value);
        setFormData(prev => ({ ...prev, status: value }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("FORM DATA:", formData);
        console.log("PHONE:", phone);
        console.log("STATUS:", status);
        console.log("USER:", userData);

        if (!formData.address_line1.trim()) {
            openAlertBox?.("error", "Address Line 1 is required");
            return;
        }

        try {
            const payload = {
                ...formData,
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
                                value={formData.address_line1}
                                onChange={handleChange}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                                placeholder="Enter address"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">City</label>
                            <input type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
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
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full h-[40px] border rounded p-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full h-[40px] border rounded p-2 text-sm"
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
                                    setFormData(prev => ({ ...prev, mobile: value }));
                                }}

                                disabled={isLoading}
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
