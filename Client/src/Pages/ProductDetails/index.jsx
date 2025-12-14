import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsComponent from "../../components/ProductDetails";

export const ProductDetails = () => {
  // const [productActionIndex, setProductActionIndex] = useState(null);

  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="py-5">
        <div className="container !p-2">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              HOME
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Fashion
            </Link>

            <Link
              underline="hover"
              color="inherit"
              className="link transition !text-[14px]"
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <section className="bg-white py-5">
        <div className="container flex gap-8 item-center">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom />
          </div>
          <div className="productContent w-[60%]">
            <ProductDetailsComponent />
          </div>
        </div>

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span
              className="link text-[17px] cursor-pointer font-[500] ${active===0 && `text-primary`}"
              onClick={() => setActiveTab(0)}
            >
              Description
            </span>
            <div></div>
            <span
              className="link text-[17px] cursor-pointer font-[500] ${active===1 && `text-primary`}"
              onClick={() => setActiveTab(1)}
            >
              Product Details
            </span>
            <span
              className="link text-[17px] cursor-pointer font-[500] ${active===2 && `text-primary`}"
              onClick={() => setActiveTab(2)}
            >
              Reviews (5)
            </span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8  rounded-md">
              <p>
                The best is yet to come! Give your walls a voice with a framed
                poster. Painted wooden frame wieh passe-part out withmore depth
              </p>
              <h4>Lightweight Design</h4>
              <p>
                A lightweight design focuses on simplicity, efficiency, and
                clean aesthetics. It removes unnecessary visual noise, keeps
                elements minimal, and ensures every component serves a clear
                purpose. By reducing bulky layouts, heavy UI frameworks, and
                excessive styling, lightweight design improves performance and
                creates a smoother user experience. The result is a modern,
                clutter-free interface that feels fast, intuitive, and visually
                balanced—ideal for users who value speed, clarity, and
                functionality without distraction.
              </p>
              <h4>Free Shipping and Return</h4>
              <p>
                We offer free shipping for products on orders above 50$ and
                offer free delivery all order in us
              </p>
              <h4>Money Back Guarantee</h4>export default ProductDetails;
              <p>
                We guarantee are products and you could back all off your money
                anytime you want in 30 days
              </p>
              <h4>Online Support</h4>
              <p>
                You will get 24 hours support with this purchase product and you
                can return it within 30 days for an exchange
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8  rounded-md mt-8 mb-10">
              <div
                class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs 
rounded-base border border-default p-6 "
              >
                <table class="w-full text-sm text-left rtl:text-right  text-grey-500 dark:text-grey-400 ">
                  <thead
                    class="text-sm text-body bg-neutral-secondary-soft border-b 
        rounded-base border-default"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3 ">
                        Stand Up
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/o wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/ wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Door Pass Through
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] ">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>

                      <td class="px-8 py-5 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-8 py-5 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-8 py-5 font-[500]">24</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>

                      <td class="px-8 py-5 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-8 py-5 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-8 py-5 font-[500]">24</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>

                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>

                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>

                      <td class="px-6 py-4 font-[500] ">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">
                        35"L*24"W*37-45"H(front back to wheel)
                      </td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-md w-[80%] py-5 px-8  rounded-md">
              <div className="w-full productReviewsContainer">
                <h2 className="text-[18px]">Customer questions & answers</h2>
                <div
                  className="reviewScroll w-full max-h-[300px] overflow-y-scroll 
                            overflow-x-hidden mt-5 pr-5"
                >
                  <div className="reviews pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          className="w-full"
                        ></img>
                      </div>

                      <div className="w-[70%]">
                        <h4 className="text-[16px]">Rinku verma</h4>
                        <h5 className="text-[13px] mb-0">2025-12-01</h5>
                        <p className="mt-0 mb-0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="reviews pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          className="w-full"
                        ></img>
                      </div>

                      <div className="w-[70%]">
                        <h4 className="text-[16px]">Rinku verma</h4>
                        <h5 className="text-[13px] mb-0">2025-12-01</h5>
                        <p className="mt-0 mb-0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="reviews pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          className="w-full"
                        ></img>
                      </div>

                      <div className="w-[70%]">
                        <h4 className="text-[16px]">Rinku verma</h4>
                        <h5 className="text-[13px] mb-0">2025-12-01</h5>
                        <p className="mt-0 mb-0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="reviews pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          className="w-full"
                        ></img>
                      </div>

                      <div className="w-[70%]">
                        <h4 className="text-[16px]">Rinku verma</h4>
                        <h5 className="text-[13px] mb-0">2025-12-01</h5>
                        <p className="mt-0 mb-0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="reviews pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          className="w-full"
                        ></img>
                      </div>

                      <div className="w-[70%]">
                        <h4 className="text-[16px]">Rinku verma</h4>
                        <h5 className="text-[13px] mb-0">2025-12-01</h5>
                        <p className="mt-0 mb-0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                </div>
                <br /> <br />
                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                  <h2 className="text-[18px]">Add a Review</h2>
                  <form className="w-full mt-5">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="write a review..."
                      className="w-full"
                      multiline
                      rows={5}
                    />
                    <br /> <br />
                    <Rating name="size-small" defaultValue={4} />
                    <div className="flex items-center mt-5">
                      <Button className="btn-org">Submit Review</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] pb-0">Related Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
