import AddressModel from "../models/addressmodel.js";
import UserModel from "../models/usermodel.js";

export async function addAddressController (request, response) {

try {
    const {address_line1, city, state, pincode, country, mobile,landmark, addressType } = request.body;
    // const userId = request.userId;  
    const userId = request.userId || request.body.userId;

if(!address_line1 || !city || !state || !pincode || !country || !mobile ){
     return response.status(400).json({
      message: "All fields are required",
      error: true,
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
    userId,
    landmark,
    addressType,
    
});

 const savedAddress = await address.save();


 const updateUserAddress = await UserModel.updateOne({_id : userId},{
    $push : {
        address_details : savedAddress?._id
    }
 }) 

   return response.status(200).json({
            data : savedAddress,
            message : 'Address added successfully',
            error : false,
            success: true
        });
    
} catch (error) {
     return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
}


}

export async function getAddressController(request, response) {
  try {
    const userId = request.userId;   // ✅ ONLY THIS

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized user",
        error: true,
        success: false,
      });
    }

    const address = await AddressModel.find({ userId });

    return response.status(200).json({
      error: false,
      success: true,
      data: address,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

      

 export const selectAddressController =  async (request,resposnse) =>{
    try{
          const userId =request.userId;
          const address =  await AddressModel.find({
            _id:request.params.id,
            userId:userId
          })
          
              const updateAddress = await AddressModel.findByIdAndUpdate(
            request.params.id,
            {
                selected: false,
               
               
            },
            { new: true }
        )
          if(!address){
            return resposnse.status(500).json({
        message:error.message || error,
        error:true,
        success:false
      })
          }
          else{
              const updateAddress = await AddressModel.findByIdAndUpdate(
            request.params.id,
            {
                selected: request?.body?.selected,
               
               
            },
            { new: true }
        )
          return resposnse.json({
            
            error: false,
            success: true,
            address:updateAddress
        })

          }
    } catch(error){
      return resposnse.status(500).json({
        message:error.message || error,
        error:true,
        success:false
      })
    }
 }    



 export const deleteAddressController = async ( request,response)=>{
    try {
    const { id } = request.params;

    const address = await AddressModel.findByIdAndDelete(id);

    if (!address) {
      return response.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    response.json({
      success: true,
      message: "Address deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
 }

 