import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar/index.jsx";
import Radio from "@mui/material/Radio";
import MyContext from "../../context/MyContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "react-international-phone/style.css";
import { postData, fetchDataFromApi } from "../../utils/api.js";

const Address = () => {
  const context = useContext(MyContext);

  const [address, setAddress] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  
  const [isOpenModel, setisOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "false",
    
  });

  /* ================= FETCH ADDRESS ================= */
 useEffect(() => {
  const userId = context?.userData?._id;

  if (!userId) return; // ⛔ wait until userId exists

  fetchDataFromApi(`/api/address/get`)
    .then((res) => {
      const list = res?.data || [];
      setAddress(list);

      if (list.length > 0) {
        setSelectedValue(list[0]._id);
      }
    });
}, [context?.userData?._id]); // ✅ dependency MUST be userId


  /* ================= FORM HANDLERS ================= */
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  

  /* ================= SUBMIT ADDRESS ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formFields.address_line1.trim()) {
      context?.openAlertBox?.("error", "Address Line 1 is required");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formFields,
        mobile: phone,
        
        userId: context?.userData?._id,
      };

      const res = await postData("/api/address/add", payload);

      if (res?.error !== true) {
        context?.openAlertBox?.("success", "Address added successfully");
        setisOpenModel(false);

        // 🔄 Refresh list
        const response = await fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`
        );

        const list = response?.data || [];
        setAddress(list);

        if (list.length > 0) {
          setSelectedValue(list[0]._id);
        }
      } else {
        context?.openAlertBox?.("error", res?.message || "Error adding address");
      }
    } catch (err) {
      context?.openAlertBox?.("error", "Failed to add address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[20%]">
            <AccountSidebar />
          </div>

          <div className="w-full lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md">
              <h2 className="text-[20px] font-[600]">Address</h2>
              <hr className="my-3" />

              {/* ADD ADDRESS */}
              <div
                className="mb-4 flex items-center justify-center p-5 border border-dashed bg-[#f1faff] cursor-pointer hover:bg-[#e1f1ff]"
                onClick={() => setisOpenModel(true)}
              >
                <span className="text-[14px] font-[500]">Add Address</span>
              </div>

              {/* ADDRESS LIST */}
              <div className="flex flex-col gap-3">
                {address.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">
                    No address found
                  </p>
                )}

                {address.map((item) => (
                  <div
                    key={item._id}
                    className="addressBox flex items-center gap-2 bg-[#f1f1f1] p-3 rounded-md border border-dashed cursor-pointer"
                    onClick={() => setSelectedValue(item._id)}
                  >
                    <Radio
                      checked={selectedValue === item._id}
                      onChange={() => setSelectedValue(item._id)}
                    />

                    <span className="text-[12px]">
                      {item.address_line1}, {item.city}, {item.state},{" "}
                      {item.country} - {item.pincode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADD ADDRESS MODAL ================= */}
      <Dialog open={isOpenModel} onClose={() => setisOpenModel(false)}>
        <DialogTitle>Add Address</DialogTitle>

        <form className="p-8 py-3" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Address Line 1"
            size="small"
            name="address_line1"
            value={formFields.address_line1}
            onChange={onChange}
            className="mb-4 gap-4"
          />

          <div className="flex gap-4 mb-4">
            <TextField
              label="City"
              size="small"
              name="city"
              value={formFields.city}
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="State"
              size="small"
              name="state"
              value={formFields.state}
              onChange={onChange}
              fullWidth
            />
          </div>

          <div className="flex gap-4 mb-4">
            <TextField
              label="Pincode"
              size="small"
              name="pincode"
              value={formFields.pincode}
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="Country"
              size="small"
              name="country"
              value={formFields.country}
              onChange={onChange}
              fullWidth
            />
          </div>

          <div className="flex gap-4 mb-4">
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={(value) => setPhone(value)}
              disabled={isLoading}
            />

            <Select
              value={formFields.status}
              onChange={(e) =>
                setFormFields(prev => ({ ...prev, status: e.target.value }))
              }
              size="small"
              fullWidth
            >
              <MenuItem value={true}>Default</MenuItem>
              <MenuItem value={false}>Secondary</MenuItem>
            </Select>

          </div>

          <div className="flex gap-4">
            <Button type="submit" className="btn-org w-full">
              Save
            </Button>
            <Button
              className="btn-border w-full"
              onClick={() => setisOpenModel(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
