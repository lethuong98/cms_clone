import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatCurrency } from "../../utils/Convert";
import moment from "moment";
import api from "../../api/Request";

const RecentOrders = () => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const showAuthor = (id) => {
    const user = dataUser.find((item) => item.id === id);
    if (user) {
      return user.fullName;
    }
  };
  useEffect(() => {
    api.get(`/user/get-author`).then((res) => {
      setDataUser(res.data.data);
    });
  }, []);
  useEffect(() => {
    api.get("/order/get-all?rowsPerPage=5").then((res) => {
      setData(res.data.data);
    });
  }, []);
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "12px",
          fontWeight: 600,
        }}
      >
        Đơn hàng gần đây
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: "none", backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell
                sx={{ border: "none", width: "140px", minWidth: "140px" }}
                align="left"
              >
                Mã đơn
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "180px", minWidth: "180px" }}
                align="left"
              >
                Tên khách hàng
              </TableCell>

              <TableCell
                sx={{ border: "none", width: "140px", minWidth: "140px" }}
                align="left"
              >
                Tổng tiền
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "140px", minWidth: "140px" }}
                align="left"
              >
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f4f6f8",
                  },
                }}
              >
                <TableCell
                  sx={{ borderBottomStyle: "dashed" }}
                  component="th"
                  scope="row"
                >
                  #{item.id}
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
                  {showAuthor(item.userId)}
                </TableCell>

                <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
                  {formatCurrency(item.totalMoney)}
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
                  <Box
                    sx={{
                      padding: "4px 8px",
                      backgroundColor: "#bee0be",
                      width: "max-content",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: 600, color: "green" }}
                    >
                      Hoàn thành
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentOrders;
