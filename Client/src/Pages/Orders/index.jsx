import React, { useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";


const Orders = () => {

  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

const isShowOrderProduct = (index) => {
  if(isOpenOrderProduct === index){
    setIsOpenOrderProduct(null);
  } else {
  setIsOpenOrderProduct(index);
  }
};



  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="py-2 px-3 border-[rgba(0,0,0,0.1)] border-b">
              <h2>My Orders</h2>
              <p className="mt-0">
                There are <span className="font-bold text-primary">2</span>{" "}
                orders
              </p>

              <div
                class="relative overflow-x-auto  "
              >   
                <table class="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50
        dark:bg-gray-00 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3 ">
                        &nbsp;
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Payement Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Pincode
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Total Amount
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Email
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        User Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Status
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] ">
                        <Button className="!w-[35px] !h-[35px]!min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={ () => isShowOrderProduct(0)} >
                        

                        {
                          isOpenOrderProduct === 0  ?  <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" /> :  <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                        }
                         
                        </Button></td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">
                          67514d9914da0b78a342b261
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">pay_PTP0qEXFhrtpy8</span>
                      </td>
                      <td class="px-8 py-5 font-[500] "> RINKU VERMA</td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       383836567
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                          <span className="block w-[400px]">
                          H No 222 Street No 6 Adrash MohallaManujpur Delhi near
                          shivam medical ph. +917383836567
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        110053
                      </td>
                      <td class="px-8 py-5 font-[500] ">3800</td>
                      <td class="px-8 py-5 font-[500] ">rinkuverma@gmail.com</td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">
                          66e120733d4b2dc4a19335ab
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        <Badge status="pending" />
                      </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap">
                        2025-12-06
                      </td>
                    </tr>

                    {
                      isOpenOrderProduct=== 0 && ( 
                      <tr>
                      <td className="pl-24" colSpan="6">
                        <div
                class="relative overflow-x-auto"  
                      
              >   
                <table class="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50
        dark:bg-gray-00 dark:text-gray-400"
                  >
                    <tr>
                      
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Product Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Product Title
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        SubTotal
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] "> <span className="text-gray-700">
                          67514d9914da0b78a342b261
                        </span></td>
                      <td class="px-8 py-5 font-[500] ">
                       A-Line Kurti With Sharara & DU...
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                      </td>
                      <td class="px-8 py-5 font-[500] ">2 </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       1300
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                         1300
                      </td>
                     
                    </tr>
                     <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] "> <span className="text-gray-700">
                          67514d9914da0b78a342b261
                        </span></td>
                      <td class="px-8 py-5 font-[500] ">
                       A-Line Kurti With Sharara & DU...
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                      </td>
                      <td class="px-8 py-5 font-[500] ">2 </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       1300
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                         1300
                      </td>
                     
                    </tr>

                    <tr>
                      <td className="bg-[#f1f1f1]" colSpan="12">
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                      </td>
                    </tr>

                    )}

                     <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] ">
                        <Button className="!w-[35px] !h-[35px]!min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={ () => isShowOrderProduct(1)} >
                        

                        {
                          isOpenOrderProduct === 1  ?  <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" /> :  <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                        }
                         
                        </Button></td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">
                          67514d9914da0b78a342b261
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">pay_PTP0qEXFhrtpy8</span>
                      </td>
                      <td class="px-8 py-5 font-[500] "> RINKU VERMA</td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       383836567
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                          <span className="block w-[400px]">
                          H No 222 Street No 6 Adrash MohallaManujpur Delhi near
                          shivam medical ph. +917383836567
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        110053
                      </td>
                      <td class="px-8 py-5 font-[500] ">3800</td>
                      <td class="px-8 py-5 font-[500] ">rinkuverma@gmail.com</td>
                      <td class="px-8 py-5 font-[500] ">
                        <span className="text-primary">
                          66e120733d4b2dc4a19335ab
                        </span>
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                        <Badge status="pending" />
                      </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap">
                        2025-12-06
                      </td>
                    </tr>

                    {
                      isOpenOrderProduct=== 1 && ( 
                      <tr>
                      <td className="pl-24" colSpan="6">
                        <div
                class="relative overflow-x-auto"  
                      
              >   
                <table class="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50
        dark:bg-gray-00 dark:text-gray-400"
                  >
                    <tr>
                      
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Product Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                       Product Title
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        SubTotal
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b ">
                      <td class="px-8 py-5 font-[500] "> <span className="text-gray-700">
                          67514d9914da0b78a342b261
                        </span></td>
                      <td class="px-8 py-5 font-[500] ">
                       A-Line Kurti With Sharara & DU...
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                      </td>
                      <td class="px-8 py-5 font-[500] ">2 </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       1300
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                         1300
                      </td>
                     
                    </tr>
                     <tr class="bg-white border-b dark:bg-grey-800 dark:border-grey-700">
                      <td class="px-8 py-5 font-[500] "> <span className="text-gray-700">
                          67514d9914da0b78a342b261
                        </span></td>
                      <td class="px-8 py-5 font-[500] ">
                       A-Line Kurti With Sharara & DU...
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                                            fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY
                                            2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                      </td>
                      <td class="px-8 py-5 font-[500] ">2 </td>
                      <td class="px-8 py-5 font-[500] whitespace-nowrap ">
                       1300
                      </td>
                      <td class="px-8 py-5 font-[500] ">
                         1300
                      </td>
                     
                    </tr>

                    <tr>
                      <td className="bg-[#f1f1f1]" colSpan="12">
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                      </td>
                    </tr>

                    )}

                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
