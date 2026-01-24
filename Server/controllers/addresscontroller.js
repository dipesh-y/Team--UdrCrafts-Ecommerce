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
      selected
    } = req.body;
    //  console.log(address_line1,city,state,pincode,country,mobile,status)
    // //  const userId= request.userId
    // if (
    //   !address_line1 ||
    //   !city ||
    //   !state ||
    //   !pincode ||
    //   !country ||
    //   !mobile  || 
    //   !userId
    // ) {
    //   return res.status(400).json({
    //     error: true,
    //     message: "All fields are required",
    //     success: false,
    //   });
    // }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
      selected
    });

    const savedAddress = await address.save();

    const updateCartUser = await UserModel.updateOne({_id:userId},{
      $push:{
        address_details: savedAddress?._id
      }
    })

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

export const getAddressController = async (request, response) =>{

        try{
          const address = await AddressModel.find({userId:req?.query?.userId});

           if (!address){
               return response.status({
                error:true,
                success:false,
                msg:"address not found"
               })
           }
            else{
              const updateUser = await UserModel.updateOne({_id: request?.query?.userId},{
                $push: {
                  address:address?._id
                }
              })
            }  

                   return response.status(200).json({
                error:false,
                success:true,
                address:address
               })
               
            

} catch (error){
     console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
      success: false,
    });
}
        }
      

 export const selectAddressController =  async (request,resposnse) =>{
    try{
          const userId =request.param.id
          const address =  await AddressModel.find({
            _id:request.param.id,
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
            return response.status(500).json({
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
          return response.json({
            
            error: false,
            success: true,
            address:updateAddress
        })

          }
    } catch(error){
      return response.status(500).json({
        message:error.message || error,
        error:true,
        success:false
      })
    }
 }    
