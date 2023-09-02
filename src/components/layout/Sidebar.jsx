import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import FormatSizeRoundedIcon from '@mui/icons-material/FormatSizeRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import SatelliteRoundedIcon from '@mui/icons-material/SatelliteRounded';

const SidebarButton = ({ children, text, onclick, url }) => {
  const theme = useTheme();
  const location = useLocation();
  const getPathName = (pathName) => {
    if (pathName.length < 2) {
      return "/";
    }
    return '/'+ pathName.split("/")[1];
  };
  return (
    <Button
      onClick={onclick}
      startIcon={children}
      variant="text"
      sx={{
        transition: theme.transitions.create(["all"], {
          easing: theme.transitions.easing.sharp,
          duration: 300,
        }),
        width: "100%",
        height: 44,
        justifyContent: "start",
        padding: "4px 8px 4px 12px",
        borderRadius: "8px",
        marginBottom: "4px",
        color: getPathName(location.pathname) === url ? "#ff6e61" : "#637381",
        backgroundColor:
        getPathName(location.pathname) === url ? "rgba(255, 110, 97,0.08)" : "transparent",
        "&:hover": {
          backgroundColor: getPathName(location.pathname) === url ? "#ff303029" : "none",
        },
      }}
    >
      <Typography
        color="inhert"
        sx={{
          textTransform: "capitalize",
          fontWeight: 500,
          transition: theme.transitions.create(["all"], {
            easing: theme.transitions.easing.sharp,
            duration: 300,
          }),
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

const sideLists = [
  {
    id: 1,
    text: "Trang chủ",
    children: <HomeRoundedIcon sx={{ color: "inhert" }} />,
    url: "/",
  },
  {
    id: 2,
    text: "Tài khoản",
    children: <AccountBoxRoundedIcon sx={{ color: "inhert" }} />,
    url: "/user",
  },
  {
    id: 3,
    text: "Đơn hàng",
    children: <LocalMallRoundedIcon sx={{ color: "inhert" }} />,
    url: "/order",
  },
  {
    id: 4,
    text: "sản phẩm",
    children: <Inventory2RoundedIcon sx={{ color: "inhert" }} />,
    url: "/product",
  },
  {
    id: 5,
    text: "danh mục",
    children: <CategoryRoundedIcon sx={{ color: "inhert" }} />,
    url: "/category",
  },
  {
    id: 6,
    text: "Màu",
    children: <ColorLensRoundedIcon sx={{ color: "inhert" }} />,
    url: "/color",
  },
  {
    id: 7,
    text: "Size",
    children: <FormatSizeRoundedIcon sx={{ color: "inhert" }} />,
    url: "/size",
  },
  {
    id: 8,
    text: "Banners",
    children: <SlideshowRoundedIcon sx={{ color: "inhert" }} />,
    url: "/banners",
  },
  {
    id: 9,
    text: "blog",
    children: <SatelliteRoundedIcon sx={{ color: "inhert" }} />,
    url: "/blog",
  }  
];

const Sidebar = ({ clodeSidebar, showSidebar }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        onClick={clodeSidebar}
        sx={{
          backgroundColor: "transparent",
          position: "fixed",
          visibility: "invisible",
          inset: 0,
          zIndex: 15,
          display: "none",
          transition: theme.transitions.create(["all"], {
            easing: theme.transitions.easing.sharp,
            duration: 300,
          }),
          [theme.breakpoints.down("md")]: {
            display: showSidebar ? "block" : "none",
            visibility: showSidebar ? "visible" : "invisible",
            backgroundColor: showSidebar ? "#00000080" : "transparent",
          },
        }}
      ></Box>
      <Box
        sx={{
          transition: theme.transitions.create(["all"], {
            easing: theme.transitions.easing.sharp,
            duration: 300,
          }),
          width: 200,
          flexShrink: 0,
          height: "100vh",
          padding: 2,
          borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
          [theme.breakpoints.down("md")]: {
            width: 279,

            position: "fixed",
            zIndex: 20,
            top: 0,
            left: showSidebar ? 0 : -279,
            bottom: 0,
            backgroundColor: "#f9fafb",
          },
        }}
      >
        {/* logo */}

        <Link to="/">
          <Box
            onClick={clodeSidebar}
            className="logo"
            sx={{
              padding: "12px",
              marginBottom: "24px",
            }}
          >
            <img src="./images/logo.png" alt="" />
          </Box>
        </Link>

        {/* nav */}
        <Box>
          {sideLists.map((item) => (
            <Link key={item.id} to={item.url}>
              <SidebarButton
                text={item.text}
                onclick={clodeSidebar}
                url={item.url}
              >
                {item.children}
              </SidebarButton>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
