import MyListModel from "../models/myList.model.js"

export const addToMyListController = async (req,res)=>{
  try{
        const userId = req.userId
        const {productId,
           productTitle,
            image,
            rating,
            price,
            OldPrice,
            brand,
            discount
        } = req.body;

        const item = await MyListModel.findOne({
          userId:userId,
          productId:productId
        })
        if(item){
          return res.status(400).json({
            error: true,
            success: false,
            message : "Item already in your list"
          })
        }
        const myList = new MyListModel({
          productId,
          productTitle,
          image,
          rating,
          price,
          OldPrice,
          brand,
          discount,
          userId
        })
        await myList.save();
        return res.status(200).json({
          error:false,
          success:true,
          message:"The product added in the myList"
        })
  }
  catch(error){
    return res.status(500).json({
      message:error.message || error,
      error : true,
      success :false
    })
  }
}

export const deleteToMyListController = async(req, res) => {
  try{
      const myListItem = await MyListModel.findById(req.params.id);
      if(!myListItem){
        return res.status(404).json({
          error:true,
          success:false,
          message:"The item with this given id not found"
        })
      }

      const deletedItem = await MyListModel.findByIdAndDelete(req.params.id);
      if(!deletedItem){
        return res.status(404).json({
          error:true,
          success:false,
          message:"Failed to delete the item"
        })
      }
      return res.status(200).json({
        error:false,
        success:true,
        message:"The item removed from my list"
      })
  }
  catch(error){
    return res.status(500).json({
      message:error.message || error,
      error : true,
      success : false
    })
  }
}

export const getMyListController = async (req, res) => {
  try{
      const userId = req.userId;
      const myList = await MyListModel.find({ userId: userId });
      
      return res.status(200).json({
        error: false,
        success: true,
        data: myList,
        message: "My list retrieved successfully"
      })
  }
  catch(error){
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}