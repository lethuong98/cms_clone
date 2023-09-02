import { Button } from "@mui/material";
import React from "react";

const ButtonBlack = ({ text, type }) => {
  return (
    <Button
      type={type ? type : 'button'}
      variant="contained"
      sx={{
        borderRadius: "8px",
        bgcolor: "rgba(0,0,0,0.8)",
        "&:hover": {
          bgcolor: "rgba(0,0,0,0.7)",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonBlack;
