import {
  Box,
  TextField,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Request";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => {
    const email = Cookies.get("email");
    if (email) {
      return email;
    }
    return "";
  });
  const [password, setPassword] = useState(() => {
    const password = Cookies.get("password");
    if (password) {
      return password;
    }
    return "";
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickLoggin = async () => {
    const dataLogin = new FormData();
    dataLogin.append("email", email);
    dataLogin.append("password", password);
    await api
      .post("/auth/login", dataLogin)
      .then((res) => {
        const data = res.data;

        if (data) {
          if (remember) {
            Cookies.set("email", email);
            Cookies.set("password", password);
          } else {
            Cookies.remove("email");
            Cookies.remove("password");
          }
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("fullName", data.data.fullName);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("avatar", data.data.avatar);
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("phoneNumber", data.data.phoneNumber);
          localStorage.setItem("address", data.data.address);
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        const data = err.response.data;
        if (data) {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  return (
    <Box sx={{ background: "#f4f6f8", position: "fixed", inset: 0 }}>
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}></Box>
      <Box
        sx={{
          width: 400,
          p: "24px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          bgcolor: "white",
          borderRadius: "16px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: "40px",
            textTransform: "uppercase",
          }}
        >
          ĐĂNG NHẬP
        </Typography>
        <form>
          <TextField
            sx={{
              width: "100%",
              mb: "20px",
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          />
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                "&.Mui-focused": {
                  color: "black",
                },
              }}
            >
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              sx={{
                width: "100%",
                borderRadius: "8px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Lưu mật khẩu"
            />
          </FormGroup>
          <Button
            variant="contained"
            onClick={handleClickLoggin}
            sx={{
              bgcolor: "rgba(0,0,0,.8)",
              width: "100%",
              mt: "8px",
              height: "56px",
              borderRadius: "10px",
              "&:hover": {
                bgcolor: "rgba(0,0,0,.9)",
              },
            }}
          >
            Đăng nhập
          </Button>
        </form>       
      </Box>
    </Box>
  );
};

export default Login;
