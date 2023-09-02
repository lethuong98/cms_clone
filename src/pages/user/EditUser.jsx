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
} from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import api from "../../api/Request";
import { toast } from "react-toastify";

const EditUser = () => {
  // declare
  const navigate = useNavigate();
  const theme = useTheme();
  const [avatar, setAvatar] = useState({ preview: "" });
  const [previous, setPrevious] = useState("");
  const [changeAvatar, setChangeAvatar] = useState(false);

  const { id } = useParams();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .trim()
      .required("Họ tên không được để trống")
      .max(30, "Họ tên không dài quá 30 kí tự"),
    email: yup
      .string()
      .email("vui lòng kiểm tra lại email")
      .trim()
      .required("Email không được để trống")
      .max(30, "Email không dài quá 30 kí tự"),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(/\d{10,11}/, "Số điện thoại phải dài từ 10 đến 11 kí tự"),
    address: yup
      .string()
      .trim()
      .required("Địa chỉ không được để trống")
      .max(100, "Không dài quá 100 kí tự"),
    hobby: yup
      .string()
      .trim()
      .required("Sở thích không được để trống")
      .max(20, "Không dài quá 20 kí tự"),
    role: yup.number().required("Vai trò không được để trống"),
    // password: yup
    //   .string()
    //   .trim()
    //   .required("Mật khẩu không được để trống")
    //   .matches(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    //     "Mật khẩu phải chưa ít nhất 1 chữ HOA, 1 chữ thường và 1 số độ dài từ 8 đến 16 kí tự"
    //   ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: " ",
      email: " ",
      phoneNumber: "90",
      address: " ",
      hobby: " ",
      role: "1",
    },
  });
  // method

  const handleChangeAvatar = (e) => {
    setChangeAvatar(true);
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };
  useEffect(() => {
    if (id) {
      api.get(`/user/get-one/${id}`).then((res) => {
        console.log(res.data.data)
        setValue("fullName", res.data.data.fullName);
        setValue("email", res.data.data.email);
        setValue("phoneNumber", res.data.data.phoneNumber);
        setValue("address", res.data.data.address);
        setValue("hobby", res.data.data.hobby);
        setValue("role", res.data.data.role);
        setAvatar((prev) => {
          return { ...prev, preview: res.data.data.avatar };
        });
        setPrevious(res.data.data.avatar);
      });
    }
  }, []);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
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
      <Box>
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
          Sửa thông tin tài khoản
        </Typography>
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
        <Link to="/user" style={{ textDecoration: "none" }}>
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
            Tài khoản
          </Typography>
        </Link>
        <Typography
          sx={{ fontSize: 14, color: "#acacac" }}
        >
          Sửa thông tin tài khoản
        </Typography>
      </Breadcrumbs>
      {/* table */}
      <Box
        sx={{
          display: "flex",
          gap: "24px",
          marginTop: "48px",
          height: "max-content",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            flexShrink: 0,
            width: "270px",
            p: "24px",
            bgcolor: "white",
            borderRadius: "16px",
            position: "relative",
            [theme.breakpoints.down("lg")]: {
              height: "300px",
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50% , -50%)",
              border: "1px dashed #949494",
            }}
          ></Box>
          <Box
            sx={{
              width: "145px",
              height: "145px",
              borderRadius: "50%",
              bgcolor: "#ababab14",
              position: "absolute",
              top: "50%",
              left: "50%",
              cursor: "pointer",
              transform: "translate(-50% , -50%)",
              "&:hover": {
                bgcolor: "#f4f6f8",
              },
            }}
          >
            <Typography sx={{ textAlign: "center", mt: "30%" }}>
              <AddAPhotoIcon sx={{ color: "#637381" }} />
            </Typography>
            <Typography
              sx={{ color: "#637381", textAlign: "center", fontSize: "12px" }}
            >
              Upload photo
            </Typography>
          </Box>
          <Box
            sx={{
              width: "145px",
              height: "145px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50% , -50%)",
              overflow: "hidden",
              display: avatar ? "block" : "none",
            }}
          >
            {avatar.preview && (
              <img
                alt="not found"
                width="100%"
                height="100%"
                src={avatar.preview}
              />
            )}
          </Box>

          <Box
            sx={{
              width: "145px",
              height: "145px",
              borderRadius: "50%",
              bgcolor: "#ababab14",
              position: "absolute",
              top: "50%",
              left: "50%",
              cursor: "pointer",
              transform: "translate(-50% , -50%)",
            }}
          >
            <form>
              <label
                htmlFor="upload"
                style={{
                  width: "145px",
                  height: "145px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  bgcolor: "#f4f6f824",
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <Box
                  sx={{
                    width: "145px",
                    height: "145px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    bgcolor: "#f4f6f824",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                ></Box>

                <input
                  name="avatar"
                  type="file"
                  id="upload"
                  style={{ display: "none" }}
                  onChange={handleChangeAvatar}
                />
              </label>
            </form>
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: "12px", color: "#637381", textAlign: "center" }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#637381", textAlign: "center" }}
            >
              max size of 3.1 MB
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            flexGrow: 1,
            bgcolor: "white",
            borderRadius: "16px",
            p: "24px",
          }}
        >
          <form
            onSubmit={handleSubmit((data) => {              
              const formDataEditUser = new FormData();
              formDataEditUser.append("fullName", data.fullName);
              formDataEditUser.append("email", data.email);
              formDataEditUser.append("phoneNumber", data.phoneNumber);
              formDataEditUser.append("address", data.address);
              formDataEditUser.append("hobby", data.hobby);
              formDataEditUser.append("role", data.role);
              if (changeAvatar) {
                formDataEditUser.append("avatar", avatar);
              }
              if (previous && changeAvatar) {
                formDataEditUser.append("prevAvatar", previous);
              }

              api
                .put(`/user/update/${id}`, formDataEditUser)
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
                  navigate("/user");
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
                gap: "8px 24px",
                gridTemplateColumns: "1fr 1fr",
                [theme.breakpoints.down("sm")]: {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <Box>
                <TextField
                  {...register("fullName")}
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
                  label="Họ tên"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.fullName && errors.fullName.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  {...register("email")}
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
                  label="Email"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.email && errors.email.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  {...register("phoneNumber")}
                  autoComplete="on"
                  type="number"
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
                  label="Số điện thoại"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  {...register("address")}
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
                  label="Địa chỉ"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.address && errors.address.message}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  {...register("hobby")}
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
                  label="Sở thích"
                  variant="outlined"
                />
                <Box sx={{ height: "16px" }}>
                  <Typography
                    color="error"
                    component="p"
                    sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
                  >
                    {errors?.hobby && errors.hobby.message}
                  </Typography>
                </Box>
              </Box>
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
                    Vai trò
                  </InputLabel>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <Select
                          inputRef={ref}
                          labelId="role-select-label"
                          id="role-select"
                          label="Vai trò"
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
                          <MenuItem value={1}>Quản trị viên</MenuItem>
                          <MenuItem value={2}>Biên tập viên</MenuItem>
                          <MenuItem value={3}>Khách hàng</MenuItem>
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
                    {errors?.role && errors.role.message}
                  </Typography>
                </Box>
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
                Lưu thay đổi
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUser;
