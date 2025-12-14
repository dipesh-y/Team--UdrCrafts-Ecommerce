
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const columns = [
  { id: "orderId", label: "ORDER ID", minWidth: 120 },
  { id: "paymentId", label: "PAYMENT ID", minWidth: 150 },
  { id: "name", label: "NAME", minWidth: 140 },
  { id: "phone", label: "PHONE NUMBER", minWidth: 140 },
  { id: "address", label: "ADDRESS", minWidth: 220 },
  { id: "pincode", label: "PINCODE", minWidth: 100 },
  { id: "total", label: "TOTAL AMOUNT", minWidth: 120 },
  { id: "email", label: "EMAIL", minWidth: 200 },
  { id: "userId", label: "USER ID", minWidth: 120 },
  { id: "status", label: "ORDER STATUS", minWidth: 150 },
];

function createData({
  orderId,
  paymentId,
  name,
  phone,
  address,
  pincode,
  total,
  email,
  userId,
  status = "Pending",
}) {
  const statusElement = (
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "#FF5DA5",
        color: "#fff",
        textTransform: "none",
        fontWeight: 600,
        "&:hover": { backgroundColor: "#ff2d89" },
      }}
    >
      {status}
    </Button>
  );

  return {
    orderId,
    paymentId,
    name,
    phone,
    address,
    pincode,
    total,
    email,
    userId,
    status: statusElement,
  };
}

const Orders = () => {
  const [search, setSearch] = React.useState("");

  const [rows] = React.useState([
    createData({
      orderId: "ORD-2025112001",
      paymentId: "PAY-6f4a2c",
      name: "Rohan Kumar",
      phone: "9876543210",
      address: "12/A, MG Road, Near Central Park, Bengaluru",
      pincode: "560001",
      total: "₹2,499",
      email: "rohan.k@example.com",
      userId: "USR-1001",
    }),
    createData({
      orderId: "ORD-2025112002",
      paymentId: "PAY-9b7d8e",
      name: "Meera Singh",
      phone: "9123456780",
      address: "Flat 5B, Lotus Apartments, Anna Nagar, Chennai",
      pincode: "600040",
      total: "₹1,199",
      email: "meera.s@example.com",
      userId: "USR-1002",
    }),
  ]);

  // FILTER LOGIC FOR SEARCH
  const filteredRows = rows.filter((row) => {
    return (
      row.orderId.toLowerCase().includes(search.toLowerCase()) ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.includes(search) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <div className="w-full">
      {/* ---------- Heading + Search Bar ---------- */}
      <div className="flex items-center justify-between my-4">
        <h2 className="text-[20px] font-[700]">Recent Orders</h2>

        {/* SEARCH BOX */}
        <input
          type="text"
          placeholder="Search Orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-[250px] text-[14px] focus:outline-blue-500"
        />
      </div>

      {/* ---------- Orders Table ---------- */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 700 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow hover key={row.orderId + idx}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
};

export default Orders;
