import {
    Box,
    useTheme,
    Modal,
    Typography,
    Breadcrumbs,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  import ColorTable from "../../components/table/ColorTable";
  import AddRoundedIcon from "@mui/icons-material/AddRounded";
  import { Link } from "react-router-dom";
  import api from "../../api/Request";
  import { toast } from "react-toastify";
  
  const Color = () => {
    const theme = useTheme();
    const [dataDelete, setDataDelete] = useState({ nameColor: "Này" });
    const [isSuccess, setSuccess] = useState(false);
  
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getDataFromChild = (data) => {
      setDataDelete(data);
    };
    const handleDeleteUser = () => {
      handleClose();
      if (!dataDelete.id) {
        return;
      }
      api
        .delete(`/color/delete/${dataDelete.id}`)
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
            Danh sách màu
          </Typography>
          <Link to="/color/add">
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
                Thêm màu mới
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
          <Link to="/color" style={{ textDecoration: "none" }}>
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
              Màu
            </Typography>
          </Link>
          <Typography
            sx={{ fontSize: 14, color: "#acacac"}}
          >
            Danh sách màu
          </Typography>
        </Breadcrumbs>
        <Box
          sx={{
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            backgroundColor: "white",
            marginTop: "48px",
            borderRadius: "16px",
            overflow:'hidden'
          }}
        >
          <Box>
            <ColorTable          
              isSuccess={isSuccess}
              handleOpenModal={handleOpen}
              getDataFromChild={getDataFromChild}
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
              Bạn có chắc muốn xoá màu{" "}
              <span style={{ fontWeight: "bold" }}>{dataDelete?.nameColor}</span>{" "}
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
                onClick={handleDeleteUser}
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
  
  export default Color;
  