import React, {useState, useContext, useEffect} from "react";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import MyContext from "../../context/MyContext";
import CircularProgress from "@mui/material/CircularProgress";


const EditCategory = () => {

  //add formFields : name and image
  const [formFields, setFormFields] = useState({
    name: "",
    image:[]
  })

  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);


  useEffect(()=>{
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/category/${id}`, formFields).then((res)=>{
        setFormFields(res?.data?.category);
        setPreviews(res?.data?.category.image);
    })
  },[]);

  const onChangeInput=(e)=>{
    const{name, value} = e.target;
    setFormFields((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const setPreviewsFun=(previewsArr)=>{ 
    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...previewsArr
    ])
    // console.log(previewsArr);//to remove
    setFormFields((prev) => ({
      ...prev,              //spread operation copy everything
      image: [
        ...prev.image,
        ...previewsArr
      ]
    }));
    
  }

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    // console.log(`Delete image ${imageArr}`);//to remove

    deleteImages(`/api/user/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreviews([]);

      setTimeout(() => {
        setPreviews(imageArr);
        setFormFields((prev) => ({
          ...prev,              
          image: imageArr    // update image array
        }));
      }, 100);
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "Please enter category name");
      setIsLoading(false);
      return false;
    }

    if (formFields.image?.length === 0) {
      context.alertBox("error", "Please setect category image");
      setIsLoading(false);
      return false;
    }
    // console.log(formFields);//to remove

    editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res)=>{
      // console.log(res)//to remove
      
      setTimeout(()=>{
        setIsLoading(false);
        //close window after category created
        context?.setIsOpenFullScreenPanel({
          open: false,
          model: "",
          id: ""
        }) 
        
      },500)
     
    })
  }

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
 
        <div className="scroll max-h-[72vh] overflow-y-auto pr-4 pt-4">
          
          {/* text area */}
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full md:w-1/4 mb-4">
              <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>

              
              <textarea
                type="text" size="small"
                className="w-full h-10 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md p-3 text-sm bg-[#fafafa] resize-none"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <h3 className="text-[18px] font-[500] mb-3">Category Image</h3>

          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-start">

            {/*fixed image */}
            <div className="uploadBoxWrapper relative md:col-span-1">
                {/*delete button*/}
                <button
                  type="button"
                  aria-label="remove-image"
                  className="absolute top-2 right-2 z-50 w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center hover:opacity-90"
                >
                  <IoClose className="text-white text-[14px]" />
                </button>

                {/*Default Image*/}
                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    alt="category"
                    effect="blur"
                    wrapperProps={{ style: { transitionDelay: "1s" } }}
                    className="w-full h-full object-cover"
                    src="https://m.media-amazon.com/images/I/31mRxdcDb6L._SR290,290_.jpg"
                  />
                </div>
          </div>           

            {/*iterate the previews to show all image */}
            {
              previews?.length != 0 && previews?.map((image, index)=>{
                return(
                  <div className="uploadBoxWrapper relative md:col-span-1" key={index}>
              
                    {/*delete button*/}
                    <button
                      type="button"
                      aria-label="remove-image"
                      className="absolute top-2 right-2 z-50 w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center hover:opacity-90"
                      onClick={()=>removeImg(image, index)}
                    >
                      <IoClose className="text-white text-[14px]" />
                    </button>

                    {/*uploaded image*/}
                    <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.4)] h-[150px] w-[180px] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                      <img src={image} className="w-100"/>
                    </div>
                  </div>
                )
              })
            }

            
            {/*upload box*/}
            {/*User select image - it send images to backend and then update preview, previews appear automatically*/}
            <div className="md:col-span-6">
              <UploadBox multiple={true} name="images" url="/api/category/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>

          <div className="mt-6">
            <hr />
          </div>

            {/*Submit Button*/}
          <div className="mt-4 w-full md:w-[250px]">
            <Button
              type="submit"
              className="btn-blue btn-lg w-full flex gap-2"
              variant="contained"
            >
              {
                isLoading === true ? <CircularProgress color='inherit' />
                  : 'Publish and View'
              }
            </Button>
            
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;
