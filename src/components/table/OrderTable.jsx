import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import api from "../../api/Request";
import moment from "moment";
import { formatCurrency } from "../../utils/Convert";

function Row(props) {
  const { row, showSize, showColor, showAuthor } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
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
          #{row.id}
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          {showAuthor(row.userId)}
        </TableCell>
        <TableCell
          sx={{ borderBottomStyle: "dashed", color: "#ff6e61" }}
          align="center"
        >
          {row.coupon}%
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          {formatCurrency(row.totalMoney)}
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          <Typography sx={{ fontSize: "14px" }}>
            {moment(row.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#637381" }}>
            {moment(row.createdAt).format("hh:mm A")}
          </Typography>
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
        <TableCell
          sx={{
            borderBottomStyle: "dashed",
            padding: "16px 8px",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ border: "none", backgroundColor: "#f4f6f8" }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: "16px 0",
                borderRadius: "6px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "30px" }}>STT</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Tổng tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((rowDetail, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ border: "none", borderTop: "1px solid #e0e0e0" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ border: "none", borderTop: "1px solid #e0e0e0" }}
                      >
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Box sx={{ height: "60px" }}>
                            <img
                              src={rowDetail.thumbnail}
                              alt="order thumbnail"
                              style={{ height: "100%", borderRadius: "8px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: 400 }}
                            >
                              {rowDetail.nameProduct}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: 400 }}
                            >
                              Màu: {showColor(rowDetail.colorId)}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "12px", fontWeight: 400 }}
                            >
                              Size: {showSize(rowDetail.sizeId)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ border: "none", borderTop: "1px solid #e0e0e0" }}
                        align="center"
                      >
                        {rowDetail.quantity}
                      </TableCell>
                      <TableCell
                        sx={{ border: "none", borderTop: "1px solid #e0e0e0" }}
                        align="center"
                      >
                        {formatCurrency(rowDetail.totalMoney)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function ProductTable({ isSuccess, searchKeyword, date }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [dataProduct, setDataProduct] = useState({ data: [], total: 0 });
  const [dataSize, setDataSize] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const showSize = (id) => {
    const size = dataSize.find((item) => item.id === id);
    if (size) {
      return size.nameSize;
    }
  };
  const showAuthor = (id) => {
    const user = dataUser.find((item) => item.id === id);
    if (user) {
      return user.fullName;
    }
  };
  const showColor = (id) => {
    const color = dataColor.find((item) => item.id === id);
    if (color) {
      return color.nameColor;
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    api
      .get(
        `/order/get-all?searchKeyword=${searchKeyword}&date=${date}&page=${page}&rowsPerPage=${rowsPerPage}&sorted=desc&sortBy=createdAt`
      )
      .then((res) => {
        setDataProduct(res.data);
      });
  }, [isSuccess, searchKeyword, date, page, rowsPerPage]);
  useEffect(() => {
    api.get(`/color/get-all?page=0&rowsPerPage=100`).then((res) => {
      setDataColor(res.data.data);
    });
  }, []);
  useEffect(() => {
    api.get(`/size/get-all?page=0&rowsPerPage=100`).then((res) => {
      setDataSize(res.data.data);
    });
  }, []);
  useEffect(() => {
    api.get(`/user/get-author`).then((res) => {
      setDataUser(res.data.data);
    });
  }, []);
  return (
    <>
      <TableContainer elevation={0} component={Paper} sx={{ border: "none" }}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ border: "none", backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell
                sx={{ border: "none", minWidth: "90px", width: "90px" }}
              >
                Mã đơn
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "170px", minWidth: "170px" }}
                align="left"
              >
                Tên khách hàng
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "140px", minWidth: "140px" }}
                align="center"
              >
                Mã giảm giá
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
                Ngày mua
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "140px", minWidth: "140px" }}
                align="left"
              >
                Trạng thái
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "50px", minWidth: "50px" }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct.data.map((row, index) => (
              <Row
                key={index}
                row={row}
                showSize={showSize}
                showAuthor={showAuthor}
                showColor={showColor}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Hàng trên mỗi trang"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataProduct.total ? dataProduct.total : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
