import { Button } from '@mui/material'
import React, { useState, useMemo, useContext } from 'react'
import { MdOutlineAddAlarm } from "react-icons/md";
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
import Progress from '../../components/Progress bar';
import MyContext from '../../context/MyContext';
import SearchBox from '../../components/SearchBox';

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 220 },
  { id: "action", label: "Action", minWidth: 150 },
];

function createData(
  id,
  product,
  category,
  subCategory,
  oldPrice,
  currentPrice,
  salesPercent,
  ram,
  weight,
  rating
) {

  const ratingStars = (
    <div className="flex items-center gap-1 text-yellow-500 text-[14px]">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      <span className="text-gray-600 text-[12px] ml-1">({rating})</span>
    </div>
  );

  const sales = (
    <div className="flex items-center gap-3">
      <Progress
        value={salesPercent}
        type={
          salesPercent >= 70
            ? "success"
            : salesPercent >= 40
              ? "warning"
              : "error"
        }
      />
      <span className="text-gray-700 font-medium">{salesPercent}%</span>
    </div>
  );

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit Product" placement="top">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="View Product" placement="top">
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

  const priceColumn = (
    <div className="flex flex-col gap-1">
      <span className="line-through text-gray-500 text-[14px]">{oldPrice}</span>
      <span className="text-blue-600 text-[14px] font-[600]">{currentPrice}</span>
    </div>
  );

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <Link to="/products/485789">
        <div className="w-[55px] h-[55px] rounded-md overflow-hidden group">
          <img
            src="https://m.media-amazon.com/images/I/31mRxdcDb6L._SR290,290_.jpg"
            className="w-full group-hover:scale-105 transition-all"
            alt={product}
          />
        </div>
      </Link>

      <div className="info w-[75%] text-[#696969]">
        <h3 className="font-[600] text-[12px] leading-4 hover:text-blue-600">
          <Link to="/products/485789">{product}</Link>
        </h3>
        {ratingStars}
      </div>
    </div>
  );

  return {
    id,
    product: productName,
    category,
    subCategory,
    ram,
    weight,
    rating: ratingStars,
    price: priceColumn,
    sales,
    action,
  };
}

const HomeSliderBanners = () => {
  const [rows, setRows] = React.useState([
    createData(1, "Apple iPhone 15", "Mobiles", "Smartphone", "₹89,999", "₹74,999", 85, "8 GB", "180g", 5),
    createData(2, "Samsung Galaxy S23", "Mobiles", "Smartphone", "₹79,999", "₹64,999", 70, "12 GB", "195g", 4),
    createData(3, "Redmi Note 12", "Mobiles", "Smartphone", "₹16,999", "₹12,499", 60, "6 GB", "178g", 4),
    createData(4, "Realme Narzo 60", "Mobiles", "Smartphone", "₹19,999", "₹14,999", 30, "8 GB", "190g", 3),
    createData(5, "OnePlus Nord CE 3", "Mobiles", "Smartphone", "₹29,999", "₹24,999", 95, "12 GB", "182g", 5),
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const context = useContext(MyContext);

  return (
    <>
      <div className="card my-5 shadow-md bg-white">
        <div className="px-4 py-5 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Home Slider Banners</h2>

          <div className="flex items-center gap-2">
            <TooltipMUI title="Export">
              <Button className="!w-[35px] !h-[35px] !rounded-full hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>

            <TooltipMUI title="Add Home Slide">
              <Button
                className="!w-[35px] !h-[35px] !rounded-full hover:scale-105"
                onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add Home Slide",
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
              <MenuItem value="mobile">Mobiles</MenuItem>
              <MenuItem value="laptop">Laptops</MenuItem>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>

                      {columns.map((column) => (
                        <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            count={rows.length}
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

export default HomeSliderBanners;
