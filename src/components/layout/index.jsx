import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (accessToken === undefined) {
      navigate("/auth/login");
    }
  }, []);

  const theme = useTheme();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const clodeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        backgroundColor: "#f9fafb",
      }}
    >
      {location.pathname.search("/auth") === 0 ? (
        <></>
      ) : (
        <Sidebar
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          clodeSidebar={clodeSidebar}
        />
      )}
      <Box
        sx={{
          width: "calc(100vw - 200px)",
          [theme.breakpoints.down("md")]: {
            width: "100vw",
          },
        }}
      >
        {location.pathname.search("/auth") === 0 ? (
          <></>
        ) : (
          <Topbar toggleSidebar={toggleSidebar} />
        )}

        <Box
          component="main"
          sx={{
            height: "100%",
            overflowY: "scroll",
            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "::-webkit-scrollbar-thumb": {
              borderRight: "4px solid rgba(0, 0, 0, 0)",
              backgroundClip: "padding-box",
              backgroundColor: "#c1c1c1",
            },
          }}
        >
          {children}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Layout;
