import React, { useState, useEffect,PureComponent, useContext } from 'react'
import { FaPlus } from "react-icons/fa";
import DashboardBoxes from '../../components/DashboardBoxes'
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import Progress from '../../components/Progress bar';
import { CiEdit } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

import Pagination from '@mui/material/Pagination';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton,  Typography, Box, LinearProgress} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer} from 'recharts';
import MyContext from '../../context/MyContext';



const rows= [
  {
    id: 1,
    name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
    brand: 'Books',
    category: 'Electronics',
    subCategory: 'Women',
    price: 58.00,
    oldPrice: 58.00,
    sales: 234,
    progress: 60,
    image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
  },
  {
    id: 2,
    name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
    brand: 'Books',
    category: 'Electronics',
    subCategory: 'Women',
    price: 58.00,
    oldPrice: 58.00,
    sales: 234,
    progress: 60,
    image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
  },
  {
    id: 3,
    name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
    brand: 'Books',
    category: 'Electronics',
    subCategory: 'Women',
    price: 58.00,
    oldPrice: 58.00,
    sales: 234,
    progress: 60,
    image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
  },
];


const Dashboard = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  // Add state for category filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [chart1Data, setChart1Data]= useState([
    {
      id: 1,
      name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
      brand: 'Books',
      category: 'Electronics',
      subCategory: 'Women',
      price: 58.00,
      oldPrice: 58.00,
      sales: 234,
      progress: 60,
      image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
    },
    {
      id: 2,
      name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
      brand: 'Books',
      category: 'Electronics',
      subCategory: 'Women',
      price: 58.00,
      oldPrice: 58.00,
      sales: 234,
      progress: 60,
      image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
    },
    {
      id: 3,
      name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women',
      brand: 'Books',
      category: 'Electronics',
      subCategory: 'Women',
      price: 58.00,
      oldPrice: 58.00,
      sales: 234,
      progress: 60,
      image: 'https://ecme-react.themenate.net/img/products/product-1.jpg',
    },
  ]);


  useEffect(() => {
      const handleClickOutside = (event) => {
        if (isFilterOpen && !event.target.closest('.relative')) {
          setIsFilterOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, [isFilterOpen]);

const context =  useContext(MyContext)


  return (
   <>
   <div className="w-full px-5 border  border-[rgba(9,154,67,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
      <div className="info">
        <h1 className="text-[35px] font-bold leading-10 mb-3">Good Morning,
          Cameron
        </h1>
        
        <p>Here's What happening on your store today.See the statistics at once.</p>
        <br/>
        <button className="btn-blue !capitalize flex items-center gap-2" onClick={()=>context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model:"Add Product"
                                })}> <FaPlus/> Add Product</button>
   </div>
  <img src="https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg" srcet="https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg?t=st=1761569545~exp=1761573145~hmac=4a2ad604f17947a7727ff26b45dee8ec1c3e9a9b785a2bf0781557a585572015&amp;w=360 360w, https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg?t=st=1761569545~exp=1761573145~hmac=4a2ad604f17947a7727ff26b45dee8ec1c3e9a9b785a2bf0781557a585572015&amp;w=740 740w, https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg?t=st=1761569545~exp=1761573145~hmac=4a2ad604f17947a7727ff26b45dee8ec1c3e9a9b785a2bf0781557a585572015&amp;w=1060 1060w, https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg?t=st=1761569545~exp=1761573145~hmac=4a2ad604f17947a7727ff26b45dee8ec1c3e9a9b785a2bf0781557a585572015&amp;w=1480 1480w, https://img.freepik.com/free-vector/shopping-paper-sheet-composition_1284-21402.jpg?t=st=1761569545~exp=1761573145~hmac=4a2ad604f17947a7727ff26b45dee8ec1c3e9a9b785a2bf0781557a585572015&amp;w=2000 2000w" width="626" height="625" alt="shopping paper sheet composition" fetchPriority="high" sizes="(max-width: 480px) 100vw, (min-aspect-ratio: 626/625) 100%, (max-width: 1024px) calc(100vw - 40px), calc(100vw - 540px)" className="w-[300px] h-[250px] object-cover rounded-md"/>
   </div>
   <DashboardBoxes />





   <div className="card my-3 shadow-md sm:rounded-lg bg-white">
     <div className="px-3 py-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-[600]">Products <span className='text-sm text-grey-50 ml-1'>(Tailwind CSS Table)</span></h2>
        
        <div className="w-full flex items-center">
            <h3 className='mr-3'>Category By</h3>
          {/* Left side - Category Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            >
              {selectedCategory} <span className="ml-1">▼</span>
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {['All', 'Women', 'Men', 'Electronics', 'Appliances'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedCategory === category ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side - Action Buttons */}
          <div className="ml-auto flex items-center gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs  uppercase bg-gray-100">
            <tr>
                <th scope="col" className="px-6 py-3" width="10%"> 
                    <div className='w-[60px]'> 
                     <Checkbox {...label } size='small' />
                     </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                   Product  
                </th>
                <th scope="col" className="px-6 py-3">
                   Category 
                </th>
               <th scope="col" className="px-6 py-3">
                    Sub-Category
                </th>
                
                <th scope="col" className="px-6 py-3">
                   Price 
                </th>
               <th scope="col" className="px-6 py-3">
                  Sales
                   </th>
                <th scope="col" className="px-6 py-3">
                  Action 
                   </th>
            </tr>
        </thead>
        <tbody>
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                         
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                   

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                    
                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                   

                    </div>

                </td>




            </tr>
             
        
         
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                         
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                  

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                    
                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                    

                    </div>

                </td>




            </tr>
             
      
        
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                    

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                  
                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                   

                    </div>

                </td>




            </tr>
             
        
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                    

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                    
                   
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 

                    </div>

                </td>




            </tr>
             
       
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                         
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                    

                   
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                    
                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                    

                    </div>

                </td>




            </tr>
             
        
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                         
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 
                   

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                   
                 
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                  
                    <div>

                    </div>

                    </div>

                </td>




            </tr>
             
       
            <tr  className="bg-white border-b dark:border-gray-700 border-gray-200">
                <td className='px-6 py-3'>
                    <div className='w-[60px]'> 
                     <Checkbox {...label} size='small'/>
                     </div>
                </td>
                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-[65px] h-[65px] rounded-md overflow-hidden group'>
                            <Link to="/product/45745"> 
                            <img  className='w-full group-hover:scale-110 transition-all' src='https://ecme-react.themenate.net/img/products/product-1.jpg'>
                            </img>
                            </Link>
                            
                        </div>

                        <div className='info w-[75%]'>
                            <h4 className='font-[400] text-[12px] leading-4 hover:text-blue-400'>
                                <Link to="/product/45745">
                                VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for women
                                </Link>
                            </h4>
                            <span className='text-[12px]'>Brooks</span>
                        </div>
                    </div>

                </td>
                <td className="px-6 py-2">
                    electronics 
                </td>
               <td className="px-6 py-2">Women </td>

                
                <td className="px-6 py-2">
                    <div className='flex gap-1 flex-col'>
                        <span className='line-through text-[12px] text-gray-400 mr-2'>$300</span>
                        <span className='font-[600] text-[14px]'>$250</span> 
                    </div>
                </td>


                <td className="px-6 py-2">
                    <p className='text-[16px] w-[150px]  itmes-center'>
                        <span className='font-[600] w-[150px] mr-2'>
                        234
                        </span>
                        sale
                    </p>
                    <Progress value={20} type="success"/>
                 </td>

                <td className="px-6 py-2">
                    <div className='flex items-center gap-4'>
                        
                    <button className='!w-[40px] !h-[35px] !rounded-full bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <CiEdit className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button> 

                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <IoMdEye className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>

                    </button>
                    
                    
                    <button className='!w-[40px] !h-[35px] bg-[#fcfcfc] min-w-[35px] hover:bg-blue-200'>
                        <FaTrashAlt className='text-[rgba(0,0,0,0,0.7)] text-[18px]'/>


                    </button> 
                    

                    </div>
                               
            </td>

            </tr>
        </tbody>
    </table>
    <div className='m-6 flex items-center'>                    <Pagination className='ml-auto' count={10} color="primary" />
    </div>

</div>
   </div>

    <div>
         <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Products <Typography variant="body2" component="span" color="text.secondary">(Material UI Table)</Typography>
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>PRODUCT</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>SUB CATEGORY</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>SALES</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={row.image}
                      alt={row.name}
                      sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                    />
                    <Box>
                      <Typography 
  component={Link} 
  to={`/product/${row.id}`}  // ✅ backticks for template literal
  variant="body2" 
  fontWeight={500}
  sx={{ 
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': { color: 'primary.main' }
  }}
                      >
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.brand}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subCategory}</TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${row.oldPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    ${row.price.toFixed(2)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {row.sales} sale
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={row.progress}
                    sx={{ height: 6, borderRadius: 2 }}
                    color="success"
                  />
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Edit Product">
                      <IconButton size="small" color="primary">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Product">
                      <IconButton size="small" color="info">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Paper>
    </div>

    <div className="card my-3 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5 pb-0">
        <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
      </div>
      <div className="flex items-center gap-5 px-5 py-5 pb-0">
      
      
      <span className="flex items-center gap-1 text-[15px]"> <span className="block w-[8px] h-[8px] rounded-full bg-green-600 "> 
        </span>Total Users</span>
        <span className="flex items-center gap-1 text-[15px]"> <span className="block w-[8px] h-[8px] rounded-full bg-primary "> 
        </span>Total Sales</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={chart1Data}
          margin={{
            top:5,
            right:30,
            left:20,
            bottom:5,
          }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="none"/>
            <XAxis dataKey="name" tick={{ fontSize:12 }} />
            <YAxis tick ={{ fontSize: 12}}/>
            <RechartsTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r : 8 }}
              />
              <Line type="monotone" dataKey="progress" stroke="#82ca9d" />
              </LineChart>
      </ResponsiveContainer>
    </div>
   </>
  )
}

export default Dashboard;