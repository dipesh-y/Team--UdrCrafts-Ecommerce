import React, { useState } from 'react'
import { IoIosImages } from "react-icons/io";
import { uploadImage, uploadImages} from '../../utils/api';
import CircularProgress from "@mui/material/CircularProgress";


const UploadBox = (props) => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  
  const onChangeFile = async(e, apiEndPoint)=>{
    const formdata = new FormData();

    try{
      setPreviews([]);
      const files = e.target.files;//array of files
      setUploading(true);

      let selectedImages = [];
      
      // insert each file.jpg to formdata
      for(var i = 0; i < files.length; i++){
        if(files[i] && (files[i].type ==="image/jpeg" || files[i].type ==="image/jpg" ||
          files[i].type === "image/png" || files[i].type === "image/webp")){
                  const file = files[i];

                  // console.log("Reached in upload box")//to remove

                  selectedImages.push(file);
                  formdata.append(props?.name, file);
          }
          else{
                alert("Please Select a valid JPG, PNG or Webp Image file");
                setUploading(false);
                return false;
          }
      }

      //upload images to backend api
      uploadImages(apiEndPoint, formdata).then((res)=>{
        setUploading(false);
        
        // console.log(res?.data.images)//to Remove
        props.setPreviewsFun(res.data.images);
                
      })
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <>
     <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
      
         {
          uploading === true ? <CircularProgress color='inherit' />
            : 
            <>
              <IoIosImages className='text-[50px] opacity-50 pointer-events-none ' />
              <h4 className='text-[14px] pointer-events-none'>Image Upload</h4>

              <input 
                type="file" accept="image/*" 
                multiple={props.multiple!==undefined ? props.multiple : false} 
                className='absolute top-0 left-0 w-full h-full z-50 opacity-0'
                onChange={(e) => 
                  onChangeFile(e, props?.url)
                }
                name="images"
              />
            </>
         }
        
        

     </div>
    </>
  )
}

export default UploadBox