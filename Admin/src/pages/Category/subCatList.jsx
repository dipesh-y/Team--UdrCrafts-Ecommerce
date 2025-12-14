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
  { id: "product", label: "CATEGORY IMAGE", minWidth: 220 },
  { id: "catname", label: "CATEGORY NAME", minWidth: 220 },
   { id: "subCatname", label: "SUB CATEGORY NAME", minWidth: 400 },
  { id: "action", label: "Action", minWidth: 150 },
];

function createData(id, product) {

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit" placement="top">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="View" placement="top">
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

  const productName = (
    <div className="flex items-center gap-4 w-[220px]">
      <div className="w-[55px] h-[55px] rounded-md overflow-hidden group">
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
    product: productName,


    catname: (
      <div className="flex flex-col">
      
        <span className="text-[12px] text-gray-500 font-semibold mt-1">Electronics</span>
      </div>
    ),



     subCatname: (
      <span className="text-[12px] text-gray-600 font-semibold">Phone</span>
    ),

    action,
  };
}

const SubCategoryList = () => {
  const [rows, setRows] = React.useState([
    createData(1, "Apple iPhone 15"),
    createData(2, "Samsung Galaxy S23"),
    createData(3, "Redmi Note 12"),
    createData(4, "Realme Narzo 60"),
    createData(5, "OnePlus Nord CE 3"),
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
          <h2 className="text-[18px] font-[600]">Sub Category List</h2>

          <div className="flex items-center gap-2">
            <TooltipMUI title="Export">
              <Button className="!w-[35px] !h-[35px] !rounded-full hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>

            <TooltipMUI title="Add New Sub Category">
              <Button
                className="!w-[35px] !h-[35px] !rounded-full hover:scale-105"
                onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add New Sub Category",
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

          <div className="w-[25%] ml-auto ">
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

export default SubCategoryList;
