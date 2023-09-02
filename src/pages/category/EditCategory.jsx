import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  useTheme,
  Typography,
  Breadcrumbs,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../api/Request";
import { toast } from "react-toastify";

const EditCategory = () => {
  // declare
  const navigate = useNavigate();
  const theme = useTheme();

  const { id } = useParams();

  const schema = yup.object().shape({
    nameCategory: yup
      .string()
      .trim()
      .required("Tên danh mục không được để trống")
      .max(30, "Tên danh mục không dài quá 30 kí tự"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameCategory: " ",
    },
  });
  useEffect(() => {
    if (id) {
      api.get(`/category/get-one/${id}`).then((res) => {
        setValue("nameCategory", res.data.data.nameCategory);
      });
    }
  });
  // method

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
        Sửa danh mục
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
        <Link to="/category" style={{ textDecoration: "none" }}>
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
            Danh mục
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14, color: "#acacac" }}>
          Sửa danh mục
        </Typography>
      </Breadcrumbs>
      {/* table */}
      <Box
        sx={{
          boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
          padding: "24px",
          marginTop: "48px",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor:'#fff'
        }}
      >
        <form
          onSubmit={handleSubmit((data) => {
            const formDataUpdateCategory = new FormData();
            formDataUpdateCategory.append("nameCategory", data.nameCategory);
            api
              .put(`/category/update/${id}`, formDataUpdateCategory)
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
                navigate("/category");
              })
              .catch((err) => {
                toast.error(err.response.data.message, {
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
          })}
        >
          <Box>
            <TextField
              {...register("nameCategory")}
              autoComplete="on"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .Mui-focused.MuiFormLabel-root": {
                  color: "black",
                },
                "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black",
                  },
              }}
              label="Tên danh mục"
              variant="outlined"
            />
            <Box sx={{ height: "16px" }}>
              <Typography
                color="error"
                component="p"
                sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
              >
                {errors?.nameCategory && errors.nameCategory.message}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: "16px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "8px",
                bgcolor: "rgba(0,0,0,0.8)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              Cập nhật
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditCategory;
