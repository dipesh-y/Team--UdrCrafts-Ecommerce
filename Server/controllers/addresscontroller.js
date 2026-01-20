import AddressModel from "../models/addressmodel.js";
import UserModel from "../models/usermodel.js";

export const addAddressController = async (req, res) => {
  try {
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
    } = req.body;

    if (
      !address_line1 ||
      !city ||
      !state ||
      !pincode ||
      !country ||
      !mobile
    ) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
        success: false,
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
    });

    const savedAddress = await address.save();

    await UserModel.findByIdAndUpdate(userId, {
      $push: { address_details: savedAddress._id },
    });

    return res.status(201).json({
      error: false,
      message: "Address added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      success: false,
    });
  }
};
