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

import { Link, useNavigate } from "react-router-dom";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import api from "../../api/Request";
import { toast } from "react-toastify";

const AddBanners = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [banners, setBanners] = useState("");

  const handleChangeBanners = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setBanners(file);
    }
  };
  const schema = yup.object().shape({
    nameBanners: yup
      .string()
      .trim()
      .required("Tên banners không được để trống")
      .max(150, "Tên banners không dài quá 150 kí tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // method
  useEffect(() => {
    return () => {
      banners && URL.revokeObjectURL(banners.preview);
    };
  }, [banners]);
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
        Thêm banners mới
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
        <Link to="/banners" style={{ textDecoration: "none" }}>
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
            Banners
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14, color: "#acacac" }}>
          Thêm banners mới
        </Typography>
      </Breadcrumbs>
      {/* table */}
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
          padding: "24px",
          marginTop: "48px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={handleSubmit((data) => {
            const formDataAddBanners = new FormData();
            formDataAddBanners.append("nameBanners", data.nameBanners);
            formDataAddBanners.append("preview", banners);
            api
              .post("/banners/create", formDataAddBanners)
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
                navigate("/banners");
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "24px",
            }}
          >
            <Box>
              <TextField
                {...register("nameBanners")}
                autoComplete="on"
                sx={{
                  width: "100%",
                  "& .MuiFormLabel-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                  },
                  "& .Mui-focused.MuiFormLabel-root": {
                    color: "black",
                  },
                  "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
                label="Tên banners"
                variant="outlined"
              />
              <Box sx={{ height: "16px" }}>
                <Typography
                  color="error"
                  component="p"
                  sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                >
                  {errors?.nameBanners && errors.nameBanners.message}
                </Typography>
              </Box>
            </Box>
            <Box>
              <label htmlFor={`banners`}>
                <Box
                  sx={{
                    backgroundColor: "#f4f6f8",
                    height: "53.13px",
                    border: "1px dashed rgba(145, 158, 171, 0.2)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloudUploadRoundedIcon
                    sx={{ color: "#469fa4", fontSize: "40px" }}
                  />
                </Box>

                <input
                  type="file"
                  id={`banners`}
                  onChange={handleChangeBanners}
                  style={{ display: "none" }}
                />
              </label>
            </Box>
          </Box>
          <Box>
            {banners && (
              <img src={banners.preview} alt="" style={{ width: "100%" }} />
            )}
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
              Thêm
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddBanners;
