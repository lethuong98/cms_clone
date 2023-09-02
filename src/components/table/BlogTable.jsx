import React, { useEffect, useState } from "react";
import { Table, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import api from "../../api/Request";
import { Link } from "react-router-dom";

import TablePagination from "@mui/material/TablePagination";
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import moment from "moment";
import { limitString } from "../../utils/Convert";

export default function BannersTable({
  handleOpenModal,
  getDataFromChild,
  isSuccess,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getNameAuthor = (id) => {
    const index = dataUser.findIndex((item) => item.id === id);
    return dataUser[index]?.fullName;
  };
  useEffect(() => {
    api
      .get(`/blog/get-all?page=${page}&rowsPerPage=${rowsPerPage}`)

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
  }, [isSuccess, page, rowsPerPage]);
  useEffect(() => {
    api
      .get(`/user/get-author`)
      .then((res) => {
        // handle success
        setDataUser(res.data.data);
      })
      .catch(function (error) {
        // handle error
       
      });
  }, []);
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead
            sx={{ border: "none", backgroundColor: "#f4f6f8", height: "60px" }}
          >
            <TableRow>
              <TableCell sx={{ border: "none", minWidth:'270px' }}>
                Tiêu đề
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "100px", minWidth: "100px" }}
                align="center"
              >
                Banners
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "160px", minWidth: "160px" }}
                align="center"
              >
                Tác giả
              </TableCell>
              <TableCell sx={{ border: "none", width: "120px", minWidth:'120px' }} align="center">
                Ngày đăng
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "120px", minWidth: "120px" }}
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
                  align="left"
                >
                  {limitString(row.title, 63)}
                </TableCell>
                <TableCell
                  sx={{ borderBottomStyle: "dashed" }}
                  component="th"
                  scope="row"
                  align="center"
                >
                  <Box
                    sx={{
                      margin: "0 auto",
                      height: "40px",
                    }}
                  >
                    <img src={row.banners} alt="" style={{ height: "100%" }} />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ borderBottomStyle: "dashed" }}
                  component="th"
                  scope="row"
                  align="center"
                >
                  {getNameAuthor(row.userId)}
                </TableCell>
                <TableCell
                  sx={{ borderBottomStyle: "dashed" }}
                  component="th"
                  scope="row"
                  align="center"
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    {moment(row.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography sx={{ color: "#9193ab", fontSize: "12px" }}>
                    {moment(row.createdAt).format("h:mm A")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="right">
                  <Link to={`/blog/edit/${row.id}`}>
                    <IconButton>
                      <EditRoundedIcon color="warning" />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => {
                      getDataFromChild({
                        title: row.title,
                        id: row.id,
                      });
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
