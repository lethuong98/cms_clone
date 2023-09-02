import {
  Box,
  useTheme,
  Typography,
  Breadcrumbs,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import OrderTable from "../../components/table/OrderTable";
import FormControl from "@mui/material/FormControl";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Product = () => {
  const [date, setDate] = useState(null);
  const theme = useTheme();
  const [searchKeyword, setSearchKeyword] = useState("");

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
        Danh sách đơn hàng
      </Typography>

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
        <Link to="/order" style={{ textDecoration: "none" }}>
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
            Đơn hàng
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14, color: "#acacac" }}>
          Danh sách đơn hàng
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
          backgroundColor: "white",
          marginTop: "48px",
          borderRadius: "16px",
        }}
      >
        <Box
          className="filter"
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px 16px 16px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            className="date"
            sx={{
              width: 200,
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Ngày mua"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  format="DD/MM/YYYY"
                  sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd":
                      {
                        borderRadius: "12px",
                      },
                    "& .MuiFormLabel-root.MuiInputLabel-root,.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd":
                      {
                        fontSize: "14px",
                      },
                    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd .MuiOutlinedInput-notchedOutline":
                      {
                        fontSize: "14px",
                      },
                    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box className="search" sx={{ flexGrow: 1 }}>
            <FormControl sx={{ width: "100%", pt: 1 }} variant="outlined">
              <OutlinedInput
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
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
          <OrderTable
            searchKeyword={searchKeyword}
            date={date ? dayjs(date).format("DD-MM-YYYY") : ""}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
