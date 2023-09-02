import React, { useEffect, useLayoutEffect, useState } from "react";
import { Table, Box, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from "../../api/Request";
import { Link } from "react-router-dom";

import TablePagination from "@mui/material/TablePagination";
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function UserTable({
  handleOpenModal,
  getDataFromChild,
  isSuccess,
  searchKeyword,
  role,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState({});

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
        `/user/get-all?role=${role}&searchKeyword=${searchKeyword}&page=${page}&rowsPerPage=${rowsPerPage}`
      )

      .then((res) => {
        // handle success
        setData(res.data);
        if (res.data.total <= page * rowsPerPage) {
          setPage(0);
        }
      })
      .catch(function (error) {
        // handle error
       
      });
  }, [isSuccess, role, searchKeyword, page, rowsPerPage]);
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: "none", backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Tên
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "130px", width: "130px" }}
                align="left"
              >
                Số điện thoại
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  minWidth: "120px",
                  width: "120px",
                }}
                align="left"
              >
                Vai trò
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "130px", width: "130px" }}
                align="left"
              >
                Trạng thái
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "120px", width: "120px" }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((row) => (
              <TableRow
                key={row.id}
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
                  <Box
                    sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        width: 42,
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={row.avatar || "./avatar-default.jpg"}
                        alt=""
                        style={{ height: "100%", width: "100%" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "14px" }}>
                        {row.fullName}
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#919EAB" }}>
                        {row.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
                  {row.phoneNumber}
                </TableCell>

                <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
                  {row.role === 1
                    ? "Quản trị viên"
                    : row.role === 2
                    ? "Biên tập viên"
                    : "Khách hàng"}
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
                      Hoạt động
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="right">
                  <Link to={`/user/edit/${row.id}`}>
                    <IconButton>
                      <EditRoundedIcon color="warning" />
                    </IconButton>
                  </Link>
                  <IconButton
                    disabled={
                      Number(localStorage.getItem("id")) === row.id
                        ? true
                        : false
                    }
                    onClick={() => {
                      getDataFromChild({ fullName: row.fullName, id: row.id });
                      handleOpenModal();
                    }}
                  >
                    <DeleteRoundedIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Hàng trên mỗi trang"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.total ? data.total : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
