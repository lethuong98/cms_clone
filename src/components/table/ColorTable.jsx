import React, { useEffect, useLayoutEffect, useState } from "react";
import Table from "@mui/material/Table";
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

export default function ColorTable({
  handleOpenModal,
  getDataFromChild,
  isSuccess,
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
      .get(`/color/get-all?page=${page}&rowsPerPage=${rowsPerPage}`)

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
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 400 }} aria-label="simple table" size="small">
          <TableHead
            sx={{ border: "none", backgroundColor: "#f4f6f8", height: "60px" }}
          >
            <TableRow>
              <TableCell sx={{ border: "none", width: "45%" }} align="center">
                Tên màu
              </TableCell>
              <TableCell sx={{ border: "none", width: "40%" }} align="center">
                Xem trước
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
                  align="center"
                >
                  {row.nameColor}
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
                      height: "30px",
                      width: "50px",
                      backgroundColor: row.previewColor,
                      border: "2px solid black",
                    }}
                  ></Box>
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="right">
                  <Link to={`/color/edit/${row.id}`}>
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
                      getDataFromChild({
                        nameColor: row.nameColor,
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
