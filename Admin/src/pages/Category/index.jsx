import { Button } from '@mui/material'
import React, { useState, useMemo, useContext, useEffect } from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MyContext from '../../context/MyContext';
import SearchBox from '../../components/SearchBox';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"



function createData(id, product, category, rating) {

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit Category" placement="top">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="View Category" placement="top">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="Delete" placement="top">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const productImage = (
    <div className="flex items-center gap-1 w-[270px]">
      <div className="w-[80px] h-[55px] rounded-md overflow-hidden group ">
        <img
          src="https://m.media-amazon.com/images/I/31mRxdcDb6L._SR290,290_.jpg"
          className="w-full group-hover:scale-105 transition-all"
          alt={product}
        />
      </div>

      
    </div>
  );

  return {
    id,
    product: productImage,
    category, 
    action,
  };
}

const CategoryList = () => {
  const [rows, setRows] = React.useState([
    createData(1, "iPhone", "Electronics"),
    createData(2, "Samsung Galaxy", "Electronics"),
    createData(3, "Redmi Note", "Electronics"),
    createData(4, "Realme Narzo", "Electronics"),
    createData(5, "OnePlus Nord", "Electronics"),
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const context = useContext(MyContext);

  const [catData, setCatData] = useState([]);

  //useEffect fetch the categories
  useEffect(() => {
    
      fetchDataFromApi("/api/category").then((res) => {
        // console.log(res?.data?.categories);//array of category data - to remove
          setCatData(res?.data?.categories);
      });
    
  }, [context?.isOpenFullScreenPanel.open]);

  // Define your columns to match the API data keys
  const columns = [
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'name', label: 'Category Name', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCat=(id)=>{
     
    deleteData(`/api/category/${id}`).then((res)=>{
      fetchDataFromApi("/api/category").then((res) => {
        // console.log(res?.data?.categories);//array of category data - to remove
          setCatData(res?.data?.categories);
      });
    })
  }

  return (
    <>
      <div className="card my-5 shadow-md bg-white">
        <div className="px-4 py-5 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Category List</h2>

          <div className="flex items-center gap-2">
            <TooltipMUI title="Export">
              <Button className="!w-[35px] !h-[35px] !rounded-full hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>

            <TooltipMUI title="Add New Category">
              <Button
                className="!w-[35px] !h-[35px] !rounded-full hover:scale-105"
                onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Category",
                  })
                }
              >
                <FaPlus />
              </Button>
            </TooltipMUI>
          </div>
        </div>

        <div className="flex items-center w-full px-5 justify-between">
          <div className="w-[25%]">
            <h4 className="font-[600] text-[13px] pl-3">Category Filter</h4>
            <Select className="w-full" size="small">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
            </Select>
          </div>

          <div className="w-[25%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>


              <TableBody>
                {catData?.length !== 0 ? (
                  catData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((category, index) => (
                      <TableRow hover key={category._id || index}>
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>

                        {/* Column: Image */}
                        <TableCell>
                          <div className="w-[50px] h-[50px] overflow-hidden rounded-md border border-gray-200">
                            <LazyLoadImage 
                              src={category.image} 
                              alt={category.name} 
                              // className="w-full h-full object-cover" 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        </TableCell>

                        {/* Column: Name */}
                        <TableCell>
                          <span className="font-medium text-gray-700">{category.name}</span>
                        </TableCell>

                        {/* Actions Cell - Re-adding View, Edit, and Delete */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TooltipMUI title="Edit Category" placement="top">
                              <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]" onClick={() =>
                                  context?.setIsOpenFullScreenPanel({
                                    open: true,
                                    model: "Edit Category",
                                    id:category?._id
                                    
                                })}>
                                <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                
                                
                              </Button>
                            </TooltipMUI>

                            <TooltipMUI title="Delete" placement="top">
                              <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]" 
                              onClick={()=>deleteCat(category?._id)} >
                                <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
                              </Button>
                            </TooltipMUI>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} align="center">
                        Loading categories...
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>


            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            count={catData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            component="div"
          />
        </Paper>
      </div>
    </>
  );
};

export default CategoryList;
