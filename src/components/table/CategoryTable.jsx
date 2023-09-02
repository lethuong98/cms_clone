import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
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

export default function CategoryTable({
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
      .get(`/category/get-all?page=${page}&rowsPerPage=${rowsPerPage}`)

      .then((res) => {
        // handle success
        setData(res.data);
        if (res.data.total <= page * rowsPerPage) {
          setPage(0);
        }
      })
  }, [isSuccess, page, rowsPerPage]);
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead
            sx={{ border: "none", backgroundColor: "#f4f6f8", height: "60px" }}
          >
            <TableRow>
              <TableCell sx={{ border: "none", width: "85%" }} align="center">
                Tên danh mục
              </TableCell>
              <TableCell
                sx={{ border: "none", width: "120px", minWidth:'120px' }}
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
                  {row.nameCategory}
                </TableCell>
                <TableCell sx={{ borderBottomStyle: "dashed" }} align="right">
                  <Link to={`/category/edit/${row.id}`}>
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
                      getDataFromChild({ nameCategory: row.nameCategory, id: row.id });
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
