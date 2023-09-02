import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Request";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const schema = yup.object().shape({
    nameProduct: yup
      .string()
      .trim()
      .required("Tên sản phẩm không được để trống")
      .max(60, "Tên sản phẩm không đƯợc dài quá 60 kí tự"),
    categoryId: yup.string().required("Danh mục không được để trống"),
    regularPrice: yup
      .number()
      .required("Giá gốc không được để trống")
      .min(1, "Giá gốc phải lớn 0"),
    salePrice: yup
      .number()
      .required("Giá sale không được để trống")
      .min(1, "Giá sale phải lớn 0"),
    weight: yup.string().trim().required("Khối lượng không được để trống"),
    dimensions: yup.string().trim().required("Kích thước không được để trống"),
    materials: yup.string().trim().required("Chất liệu không được để trống"),
    other: yup.string().trim().required("Thông tin khác không được để trống"),
    subDesc: yup
      .string()
      .trim()
      .required("Mô tả ngắn không được để trống")
      .max(300, "Mô tả ngắn không được dài quá 300 kí tự"),
    desc: yup
      .string()
      .trim()
      .required("Mô tả không được để trống")
      .max(1500, "Mô tả không được dài quá 1500 kí tự"),
    size: yup.array().min(1, "Sản phẩm phải có ít nhất 1 size"),
    quantity: yup
      .number()
      .required("Số lượng không được bỏ trống")
      .min(1, "Số lượng phải lớn hơn 0"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nameProduct: "",
      regularPrice: 0,
      categoryId: '',
      salePrice: 0,
      weight: "",
      dimensions: "",
      materials: "",
      other: "",
      subDesc: "",
      desc: "",
      size: [],
      color: [],
      quantity: 0,
    },
  });

  const [dataCategory, setDataCategory] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [color, setColor] = useState([{ color: "", gallery: [] }]);
  const [size, setSize] = useState([]);
  const handleChangeGallery = (e, index) => {
    const files = e.target.files;
    if (files) {
      // remove Object URL
      color[index].gallery &&
        color[index].gallery.map((item) => URL.revokeObjectURL(item.preview));
      let newGallery = [];
      for (let i = 0; i < files.length; i++) {
        files[i].preview = URL.createObjectURL(files[i]);
        newGallery.push(files[i]);
      }
      setColor((prev) => {
        const newColor = [...prev];
        newColor[index].gallery = newGallery;
        return newColor;
      });
    }
  };
  const handleAddColor = () => {
    setColor((prev) => [...prev, { color: "", gallery: [] }]);
  };
  const handleRemoveColor = (e, index) => {
    setColor((prev) => {
      const newColor = [...prev];
      newColor.splice(index, 1);
      return newColor;
    });
  };
  const handleRemoveImage = (index, index2) => {
    URL.revokeObjectURL(color[index].gallery[index2].preview);
    setColor((prev) => {
      const newValue = [...prev];
      newValue[index].gallery.splice(index2, 1);
      return newValue;
    });
  };
  const handleChangeColor = (e, index) => {
    setColor((prev) => {
      const newColor = [...prev];
      newColor[index].color = e.target.value;
      return newColor;
    });
  };

  const handleChangeSize = (e) => {
    const {
      target: { value },
    } = e;
    setSize(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    api.get(`/category/get-all?page=0&rowsPerPage=100`).then((res) => {
      setDataCategory(res.data.data);
    });
  }, []);
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
        Thêm sản phẩm mới
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
          Thêm sản phẩm mới
        </Typography>
      </Breadcrumbs>
      <form
        onSubmit={handleSubmit((data) => {
          const formDataAddProduct = new FormData();
          const valueColor = [];
          const filterGallery = [];
          const valueSize = data.size.map((item) => dataSize[item].id);
          color.map((item) => {
            if (item.color === "" || item.gallery.length === 0) {
              toast.warning("Vui lòng chọn màu và thêm ảnh", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              return;
            }
            valueColor.push(item.color);
            filterGallery.push(
              dataColor.find((item2) => item2.id === Number(item.color))
                .nameColor
            );
            item.gallery.map((item) =>
              formDataAddProduct.append("gallery", item)
            );
          });

          formDataAddProduct.append("nameProduct", data.nameProduct);
          formDataAddProduct.append("categoryId", data.categoryId);
          formDataAddProduct.append("regularPrice", data.regularPrice);
          formDataAddProduct.append("salePrice", data.salePrice);
          formDataAddProduct.append("weight", data.weight);
          formDataAddProduct.append("dimensions", data.dimensions);
          formDataAddProduct.append("materials", data.materials);
          formDataAddProduct.append("other", data.other);
          formDataAddProduct.append("subDesc", data.subDesc);
          formDataAddProduct.append("desc", data.desc);
          formDataAddProduct.append("size", valueSize);
          formDataAddProduct.append("color", valueColor);
          formDataAddProduct.append("quantity", data.quantity);
          formDataAddProduct.append("filterGallery", filterGallery);

          api.post("/product/create", formDataAddProduct).then((res) => {
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
            navigate("/product");
          });
        })}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "48px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            Thông tin chung
          </Typography>
          <Box
            sx={{
              boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
              backgroundColor: "white",
              borderRadius: "16px",
              p: "24px",
              width: "70%",
              [theme.breakpoints.down("lg")]: {
                width: "100%",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                display: "none",
                [theme.breakpoints.down("lg")]: {
                  display: "block",
                  marginBottom: "24px",
                },
              }}
            >
              Thông tin chung
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 24px",
                [theme.breakpoints.down("sm")]: {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <Box>
                {/* Tên sản phẩm */}
                <TextField
                  {...register("nameProduct")}
                  autoComplete="off"
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
                  label="Tên sản phẩm"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.nameProduct && errors.nameProduct.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {/* Danh mục sản phẩm */}
                <FormControl fullWidth>
                  <InputLabel
                    id="role-select-label"
                    sx={{
                      fontSize: "14px",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    }}
                  >
                    Danh mục
                  </InputLabel>
                  <Controller
                    control={control}
                    name="categoryId"
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <Select
                          inputRef={ref}
                          labelId="role-select-label"
                          id="role-select"
                          label="Danh mục"
                          value={value}
                          onChange={(val) => {
                            onChange(val);
                          }}
                          sx={{
                            borderRadius: "12px",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "black",
                            },
                          }}
                        >
                          {dataCategory.map((item, index) => {
                            return (
                              <MenuItem
                                key={index}
                                sx={{ fontSize: "14px" }}
                                value={item.id}
                              >
                                {item.nameCategory}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                </FormControl>
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.categoryId && errors.categoryId.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {/* Giá gốc */}
                <TextField
                  {...register("regularPrice")}
                  autoComplete="off"
                  type="number"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Giá gốc"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.regularPrice && errors.regularPrice.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {/* Giá sale */}
                <TextField
                  {...register("salePrice")}
                  autoComplete="off"
                  type="number"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Giá sale"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.salePrice && errors.salePrice.message}
                  </Typography>
                </Box>
              </Box>
              {/* Khối lượng*/}
              <Box>
                <TextField
                  {...register("weight")}
                  autoComplete="off"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Khối lượng"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.weight && errors.weight.message}
                  </Typography>
                </Box>
              </Box>
              {/* Kích thước  */}
              <Box>
                <TextField
                  {...register("dimensions")}
                  autoComplete="off"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Kích thước"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.dimensions && errors.dimensions.message}
                  </Typography>
                </Box>
              </Box>

              {/* Chất liệu */}

              <Box>
                <TextField
                  {...register("materials")}
                  autoComplete="off"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Chất liệu"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.materials && errors.materials.message}
                  </Typography>
                </Box>
              </Box>

              {/* thông tin khác */}

              <Box>
                <TextField
                  {...register("other")}
                  autoComplete="off"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Thông tin khác"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.other && errors.other.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box mt="8px">
              {/* Mô tả ngắn */}
              <TextField
                {...register("subDesc")}
                autoComplete="off"
                sx={{
                  width: "100%",
                  "& .MuiFormLabel-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                  },
                  "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                    },
                  "& .Mui-focused.MuiFormLabel-root": {
                    color: "black",
                  },
                  "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
                label="Mô tả ngắn"
                variant="outlined"
                multiline
                rows={5}
              />
              <Box sx={{ height: "16px" }}>
                <Typography
                  color="error"
                  component="p"
                  sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                >
                  {errors?.subDesc && errors.subDesc.message}
                </Typography>
              </Box>
            </Box>
            <Box>
              {/* Mô tả */}
              <TextField
                {...register("desc")}
                autoComplete="off"
                sx={{
                  mt: 1,
                  width: "100%",
                  "& .MuiFormLabel-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                  },
                  "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                    },
                  "& .Mui-focused.MuiFormLabel-root": {
                    color: "black",
                  },
                  "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
                label="Mô tả"
                variant="outlined"
                multiline
                rows={10}
              />
              <Box sx={{ height: "16px" }}>
                <Typography
                  color="error"
                  component="p"
                  sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                >
                  {errors?.desc && errors.desc.message}
                </Typography>
              </Box>
            </Box>
            {/* gallery */}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "48px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            Màu, ảnh
          </Typography>
          <Box
            sx={{
              width: "70%",
              [theme.breakpoints.down("lg")]: {
                width: "100%",
              },
            }}
          >
            {color.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    p: "24px",
                    position: "relative",
                    mb: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "700",
                      display: "none",
                      [theme.breakpoints.down("lg")]: {
                        display: "block",
                        marginBottom: "24px",
                      },
                    }}
                  >
                    Màu, ảnh
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "3fr 1fr",
                      gap: "24px",
                      [theme.breakpoints.down("sm")]: {
                        gridTemplateColumns: "1fr",
                      },
                    }}
                  >
                    {index > 0 && (
                      <CancelRoundedIcon
                        onClick={(e) => handleRemoveColor(e, index)}
                        sx={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          color: "#222222a6",
                          cursor: "pointer",
                        }}
                      />
                    )}

                    <Box>
                      <FormControl fullWidth>
                        <InputLabel
                          id="role-select-label"
                          sx={{
                            "&.Mui-focused": {
                              color: "black",
                            },
                          }}
                        >
                          Màu
                        </InputLabel>

                        <Select
                          labelId="color-select-label"
                          id="color-select"
                          label="Màu"
                          value={item.color}
                          onChange={(e) => handleChangeColor(e, index)}
                          sx={{
                            fontSize: "14px",
                            borderRadius: "8px",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "black",
                            },
                          }}
                        >
                          {dataColor.map((item) => {
                            return (
                              <MenuItem
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  "& .MuiButtonBase-root": {
                                    padding: 0,
                                  },
                                }}
                                key={item.id}
                                value={item.id}
                              >
                                <Box
                                  sx={{
                                    ml: 1,
                                    height: "14px",
                                    width: "20px",
                                    backgroundColor: item.previewColor,
                                    border: "1px solid black",
                                    mr: "4px",
                                    display: "inline-block",
                                  }}
                                ></Box>
                                <ListItemText
                                  sx={{
                                    margin: 0,
                                    height: "20px",
                                    display: "inline-block",
                                    "& .MuiTypography-root": {
                                      fontSize: "14px",
                                    },
                                  }}
                                  primary={item?.nameColor}
                                />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <label htmlFor={`upload${index}`}>
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
                          multiple
                          type="file"
                          id={`upload${index}`}
                          onChange={(e) => {
                            handleChangeGallery(e, index);
                          }}
                          style={{ display: "none" }}
                        />
                      </label>
                    </Box>
                  </Box>
                  {color[index].gallery.length > 0 && (
                    <Box
                      className="preview"
                      sx={{
                        mt: "24px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        gap: "8px",
                        [theme.breakpoints.down("sm")]: {
                          gridTemplateColumns: "1fr 1fr 1fr",
                        },
                      }}
                    >
                      {color[index].gallery &&
                        color[index].gallery.map((item, index2) => {
                          return (
                            <Box
                              key={index2}
                              sx={{
                                position: "relative",
                              }}
                            >
                              <img
                                src={item.preview}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: "6px",
                                }}
                              />
                              <CancelRoundedIcon
                                onClick={() => handleRemoveImage(index, index2)}
                                sx={{
                                  position: "absolute",
                                  top: "4px",
                                  right: "4px",
                                  color: "#222222a6",
                                  cursor: "pointer",
                                }}
                              />
                            </Box>
                          );
                        })}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", mt: "4px" }}>
          <Button
            onClick={handleAddColor}
            variant="contained"
            sx={{
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.8)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            Thêm màu
          </Button>
        </Box>

        {/* SIZE VÀ SỐ LƯỢNG */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            Size, số lượng
          </Typography>
          <Box
            sx={{
              boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
              backgroundColor: "white",
              width: "70%",
              borderRadius: "16px",
              p: "24px",
              [theme.breakpoints.down("lg")]: {
                width: "100%",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                display: "none",
                [theme.breakpoints.down("lg")]: {
                  display: "block",
                  marginBottom: "24px",
                },
              }}
            >
              Size, số lượng
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: "24px",
                gridTemplateColumns: "1fr 1fr",
                [theme.breakpoints.down("sm")]: {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <Box>
                <FormControl fullWidth>
                  <InputLabel
                    id="role-select-label"
                    sx={{
                      "&.Mui-focused": {
                        color: "black",
                      },
                    }}
                  >
                    Size
                  </InputLabel>
                  <Controller
                    control={control}
                    name="size"
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <Select
                          inputRef={ref}
                          labelId="role-select-label"
                          id="role-select"
                          label="Size"
                          value={value}
                          onChange={(val) => {
                            handleChangeSize(val);
                            onChange(val);
                          }}
                          sx={{
                            fontSize: "14px",
                            borderRadius: "8px",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "black",
                            },
                          }}
                          multiple
                          renderValue={(selected) => {
                            return selected
                              .map((item) => {
                                return dataSize[item]?.nameSize;
                              })
                              .join(", ");
                          }}
                        >
                          {dataSize.map((item, index) => {
                            return (
                              <MenuItem
                                sx={{
                                  "& .MuiButtonBase-root": {
                                    padding: 0,
                                  },
                                }}
                                key={index}
                                value={index}
                              >
                                <Checkbox
                                  size="small"
                                  checked={size.indexOf(index) > -1}
                                />
                                <ListItemText
                                  sx={{
                                    ml: "4px",
                                    display: "inline-block",
                                    "& .MuiTypography-root": {
                                      fontSize: "14px",
                                    },
                                  }}
                                  primary={item?.nameSize}
                                />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                </FormControl>
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.size && errors.size.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {/* Số lượng */}
                <TextField
                  {...register("quantity")}
                  autoComplete="off"
                  type="number"
                  sx={{
                    width: "100%",
                    "& .MuiFormLabel-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root": {
                      borderRadius: "8px",
                      fontSize: "14px",
                    },
                    "& input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                      },
                    "& .Mui-focused.MuiFormLabel-root": {
                      color: "black",
                    },
                    "& .Mui-focused.MuiInputBase-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "black",
                      },
                  }}
                  label="Số lượng"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.quantity && errors.quantity.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", mt: "16px" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              height: "50px",
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.8)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            Thêm sản phẩm
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
