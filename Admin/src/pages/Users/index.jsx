// src/pages/Users.jsx
import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus, FaPhoneAlt } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Progress from "../../components/Progress bar";
import MyContext from "./../../context/MyContext";
import SearchBox from "../../components/SearchBox";
import { AiOutlineCalendar } from "react-icons/ai";

const columns = [
  { id: "image", label: "USER IMAGE", minWidth: 80 },
  { id: "name", label: "USER NAME", minWidth: 150 },
  { id: "email", label: "USER EMAIL", minWidth: 200 },
  { id: "phone", label: "USER PHONE", minWidth: 150 },
  { id: "action", label: "ACTIONS", minWidth: 120 },
  { id: "createdDate", label:"CREATED", minWidth: 100},
];

function createData({ id, imageUrl, name, email, phone, createdDate, salesPercent = 0, rating = 4 }) {
  const ratingStars = (
    <div className="flex items-center gap-1 text-yellow-500 text-[14px]">
      
      
    </div>
  );

  const action = (
    <div className="flex items-center gap-1">
      <TooltipMUI title="Edit User">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="View User">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[24px]" />
        </Button>
      </TooltipMUI>

      <TooltipMUI title="Delete">
        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full hover:!bg-[#ccc]">
          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
        </Button>
      </TooltipMUI>
    </div>
  );

  const imageElement = (
    <div className="w-[55px] h-[55px] rounded-md overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );

  const nameElement = (
    <div className="flex flex-col">
      <Link className="font-[600] text-[13px] hover:text-blue-600">{name}</Link>
      <div className="mt-1 text-[12px] text-gray-500">{ratingStars}</div>
    </div>
  );

  const emailElement = (
    <div className="flex items-center gap-2 text-[14px]">
      <MdEmail className="text-blue-600 text-[18px]" />
      {email}
    </div>
  );

  const phoneElement = (
    <div className="flex items-center gap-2 text-[14px]">
      <FaPhoneAlt className="text-green-600 text-[15px]" />
      {phone}
    </div>
  );
  
  const createdDateElement = (
  <div className="flex items-center gap-2 text-[14px]">
    <AiOutlineCalendar className="text-blue-600 text-[17px]" />
    {createdDate}
  </div>  
  );

  
  
  return {
    id,
    image: imageElement,
    name: nameElement,
    email: emailElement,
    phone: phoneElement,
    createdDate: createdDateElement,
    action,
    
    
  };
}

const Users = () => {
  const [rows, setRows] = useState([
    createData({
      id: 1,
      imageUrl:
        "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg",
      name: "Akash",
      email: "akash2334@gmail.com",
      phone: "7815737379",
      createdDate:"10-10-2025",
      salesPercent: 85,
      rating: 5,
    }),

    createData({
      id: 2,
      imageUrl:
        "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg",
      name: "Kavya",
      email: "kavya88@example.com",
      phone: "9123456780",
      createdDate:"10-10-2023",
      salesPercent: 60,
      rating: 4,
    }),
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  return (
    <>
      <div className="card my-5 shadow-md bg-white">
        <div className="px-4 py-5 flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users List</h2>

          <div className="flex items-center gap-2">
            <TooltipMUI title="Export">
              <Button className="!w-[35px] !h-[35px] !rounded-full hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>

            <TooltipMUI title="Add User">
              <Button
                className="!w-[35px] !h-[35px] !rounded-full hover:scale-105"
                onClick={() =>
                  context?.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Add User",
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
                  .map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>

                      {columns.map((column) => (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
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
            onPageChange={(e, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default Users;
