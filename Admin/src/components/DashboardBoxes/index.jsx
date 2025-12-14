import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {  Navigation } from 'swiper/modules';
import { FaGift } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoPieChartSharp } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";

 const DashboardBoxes = () =>{
  return (
    <>
     <Swiper
        slidesPerView={3}
        spaceBetween={10}
       navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
           <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
             <FaGift className="text-[30px] text-[#3872fa]"/>
            <div className="info w-[70%] ">
            <h3>New Orders</h3>
            <b>1,390</b>
           </div>

        <IoStatsChartSharp className="text-[50px] text-[#3872fa]" />
           </div>
            </SwiperSlide>


            
        <SwiperSlide>
           <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
             <IoPieChartSharp className="text-[30px]  text-[#10b981]"/>
            <div className="info w-[70%] ">
            <h3>Sales</h3>
            <b>$57000</b>
           </div>

        <IoStatsChartSharp className="text-[50px] text-[#10b981]" />
           </div>
            </SwiperSlide>


            
        <SwiperSlide>
           <div className="box  bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
             <CiBank className="text-[30px] text-[#7928ca]"/>
            <div className="info w-[70%] ">
            <h3>Revenue</h3>
            <b>$11,390</b>
           </div>

        <IoStatsChartSharp className="text-[50px] text-[#7928ca]" />
           </div>
            </SwiperSlide>


            
        <SwiperSlide>
           <div className="box bg-white p-5 cursor-pointer hover:bg-[#fafafa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
             <FaProductHunt className="text-[30px] text-[#312be1d8]"/>
            <div className="info w-[70%] ">
            <h3>Total Products</h3>
            <b>1,390</b>
           </div>

        <IoStatsChartSharp className="text-[50px] text-[#312be1d8]" />
           </div>
            </SwiperSlide>
       
         </Swiper>
         
    </>
  )
}
export default DashboardBoxes;
