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
  Modal,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import api from "../../api/Request";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import ReactQuillEditor from "../../components/editor/Editor";
import ButtonBlack from "../../components/common/ButtonBlack";
import moment from "moment";

const AddBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required("Tiêu đề không được để trống")
      .max(150, "Tiêu đề không dài quá 150 kí tự"),
    content: yup.string().trim().required("Nội dung không được để trống"),
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [value, setValue] = useState("");
  const [banners, setBanners] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (value) => {
    setValue(value);
  };
  const handleChangeBanners = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setBanners(file);
    }
  };
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
        Thêm blog mới
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
        <Link to="/blog" style={{ textDecoration: "none" }}>
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
            Blog
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14, color: "#acacac" }}>
          Thêm blog mới
        </Typography>
      </Breadcrumbs>
      <form
        onSubmit={handleSubmit((data) => {
          if (!banners) {
            toast.warning("Vui lòng thêm banners", {
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
          const formDataAddBlog = new FormData();
          formDataAddBlog.append("title", data.title);
          formDataAddBlog.append("userId", localStorage.getItem("id"));
          formDataAddBlog.append("content", DOMPurify.sanitize(data.content));
          formDataAddBlog.append("banners", banners);
          api
            .post("/blog/create", formDataAddBlog)
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
              navigate("/blog");
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
            backgroundColor: "white",
            boxShadow: "rgba(145, 158, 171, 0.16) 0px 4px 8px 0px",
            padding: "24px",
            marginTop: "48px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <TextField
            {...register("title")}
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
            label="Tiêu đề"
            variant="outlined"
          />
          <Box sx={{ height: "16px" }}>
            <Typography
              color="error"
              component="p"
              sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
            >
              {errors?.title && errors.title.message}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 500, mb: "12px", fontSize: "14px" }}>
            Banners
          </Typography>
          <Box sx={{ width: "150px", mb: "24px" }}>
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
          {banners && (
            <Box sx={{ mb: "24px" }}>
              <img src={banners.preview} alt="" style={{ width: "100%" }} />
            </Box>
          )}

          <Typography sx={{ fontWeight: 500, mb: "12px", fontSize: "14px" }}>
            Content
          </Typography>
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => {
              return <ReactQuillEditor value={value} onChange={onChange} />;
            }}
          />
          <Box sx={{ height: "16px" }}>
            <Typography
              color="error"
              component="p"
              sx={{ mt: "8px", fontSize: "12px", lineHeight: "16px" }}
            >
              {errors?.content && errors.content.message}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: "16px",
            gap: "8px",
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.8)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            Preview
          </Button>
          <ButtonBlack type="submit" text="Thêm" />
        </Box>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="preview"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "100%",
            width: "100%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            px: 2,
            py: 5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleClose} sx={{ cursor: "pointer" }}>
              Thoát
            </Button>
          </Box>
          <Box
            sx={{
              height: "100%",
              overflowY: "scroll",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "24px",
                wordWrap: "break-word",
              }}
            >
              {watch("title")}
            </Typography>

            <Typography
              sx={{ textAlign: "center", fontSize: "10px", color: "#707070" }}
            >
              {moment(Date.now()).format("h:mm:ss - DD/MM/YYYY")}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: "12px",
                mt: "4px",
              }}
            >
              by {localStorage.getItem("fullName") || "No name"}
            </Typography>
            {banners && (
              <Box sx={{ my: "24px" }}>
                <img src={banners.preview} alt="" style={{ width: "100%" }} />
              </Box>
            )}
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(watch("content")),
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddBlog;
