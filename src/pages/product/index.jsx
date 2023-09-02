import {
  Box,
  useTheme,
  Modal,
  Typography,
  Breadcrumbs,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductTable from "../../components/table/ProductTable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";
import api from "../../api/Request";
import { toast } from "react-toastify";

const Product = () => {
  const [category, setCategory] = React.useState("");
  const [dataCategory, setDataCategory] = useState([
    { id: 0, nameCategory: "Tất cả" },
  ]);
  const theme = useTheme();
  const [dataFromChild, setDataFromChild] = useState({
    nameProduct: "No name",
  });
  const [isSuccess, setSuccess] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const getDataFromChild = (data) => {
    setDataFromChild(data);
  };
  const handleToggleNew = (id, valueNew) => {
   
    const dataToggleNew = new FormData();
    dataToggleNew.append("newProduct", valueNew);
    api.put(`/product/toggle-new/${id}`, dataToggleNew).then(() => {
      setSuccess(!isSuccess);
    });
  };
  const handleToggleSale = (id, valueSale) => {
    const dataToggleSale = new FormData();
    dataToggleSale.append("saleProduct", valueSale);
    api.put(`/product/toggle-sale/${id}`, dataToggleSale).then(() => {
      setSuccess(!isSuccess);
    });
  };
  const handleDeleteProduct = () => {
    handleClose();
    if (!dataFromChild.id) {
      return;
    }
    api
      .delete(`/product/delete/${dataFromChild.id}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSuccess(!isSuccess);
      })
      .catch((errer) => {
        toast.error(errer.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  useEffect(() => {
    api.get(`/category/get-all?page=0&rowsPerPage=100`).then((res) => {
      setDataCategory((prev) => {
        const data = res.data.data;
        data.unshift(prev[0]);
        return data;
      });
    });
  }, []);
  return (
    <Box
      sx={{
        marginBottom: "80px",
        padding: "30px 40px",
        transition: theme.transitions.create(["all"], {
          easing: theme.transitions.easing.sharp,
          duration: 300,
        }),
        [theme.breakpoints.down("lg")]: {
          padding: "30px 16px",
          marginBottom: "70px",
        },
        [theme.breakpoints.down("md")]: {
          marginTop: "70px",
          marginBottom: "0",
        },
        [theme.breakpoints.down("sm")]: {
          marginBottom: "0",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            marginBottom: "12px",
            fontWeight: 700,
            [theme.breakpoints.down("lg")]: {
              fontSize: 20,
            },
            [theme.breakpoints.down("md")]: {
              fontSize: 18,
            },
          }}
        >
          Danh sách sản phẩm
        </Typography>
        <Link to="/product/add">
          <Button
            variant="contained"
            sx={{
              minWidth: 0,
              borderRadius: "12px",
              backgroundColor: "black",
              height: "50px",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
              [theme.breakpoints.down("lg")]: {
                height: "40px",
                fontSize: "14px",
              },
              [theme.breakpoints.down("md")]: {
                height: "max-content",
                fontSize: "12px",
                padding: "6px",
              },
            }}
          >
            <AddRoundedIcon
              sx={{
                display: "none",
                fontSize: "18px",
                [theme.breakpoints.down("sm")]: {
                  display: "block",
                },
              }}
            />
            <Typography
              sx={{
                fontSize: "14px",
                [theme.breakpoints.down("lg")]: {
                  fontSize: "12px",
                },
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              Thêm sản phẩm mới
            </Typography>
          </Button>
        </Link>
      </Box>
      <Breadcrumbs
        sx={{ fontSize: 14, color: "#212b36" }}
        aria-label="breadcrumb"
        separator="›"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: 14,
              color: "#212b36",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Home
          </Typography>
        </Link>
        <Link to="/product" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: 14,
              color: "#212b36",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sản phẩm
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14, color: "#acacac" }}>
          Danh sách sản phẩm
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
          backgroundColor: "white",
          marginTop: "48px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          className="filter"
          sx={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            className="category"
            sx={{
              width: 200,
              height: 53,
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="category-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "black",
                  },
                  "&.MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":
                    {
                      fontSize: "14px",
                    },
                }}
              >
                Danh mục
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="Danh mục"
                onChange={handleChangeCategory}
                sx={{
                  fontSize: "14px",
                  borderRadius: "12px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                {dataCategory.map((item) => {
                  return (
                    <MenuItem key={item} value={item.id}>
                      {item.nameCategory}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box className="search" sx={{ flexGrow: 1 }}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="levanthuong"
                placeholder="Search"
                id="outlined-adornment-weight"
                startAdornment={
                  <InputAdornment position="end">
                    <SearchRoundedIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                sx={{
                  borderRadius: "12px",
                  paddingLeft: "4px",
                  gap: "4px",
                  fontSize: "14px",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box>
          <ProductTable
            category={category ? category : ""}
            searchKeyword={searchKeyword}
            isSuccess={isSuccess}
            handleOpenModal={handleOpen}
            getDataFromChild={getDataFromChild}
            handleToggleNew={handleToggleNew}
            handleToggleSale={handleToggleSale}
          />
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            XÁC NHẬN XOÁ
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Bạn có chắc muốn xoá sản phẩm{" "}
            <span style={{ fontWeight: "bold" }}>
              {dataFromChild?.nameProduct}
            </span>{" "}
            không!
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handleDeleteProduct}
              variant="container"
              sx={{
                backgroundColor: "#ff3030",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#ff3030",
                },
              }}
            >
              Xoá
            </Button>
            <Button
              variant="text"
              onClick={handleClose}
              sx={{
                color: "#212b36",
                borderRadius: "10px",
                backgroundColor: "#f4f6f8",
              }}
            >
              huỷ
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Product;
