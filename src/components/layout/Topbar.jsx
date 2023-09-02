import {
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import Cookies from "js-cookie";
import api from "../../api/Request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      const formData = new FormData();
      formData.append("refreshToken", refreshToken);
      api
        .post("/auth/logout", formData)
        .then((res) => {
          localStorage.clear();
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
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
          navigate("/auth/login");
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
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "rgba(249, 250, 251, 1)",
        height: 70,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 5,
        gap: "4px",
        [theme.breakpoints.down("lg")]: {
          paddingInline: 2,
        },
        [theme.breakpoints.down("md")]: {
          height: "64px",
          position: "fixed",
          zIndex: 10,
          top: 0,
          right: 0,
          left: 0,
        },
      }}
    >
      <Box>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            display: "none",
            [theme.breakpoints.down("md")]: {
              display: "block",
            },
          }}
        >
          <SubjectRoundedIcon
            sx={{ width: 28, height: 28, color: "#637381" }}
          />
        </IconButton>
      </Box>
      <Box>
        <Badge
          badgeContent={4}
          color="warning"
          sx={{
            "& .css-x3w4s2-MuiBadge-badge": {
              top: "10px",
              right: "9px",
            },
          }}
        >
          <IconButton>
            <NotificationsRoundedIcon
              sx={{ width: 28, height: 28, color: "#637381" }}
            />
          </IconButton>
        </Badge>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, position: "relative" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt=""
            src={localStorage.getItem("avatar")}
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
              backgroundColor: "rgba(255,255,255,1)",
              width: "200px",
              // left: "1138px !important",
              borderRadius: "10px",
            },
          }}
        >
          <Box sx={{ padding: "16px", borderBottom: "1px dashed #919eab33" }}>
            <Typography
              sx={{
                color: "#212b36",
                fontWeight: 600,
                fontSize: "14px",
                textAlign: "start",
              }}
            >
              {localStorage.getItem("fullName") || "No name"}
            </Typography>
            <Typography
              sx={{
                color: "#637381",
                fontSize: "14px",
                textAlign: "start",
              }}
            >
              {localStorage.getItem("email") || "No email"}
            </Typography>
          </Box>
          <Box p={1} sx={{ borderBottom: "1px dashed #919eab33" }}>
            <MenuItem
              sx={{
                borderRadius: "6px",
                padding: "6px 8px",
                color: "#212b36",
                fontSize: "14px",
              }}
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: "6px",
                padding: "6px 8px",
                color: "#212b36",
                fontSize: "14px",
              }}
              onClick={handleClose}
            >
              Settings
            </MenuItem>
          </Box>
          <Box p={1}>
            <MenuItem
              sx={{
                borderRadius: "6px",
                padding: "6px 8px",
                color: "#212b36",
                fontSize: "14px",
                fontWeight: 600,
                color: "#ff6e61",
              }}
              onClick={Logout}
            >
              Logout
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
