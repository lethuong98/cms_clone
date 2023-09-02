import React, { useEffect, useState } from "react";
import { Box, Typography, Switch } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import api from "../../api/Request";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatCurrency } from "../../utils/Convert";

function Row(props) {
  const {
    row,
    showSize,
    showColor,
    showCategory,
    getDataFromChild,
    handleOpenModal,
    handleToggleNew,
    handleToggleSale,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
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
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Box
              sx={{
                minWidth: "45px",
                width: "45px",
                aspectRatio: "9/12",
                borderRadius: "8px",
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <img
                style={{ height: "100%" }}
                src={row.gallery[0].listLink.split(",")[0]}
                alt=""
              />
            </Box>
            <Box sx={{ height: "max-content" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                {row.nameProduct}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#acacac" }}>
                {showCategory(row.categoryId)}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="center">
          <Switch
            color="success"
            size="small"
            checked={row.newProduct}
            onChange={() => handleToggleNew(row.id, row.newProduct)}
          />
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="center">
          <Switch
            color="success"
            size="small"
            checked={row.saleProduct}
            onChange={() => handleToggleSale(row.id, row.saleProduct)}
          />
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          {formatCurrency(row.regularPrice)}
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          {formatCurrency(row.salePrice)}
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="left">
          {moment(row.createdAt).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell sx={{ borderBottomStyle: "dashed" }} align="center">
          {row.totalSold}
        </TableCell>
        <TableCell
          sx={{
            borderBottomStyle: "dashed",
            width: "100px",
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
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "12px",
              },
            }}
          >
            <Paper elevation={0} sx={{ width: 120 }}>
              <MenuList>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <VisibilityRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Xem
                  </ListItemText>
                </MenuItem>
                <Link
                  to={`/product/edit/${row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <EditRoundedIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "rgb(237, 108, 2)",
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      }}
                    >
                      Sửa
                    </ListItemText>
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    getDataFromChild({
                      nameProduct: row.nameProduct,
                      id: row.id,
                    });
                    handleOpenModal();
                  }}
                >
                  <ListItemIcon>
                    <DeleteRoundedIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: "rgb(211, 47, 47)",
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Xoá
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Popover>
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
              }}
            >
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Màu</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Đã bán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((rowDetail) => (
                    <TableRow key={rowDetail.id}>
                      <TableCell component="th" scope="row">
                        {showColor(rowDetail.colorId)}
                      </TableCell>
                      <TableCell align="center">
                        {showSize(rowDetail.sizeId)}
                      </TableCell>
                      <TableCell align="center">{rowDetail.quantity}</TableCell>
                      <TableCell align="center">{rowDetail.sold}</TableCell>
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
export default function ProductTable({
  handleOpenModal,
  getDataFromChild,
  isSuccess,
  searchKeyword,
  category,
  handleToggleNew,
  handleToggleSale,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [dataProduct, setDataProduct] = useState({ data: [], total: 0 });
  const [dataSize, setDataSize] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const showSize = (id) => {
    const size = dataSize.find((item) => item.id === id);
    if (size) {
      return size.nameSize;
    }
  };
  const showCategory = (id) => {
    const category = dataCategory.find((item) => item.id === id);
    if (category) {
      return category.nameCategory;
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
        `/product/get-all?searchKeyword=${searchKeyword}&category=${category}&size&color&page=${page}&rowsPerPage=${rowsPerPage}&newProduct=&saleProduct=&sorted=desc&sortBy=createdAt`
      )
      .then((res) => {
        setDataProduct(res.data);
      });
  }, [isSuccess, category, searchKeyword, page, rowsPerPage]);
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
    api.get(`/category/get-all?page=0&rowsPerPage=100`).then((res) => {
      setDataCategory(res.data.data);
    });
  }, []);
  return (
    <>
      <TableContainer elevation={0} component={Paper} sx={{ border: "none" }}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ border: "none", backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell sx={{ border: "none", minWidth: "250px" }}>
                Tên sản phẩm
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "80px", width: "80px" }}
                align="center"
              >
                New
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "80px", width: "80px" }}
                align="center"
              >
                Sale
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "100px", width: "100px" }}
                align="left"
              >
                Giá gốc
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "100px", width: "100px" }}
                align="left"
              >
                Giá sale
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "120px", width: "120px" }}
                align="left"
              >
                Ngày tạo
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "80px", width: "80px" }}
                align="left"
              >
                Đã bán
              </TableCell>
              <TableCell
                sx={{ border: "none", minWidth: "100px", width: "100px" }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProduct.data.map((row) => (
              <Row
                key={row.id}
                row={row}
                showSize={showSize}
                showCategory={showCategory}
                showColor={showColor}
                handleOpenModal={handleOpenModal}
                getDataFromChild={getDataFromChild}
                handleToggleNew={handleToggleNew}
                handleToggleSale={handleToggleSale}
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
